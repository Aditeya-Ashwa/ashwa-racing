"""
Ashwa Racing — Team Data Sync Script

- Reads teamData array from assets/js/team.js (file has other code too — only touches the array)
- Reads ALUMNI array from assets/js/alumni-data.js (only touches ALUMNI, not ORG_STRUCTURE)
- Merges sheet data by name — updates form fields, preserves manual fields
- Downloads new photos from Drive
- Alumni logic: current year + next 2 = current team, rest = alumni
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

# Fields only set manually in JS — never overwritten by sync
MANUAL_FLAGS = {
    "Vibin": {"easterEgg": True}
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

# ─── Extract array blocks from JS file ───────────────────────
def extract_entry_blocks(content, array_name):
    """
    Finds 'const ARRAY_NAME = [' in content,
    then extracts each top-level { } block inside it
    by counting braces (handles nested objects like social: {}).
    Returns list of raw block strings.
    """
    # Find the start of the array
    pattern = rf'const\s+{array_name}\s*=\s*\['
    m = re.search(pattern, content)
    if not m:
        print(f"  ⚠️ Could not find 'const {array_name} = [' in file")
        return []

    array_start = m.end()

    # Find the closing ] of the array by counting brackets
    depth = 1
    i = array_start
    while i < len(content) and depth > 0:
        if content[i] == '[':
            depth += 1
        elif content[i] == ']':
            depth -= 1
        i += 1
    array_content = content[array_start:i-1]

    # Now extract each top-level { } block from array_content
    blocks = []
    depth = 0
    start = -1
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

# ─── Parse a single JS object block into a Python dict ────────
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
        if val == "null":
            return None
        return val.strip('"').replace('\\"', '"')

    def get_array(key):
        m = re.search(rf'{key}:\s*(\[[^\]]*\])', block)
        if not m:
            return []
        try:
            return json.loads(m.group(1))
        except:
            return []

    entry["name"]       = get_str("name") or ""
    entry["year"]       = get_str("year") or ""
    entry["experience"] = get_str("experience") or ""
    entry["roles"]      = get_array("roles") or ["Member"]
    entry["subsystem"]  = get_array("subsystem") or []
    entry["linkedin"]   = get_null_or_str("linkedin")
    entry["github"]     = get_null_or_str("github")
    entry["gmail"]      = get_null_or_str("gmail")
    entry["easterEgg"]  = bool(re.search(r'easterEgg:\s*true', block))

    # prototypes (optional)
    m = re.search(r'prototypes:\s*(\{[^}]*\})', block)
    try:
        entry["prototypes"] = json.loads(m.group(1)) if m else {}
    except:
        entry["prototypes"] = {}

    # testimony (alumni only)
    entry["testimony"]  = get_str("testimony")
    entry["currentJob"] = get_str("currentJob")

    return entry

# ─── Read JS file entries ─────────────────────────────────────
def read_js_entries(filepath, array_name):
    if not os.path.exists(filepath):
        print(f"  ⚠️ {filepath} not found.")
        return [], ""

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    blocks  = extract_entry_blocks(content, array_name)
    entries = [parse_js_block(b) for b in blocks]
    entries = [e for e in entries if e.get("name")]  # skip empty

    print(f"  ✅ Read {len(entries)} entries from {filepath}")
    return entries, content

# ─── Read Sheet ───────────────────────────────────────────────
def read_sheet():
    print("📊 Fetching sheet CSV...")
    r = requests.get(SHEET_CSV_URL, timeout=30)
    r.raise_for_status()
    rows = list(csv.DictReader(io.StringIO(r.text)))
    # Filter out empty rows
    rows = [r for r in rows if r.get("Name", "").strip()]
    print(f"✅ {len(rows)} entries read from sheet.")
    return rows

# ─── Parse Sheet Row ──────────────────────────────────────────
def parse_row(row):
    roles      = [r.strip() for r in row.get("Roles", "Member").split(",") if r.strip()]
    subsystems = [s.strip() for s in row.get("Subsystems", "").split(",")   if s.strip()]
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

# ─── Merge sheet into existing entries ────────────────────────
def merge(existing, sheet_rows):
    lookup = {e["name"].lower().strip(): i for i, e in enumerate(existing)}

    for row in sheet_rows:
        sheet = parse_row(row)
        if not sheet["name"]:
            continue

        key = sheet["name"].lower().strip()

        if key in lookup:
            e = existing[lookup[key]]
            # Only update fields that come from the form
            if sheet["roles"]:      e["roles"]      = sheet["roles"]
            if sheet["subsystem"]:  e["subsystem"]  = sheet["subsystem"]
            if sheet["experience"]: e["experience"] = sheet["experience"]
            if sheet["linkedin"]:   e["linkedin"]   = sheet["linkedin"]
            if sheet["github"]:     e["github"]     = sheet["github"]
            if sheet["gmail"]:      e["gmail"]      = sheet["gmail"]
            if sheet["prototypes"]: e["prototypes"] = sheet["prototypes"]
            if sheet["testimony"]:  e["testimony"]  = sheet["testimony"]
            if sheet["currentJob"]: e["currentJob"] = sheet["currentJob"]
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
            print(f"  ❌ Failed to download photo for: {name}")
            continue

        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "wb") as f:
            for chunk in r.iter_content(8192):
                f.write(chunk)
        print(f"  ✅ Downloaded: {name}.webp")

# ─── Write updated array back into JS file ───────────────────
def write_array_into_file(filepath, original_content, array_name, entries, is_alumni=False):
    """
    Replaces just the array in the file, leaving all other code untouched.
    """
    # Build new array string
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
        if is_alumni and e.get("testimony"):
            lines.append(f'    testimony: {js_val(e["testimony"])},')
        if is_alumni and e.get("currentJob"):
            lines.append(f'    currentJob: {js_val(e["currentJob"])},')
        for flag, val in manual.items():
            lines.append(f'    {flag}: {js_val(val)},')

        lines.append("  },")

    new_array_content = "\n".join(lines)

    # Find array boundaries in original file
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
    array_end = i - 1  # position of closing ]

    # Replace only the array contents
    new_content = (
        original_content[:array_start]
        + "\n"
        + new_array_content
        + "\n"
        + original_content[array_end:]
    )

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"  ✅ {filepath} updated — {len(entries)} entries")

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
    team_entries,   team_content   = read_js_entries("assets/js/team.js",        "teamData")
    alumni_entries, alumni_content = read_js_entries("assets/js/alumni-data.js", "ALUMNI")

    # 4. Merge sheet data
    print("\n🔀 Merging...")
    sheet_current = [r for r in sheet_rows if r.get("Year", "") in current_years]
    sheet_alumni  = [r for r in sheet_rows if r.get("Year", "") not in current_years]

    team_entries   = merge(team_entries,   sheet_current)
    alumni_entries = merge(alumni_entries, sheet_alumni)

    print(f"\n👥 Current team: {len(team_entries)} | Alumni: {len(alumni_entries)}")

    # 5. Write back into files (only replaces the arrays, not the whole file)
    print("\n📝 Writing JS files...")
    write_array_into_file("assets/js/team.js",        team_content,   "teamData", is_alumni=False)
    write_array_into_file("assets/js/alumni-data.js", alumni_content, "ALUMNI",   is_alumni=True)

    print("\n🎉 Sync complete!")

if __name__ == "__main__":
    main()