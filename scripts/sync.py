"""
Ashwa Racing — Team Data Sync Script

Merge logic:
- Reads existing teamData.js + alumniData.js as base (never wipes manual entries)
- Reads "Parsed Team Data" sheet (form submissions)
- For each sheet entry → finds matching person in JS by name → updates only form fields
- If person not in JS yet → appends as new entry
- Everything else (easterEgg, manual fields, people not in sheet) stays untouched
- Alumni logic: current year = datetime.now().year
  Current team = this year + next 2 years (e.g. 2026 → 2026, 2027, 2028)
  Alumni = anything below current year
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

# ─── Alumni Logic ─────────────────────────────────────────────
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

# ─── Read Sheet ───────────────────────────────────────────────
def read_sheet():
    print("📊 Fetching sheet CSV...")
    r = requests.get(SHEET_CSV_URL, timeout=30)
    r.raise_for_status()
    rows = list(csv.DictReader(io.StringIO(r.text)))
    print(f"✅ {len(rows)} entries read from sheet.")
    return rows

# ─── Parse Sheet Row ──────────────────────────────────────────
def parse_row(row):
    name  = row.get("Name",  "").strip()
    year  = row.get("Year",  "").strip()
    batch = row.get("Batch", "").strip()

    roles      = [r.strip() for r in row.get("Roles", "Member").split(",") if r.strip()]
    subsystems = [s.strip() for s in row.get("Subsystems", "").split(",")   if s.strip()]

    try:
        prototypes = json.loads(row.get("Prototype Roles", "{}") or "{}")
    except Exception:
        prototypes = {}

    return {
        "name":       name,
        "year":       year,
        "batch":      batch,
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

# ─── Read existing JS file into raw text blocks ───────────────
def read_js_entries(filepath):
    """
    Reads a teamData.js or alumniData.js file and returns:
    - entries: list of dicts with all fields parsed
    - raw_blocks: list of raw JS object strings (to preserve unknown fields)
    """
    if not os.path.exists(filepath):
        print(f"  ⚠️ {filepath} not found, will create fresh.")
        return [], []

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract individual JS object blocks between { and the matching }
    # Each entry is between "  {" and "  },"
    blocks = re.findall(r'  \{[^{}]+\}', content, re.DOTALL)
    entries = []

    for block in blocks:
        entry = {}

        # name
        m = re.search(r'name:\s*"([^"]*)"', block)
        entry["name"] = m.group(1) if m else ""

        # year
        m = re.search(r'year:\s*"([^"]*)"', block)
        entry["year"] = m.group(1) if m else ""

        # roles
        m = re.search(r'roles:\s*(\[[^\]]*\])', block)
        try:
            entry["roles"] = json.loads(m.group(1)) if m else ["Member"]
        except:
            entry["roles"] = ["Member"]

        # subsystem
        m = re.search(r'subsystem:\s*(\[[^\]]*\])', block)
        try:
            entry["subsystem"] = json.loads(m.group(1)) if m else []
        except:
            entry["subsystem"] = []

        # experience
        m = re.search(r'experience:\s*"((?:[^"\\]|\\.)*)"', block)
        entry["experience"] = m.group(1).replace('\\"', '"') if m else ""

        # social fields
        m = re.search(r'linkedin:\s*"([^"]*)"', block)
        entry["linkedin"] = m.group(1) if m else None
        if not entry["linkedin"]:
            entry["linkedin"] = None

        m = re.search(r'github:\s*"([^"]*)"', block)
        entry["github"] = m.group(1) if m else None
        if not entry["github"]:
            entry["github"] = None

        m = re.search(r'gmail:\s*"([^"]*)"', block)
        entry["gmail"] = m.group(1) if m else None
        if not entry["gmail"]:
            entry["gmail"] = None

        # prototypes
        m = re.search(r'prototypes:\s*(\{[^}]*\})', block)
        try:
            entry["prototypes"] = json.loads(m.group(1)) if m else {}
        except:
            entry["prototypes"] = {}

        # testimony
        m = re.search(r'testimony:\s*"((?:[^"\\]|\\.)*)"', block)
        entry["testimony"] = m.group(1).replace('\\"', '"') if m else None

        # currentJob
        m = re.search(r'currentJob:\s*"((?:[^"\\]|\\.)*)"', block)
        entry["currentJob"] = m.group(1).replace('\\"', '"') if m else None

        # easterEgg
        entry["easterEgg"] = bool(re.search(r'easterEgg:\s*true', block))

        entry["_raw"] = block  # preserve original block
        entries.append(entry)

    print(f"  ✅ Read {len(entries)} entries from {filepath}")
    return entries

# ─── Merge sheet data into existing entries ───────────────────
def merge_entries(existing, sheet_rows):
    """
    For each sheet row, find matching entry by name and update form fields.
    Append new entries if not found.
    """
    # Build lookup by name (lowercase for fuzzy match)
    lookup = {e["name"].lower().strip(): i for i, e in enumerate(existing)}
    updated = set()

    for row in sheet_rows:
        sheet = parse_row(row)
        if not sheet["name"]:
            continue

        key = sheet["name"].lower().strip()

        if key in lookup:
            # Update only form-sourced fields
            idx = lookup[key]
            e   = existing[idx]

            if sheet["roles"]:
                e["roles"] = sheet["roles"]
            if sheet["subsystem"]:
                e["subsystem"] = sheet["subsystem"]
            if sheet["experience"]:
                e["experience"] = sheet["experience"]
            if sheet["linkedin"]:
                e["linkedin"] = sheet["linkedin"]
            if sheet["github"]:
                e["github"] = sheet["github"]
            if sheet["gmail"]:
                e["gmail"] = sheet["gmail"]
            if sheet["prototypes"]:
                e["prototypes"] = sheet["prototypes"]
            if sheet["testimony"]:
                e["testimony"] = sheet["testimony"]
            if sheet["currentJob"]:
                e["currentJob"] = sheet["currentJob"]

            updated.add(key)
            print(f"  ✏️  Updated: {sheet['name']}")
        else:
            # New person — append
            existing.append(sheet)
            updated.add(key)
            print(f"  ➕ Added: {sheet['name']}")

    return existing

# ─── Download Photo ───────────────────────────────────────────
def download_photo(file_id, dest_path):
    if not file_id:
        return False
    url = f"https://drive.google.com/uc?export=download&id={file_id}&confirm=t"
    r   = requests.get(url, stream=True, timeout=30)
    if r.status_code != 200:
        print(f"  ⚠️ HTTP {r.status_code} for: {file_id}")
        return False
    if "text/html" in r.headers.get("Content-Type", ""):
        print(f"  ⚠️ Got HTML — folder not public? file: {file_id}")
        return False
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with open(dest_path, "wb") as f:
        for chunk in r.iter_content(8192):
            f.write(chunk)
    return True

def sync_photos(sheet_rows):
    print("\n📸 Syncing photos...")
    for row in sheet_rows:
        name     = row.get("Name",          "").strip()
        year     = row.get("Year",          "").strip()
        file_id  = row.get("Photo File ID", "").strip()
        dest     = f"assets/images/team/members/{year}/{name}.webp"

        if not file_id or not name or not year:
            continue
        if os.path.exists(dest):
            print(f"  ⏭️  Exists: {name}.webp")
            continue
        ok = download_photo(file_id, dest)
        print(f"  {'✅' if ok else '❌'} {name}.webp")

# ─── Write JS File ────────────────────────────────────────────
def js_val(val):
    if val is None:
        return "null"
    if isinstance(val, bool):
        return "true" if val else "false"
    if isinstance(val, (list, dict)):
        return json.dumps(val, ensure_ascii=False)
    escaped = str(val).replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ")
    return f'"{escaped}"'

def write_js(filepath, entries, var_name, is_alumni=False):
    lines = [f"const {var_name} = ["]

    for e in entries:
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

        if e.get("easterEgg"):
            lines.append(f'    easterEgg: true,')

        lines.append("  },")

    lines.append("];")
    lines.append("")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"  ✅ {filepath} — {len(entries)} entries written")

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
    team_entries   = read_js_entries("teamData.js")
    alumni_entries = read_js_entries("alumniData.js")
    all_entries    = team_entries + alumni_entries

    # 4. Merge sheet data into existing entries
    print("\n🔀 Merging sheet data...")
    all_entries = merge_entries(all_entries, sheet_rows)

    # 5. Split by year
    team_out   = [e for e in all_entries if e.get("year", "") in current_years]
    alumni_out = [e for e in all_entries if e.get("year", "") not in current_years]

    print(f"\n👥 Current team: {len(team_out)} | Alumni: {len(alumni_out)}")

    # 6. Write JS files
    print("\n📝 Writing JS files...")
    write_js("teamData.js",   team_out,   "teamData",   is_alumni=False)
    write_js("alumniData.js", alumni_out, "alumniData", is_alumni=True)

    print("\n🎉 Sync complete!")

if __name__ == "__main__":
    main()