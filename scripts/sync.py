"""
Ashwa Racing — Team Data Sync Script

- Reads existing team.js + alumni-data.js (never wipes manual entries)
- Reads "Parsed Team Data" sheet (form submissions)
- Merges by name — updates only form fields, preserves manual fields
- Everyone goes into team.js (teamData array)
- Alumni only (year below current year) also go into alumni-data.js (ALUMNI array)
- Alumni logic: current year + next 2 = current team, rest = alumni
  e.g. 2026 → 2026, 2027, 2028 = current | 2025 and below = alumni
- Downloads new photos from Drive (folder must be public)
"""

import os
import io
import re
import csv
import json
import requests
from datetime import datetime

# ─── Config ───────────────────────────────────────────────────
SHEET_CSV_URL        = os.environ["SHEET_CSV_URL"]
DRIVE_ROOT_FOLDER_ID = os.environ["DRIVE_ROOT_FOLDER_ID"]

TEAM_JS_PATH   = "assets/js/pages/team.js"
ALUMNI_JS_PATH = "assets/js/pages/alumni-data.js"

# Manual flags preserved in JS — never overwritten by sync
MANUAL_FLAGS = {
    "Vibin": {"easterEgg": True}
}

# Prototype key → programme id (for alumni-data.js renderer)
PROGRAMME_MAP = {
    "Combustion": "cv",
    "Hybrid":     "hybrid",
    "Electric":   "ev",
    "Hyperloop":  "hyperloop",
    "Driverless": "dv"
}

# ─── Alumni Year Logic ────────────────────────────────────────
def get_current_years():
    base = datetime.now().year
    return {str(base), str(base + 1), str(base + 2)}

# ─── Helpers ──────────────────────────────────────────────────
def clean_url(url):
    url = (url or "").strip()
    if not url or url.lower() in ["na", "n/a", "-", ""]:
        return None
    return url if url.startswith("http") else "https://" + url

def clean_text(text):
    val = (text or "").strip()
    return val if val and val.lower() not in ["na", "n/a", "-", ""] else None

def js_val(val):
    if val is None:
        return "null"
    if isinstance(val, bool):
        return "true" if val else "false"
    if isinstance(val, (list, dict)):
        return json.dumps(val, ensure_ascii=False)
    escaped = str(val).replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ")
    return f'"{escaped}"'

def parse_current_job(current_job):
    """
    Parses 'Position, Company' or 'Degree, Institute' into (position, company).
    e.g. 'Software Engineer, Google' → ('Software Engineer', 'Google')
         'MBA, IIM Bangalore'        → ('MBA', 'IIM Bangalore')
         'MBA'                       → ('MBA', '')
    """
    if not current_job:
        return "", ""
    parts = [p.strip() for p in current_job.split(",", 1)]
    position = parts[0]
    company  = parts[1] if len(parts) > 1 else ""
    return position, company

def get_programme(prototypes):
    """Returns the programme id from the first prototype key."""
    if not prototypes:
        return ""
    first_key = list(prototypes.keys())[0]
    return PROGRAMME_MAP.get(first_key, "")

def get_top_role(roles):
    """Returns the most senior role from a list."""
    priority = ["Team Captain", "Chief Engineer", "Project Manager", "Subsystem Lead", "Member"]
    for p in priority:
        if p in roles:
            return p
    return roles[0] if roles else "Member"

# ─── Extract array blocks from JS file ───────────────────────
def extract_entry_blocks(content, array_name):
    pattern = rf'const\s+{array_name}\s*=\s*\['
    m = re.search(pattern, content)
    if not m:
        print(f"  ⚠️ Could not find 'const {array_name} = [' in file")
        return []

    array_start = m.end()
    depth = 1
    i = array_start
    while i < len(content) and depth > 0:
        if content[i] == '[':
            depth += 1
        elif content[i] == ']':
            depth -= 1
        i += 1
    array_content = content[array_start:i-1]

    blocks = []
    depth  = 0
    start  = -1
    for j, ch in enumerate(array_content):
        if ch == '{':
            if depth == 0:
                start = j
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0 and start != -1:
                blocks.append(array_content[start:j+1])
                start = -1

    return blocks

# ─── Parse a JS object block ──────────────────────────────────
def parse_js_block(block):
    entry = {}

    def get_str(key):
        m = re.search(rf'{key}:\s*"((?:[^"\\]|\\.)*)"', block)
        return m.group(1).replace('\\"', '"') if m else None

    def get_null_or_str(key):
        m = re.search(rf'{key}:\s*(null|"(?:[^"\\]|\\.)*")', block)
        if not m:
            return None
        val = m.group(1)
        return None if val == "null" else val.strip('"').replace('\\"', '"')

    def get_array(key):
        m = re.search(rf'{key}:\s*(\[[^\]]*\])', block)
        try:
            return json.loads(m.group(1)) if m else []
        except:
            return []

    entry["name"]       = get_str("name")       or ""
    entry["year"]       = get_str("year")        or ""
    entry["experience"] = get_str("experience")  or ""
    entry["roles"]      = get_array("roles")     or ["Member"]
    entry["subsystem"]  = get_array("subsystem") or []
    entry["linkedin"]   = get_null_or_str("linkedin")
    entry["github"]     = get_null_or_str("github")
    entry["gmail"]      = get_null_or_str("gmail")
    entry["easterEgg"]  = bool(re.search(r'easterEgg:\s*true', block))
    entry["testimony"]  = get_str("testimony")
    entry["currentJob"] = get_str("currentJob")

    m = re.search(r'prototypes:\s*(\{[^}]*\})', block)
    try:
        entry["prototypes"] = json.loads(m.group(1)) if m else {}
    except:
        entry["prototypes"] = {}

    # Alumni-specific fields (from alumni-data.js ALUMNI array)
    entry["role"]      = get_str("role")
    entry["batch"]     = get_str("batch")
    entry["photo"]     = get_str("photo")
    entry["company"]   = get_str("company")
    entry["position"]  = get_str("position")
    entry["programme"] = get_str("programme")

    return entry

# ─── Read JS file ─────────────────────────────────────────────
def read_js_entries(filepath, array_name):
    if not os.path.exists(filepath):
        print(f"  ⚠️ {filepath} not found.")
        return [], ""

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    blocks  = extract_entry_blocks(content, array_name)
    entries = [parse_js_block(b) for b in blocks]
    entries = [e for e in entries if e.get("name")]

    print(f"  ✅ Read {len(entries)} entries from {filepath}")
    return entries, content

# ─── Read Sheet ───────────────────────────────────────────────
def read_sheet():
    print("📊 Fetching sheet CSV...")
    r = requests.get(SHEET_CSV_URL, timeout=30)
    r.raise_for_status()
    rows = list(csv.DictReader(io.StringIO(r.text)))
    rows = [r for r in rows if r.get("Name", "").strip()]
    print(f"✅ {len(rows)} entries read from sheet.")
    return rows

# ─── Parse Sheet Row ──────────────────────────────────────────
def parse_row(row):
    roles      = [r.strip() for r in row.get("Roles",      "Member").split(",") if r.strip()]
    subsystems = [s.strip() for s in row.get("Subsystems", "").split(",")        if s.strip()]
    try:
        prototypes = json.loads(row.get("Prototype Roles", "{}") or "{}")
    except:
        prototypes = {}

    return {
        "name":       row.get("Name",  "").strip(),
        "year":       row.get("Year",  "").strip(),
        "batch":      row.get("Batch", "").strip(),
        "roles":      roles or ["Member"],
        "subsystem":  subsystems,
        "prototypes": prototypes,
        "experience": clean_text(row.get("Experience",  "")),
        "linkedin":   clean_url (row.get("LinkedIn",    "")),
        "github":     clean_url (row.get("GitHub",      "")),
        "gmail":      clean_text(row.get("Email",       "")),
        "testimony":  clean_text(row.get("Testimony",   "")),
        "currentJob": clean_text(row.get("Current Job", "")),
        "photo_id":   row.get("Photo File ID", "").strip(),
    }

# ─── Merge ────────────────────────────────────────────────────
def merge(existing, sheet_rows):
    lookup = {e["name"].lower().strip(): i for i, e in enumerate(existing)}

    for row in sheet_rows:
        sheet = parse_row(row)
        if not sheet["name"]:
            continue

        key = sheet["name"].lower().strip()

        if key in lookup:
            e = existing[lookup[key]]
            if sheet["roles"]:      e["roles"]      = sheet["roles"]
            if sheet["subsystem"]:  e["subsystem"]  = sheet["subsystem"]
            if sheet["experience"]: e["experience"] = sheet["experience"]
            if sheet["linkedin"]:   e["linkedin"]   = sheet["linkedin"]
            if sheet["github"]:     e["github"]     = sheet["github"]
            if sheet["gmail"]:      e["gmail"]      = sheet["gmail"]
            if sheet["prototypes"]: e["prototypes"] = sheet["prototypes"]
            if sheet["testimony"]:  e["testimony"]  = sheet["testimony"]
            if sheet["currentJob"]: e["currentJob"] = sheet["currentJob"]
            # Update year in case batch changed
            if sheet["year"]:       e["year"]       = sheet["year"]
            print(f"  ✏️  Updated: {sheet['name']}")
        else:
            existing.append(sheet)
            print(f"  ➕ Added:   {sheet['name']}")

    return existing

# ─── Download Photos ──────────────────────────────────────────
def sync_photos(sheet_rows):
    print("\n📸 Syncing photos...")
    for row in sheet_rows:
        name    = row.get("Name",          "").strip()
        year    = row.get("Year",          "").strip()
        file_id = row.get("Photo File ID", "").strip()
        dest    = f"assets/images/team/members/{year}/{name}.webp"

        if not file_id or not name or not year:
            continue
        if os.path.exists(dest):
            print(f"  ⏭️  Exists: {name}.webp")
            continue

        url = f"https://drive.google.com/uc?export=download&id={file_id}&confirm=t"
        r   = requests.get(url, stream=True, timeout=30)
        if r.status_code != 200 or "text/html" in r.headers.get("Content-Type", ""):
            print(f"  ❌ Failed: {name}")
            continue

        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "wb") as f:
            for chunk in r.iter_content(8192):
                f.write(chunk)
        print(f"  ✅ Downloaded: {name}.webp")

# ─── Write teamData array into team.js ───────────────────────
def write_team_js(filepath, original_content, entries):
    lines = []
    for e in entries:
        manual = MANUAL_FLAGS.get(e.get("name", ""), {})

        social = (
            f'linkedin: {js_val(e.get("linkedin"))}, '
            f'github: {js_val(e.get("github"))}, '
            f'gmail: {js_val(e.get("gmail"))}'
        )

        lines.append("  {")
        lines.append(f'    name: {js_val(e.get("name", ""))},')
        lines.append(f'    roles: {js_val(e.get("roles", ["Member"]))},')
        lines.append(f'    subsystem: {js_val(e.get("subsystem", []))},')
        lines.append(f'    year: {js_val(e.get("year", ""))},')
        lines.append(f'    experience: {js_val(e.get("experience", ""))},')
        lines.append(f'    social: {{ {social} }},')

        if e.get("prototypes"):
            lines.append(f'    prototypes: {js_val(e["prototypes"])},')
        if e.get("testimony"):
            lines.append(f'    testimony: {js_val(e["testimony"])},')
        if e.get("currentJob"):
            lines.append(f'    currentJob: {js_val(e["currentJob"])},')
        for flag, val in manual.items():
            lines.append(f'    {flag}: {js_val(val)},')

        lines.append("  },")

    _write_array(filepath, original_content, "teamData", "\n".join(lines))
    print(f"  ✅ {filepath} updated — {len(entries)} entries")

# ─── Write ALUMNI array into alumni-data.js ──────────────────
def write_alumni_js(filepath, original_content, entries):
    lines = []
    for e in entries:
        position, company = parse_current_job(e.get("currentJob", "") or "")
        programme         = get_programme(e.get("prototypes", {}))
        top_role          = get_top_role(e.get("roles", ["Member"]))
        year              = e.get("year", "")
        photo             = f'assets/images/team/members/{year}/{e.get("name", "")}.webp'

        # Preserve existing photo if already set and not default
        existing_photo = e.get("photo", "")
        if existing_photo and "default.webp" not in existing_photo:
            photo = existing_photo

        lines.append("  {")
        lines.append(f'    name: {js_val(e.get("name", ""))},')
        lines.append(f'    role: {js_val(top_role)},')
        lines.append(f'    batch: {js_val(year)},')
        lines.append(f'    photo: {js_val(photo)},')
        lines.append(f'    company: {js_val(company)},')
        lines.append(f'    position: {js_val(position)},')
        lines.append(f'    linkedin: {js_val(e.get("linkedin"))},')
        lines.append(f'    programme: {js_val(programme)},')
        lines.append(f'    testimony: {js_val(e.get("testimony", "") or "")},')
        lines.append("  },")

    _write_array(filepath, original_content, "ALUMNI", "\n".join(lines))
    print(f"  ✅ {filepath} updated — {len(entries)} entries")

# ─── Write array back into file (surgical replace) ───────────
def _write_array(filepath, original_content, array_name, new_array_content):
    pattern = rf'const\s+{array_name}\s*=\s*\['
    m = re.search(pattern, original_content)
    if not m:
        print(f"  ❌ Could not find array {array_name} in {filepath}")
        return

    array_start = m.end()
    depth = 1
    i = array_start
    while i < len(original_content) and depth > 0:
        if original_content[i] == '[':
            depth += 1
        elif original_content[i] == ']':
            depth -= 1
        i += 1
    array_end = i - 1

    new_content = (
        original_content[:array_start]
        + "\n"
        + new_array_content
        + "\n"
        + original_content[array_end:]
    )

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

# ─── Main ─────────────────────────────────────────────────────
def main():
    print("🚀 Ashwa Racing sync starting...\n")

    current_years = get_current_years()
    print(f"📅 Current team years: {sorted(current_years)}")
    print(f"📅 Alumni = anything below {min(current_years)}\n")

    # 1. Read sheet
    sheet_rows = read_sheet()
    if not sheet_rows:
        print("Nothing to sync.")
        return

    # 2. Sync photos
    sync_photos(sheet_rows)

    # 3. Read existing JS files
    print("\n📖 Reading existing JS files...")
    team_entries,   team_content   = read_js_entries(TEAM_JS_PATH,   "teamData")
    alumni_entries, alumni_content = read_js_entries(ALUMNI_JS_PATH, "ALUMNI")

    # 4. Merge — everyone goes into team.js
    print("\n🔀 Merging team data...")
    team_entries = merge(team_entries, sheet_rows)

    # 5. Merge — only alumni go into alumni-data.js
    sheet_alumni = [r for r in sheet_rows if r.get("Year", "") not in current_years]
    if sheet_alumni:
        print("\n🔀 Merging alumni data...")
        alumni_entries = merge(alumni_entries, sheet_alumni)

    print(f"\n👥 Total team entries: {len(team_entries)}")
    print(f"🎓 Total alumni entries: {len(alumni_entries)}")

    # 6. Write JS files
    print("\n📝 Writing JS files...")
    write_team_js  (TEAM_JS_PATH,   team_content,   team_entries)
    write_alumni_js(ALUMNI_JS_PATH, alumni_content, alumni_entries)

    print("\n🎉 Sync complete!")

if __name__ == "__main__":
    main()