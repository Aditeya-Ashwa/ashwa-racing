"""
Ashwa Racing — Team Data Sync Script

How it works:
- Reads "Parsed Team Data" tab from Google Sheet (published as public CSV)
- Downloads photos from Google Drive (batch folders must be public)
- Writes teamData.js and alumniData.js
- Alumni logic: current year + next 2 years = current team, rest = alumni
  e.g. if academic year is 2026: 2026, 2027, 2028 = current | 2025 and below = alumni

No Google Cloud / billing needed — uses public CSV + public Drive links.
"""

import os
import io
import csv
import json
import requests
from datetime import datetime

# ─── Config ───────────────────────────────────────────────────
SHEET_CSV_URL        = os.environ["SHEET_CSV_URL"]         # Published CSV URL
DRIVE_ROOT_FOLDER_ID = os.environ["DRIVE_ROOT_FOLDER_ID"]  # Ashwa Website Uploads folder ID

# Manual flags — never overwritten by sync
# Add any member name here with flags that only exist in JS, not the form
MANUAL_FLAGS = {
    "Vibin": {"easterEgg": True}
}

# ─── Alumni Logic ─────────────────────────────────────────────
def get_current_years():
    """
    Returns the 3 'current' batch years.
    Academic year starts in ~July, so use current calendar year.
    Current team = this year, next year, year after.
    e.g. in 2026 → [2026, 2027, 2028] are current team
         2025 and below → alumni
    """
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
    """Format a Python value as a JS literal string."""
    if val is None:
        return "null"
    if isinstance(val, bool):
        return "true" if val else "false"
    if isinstance(val, (list, dict)):
        return json.dumps(val, ensure_ascii=False)
    escaped = str(val).replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ")
    return f'"{escaped}"'

# ─── Read Sheet ───────────────────────────────────────────────
def read_sheet():
    print("📊 Fetching sheet CSV...")
    r = requests.get(SHEET_CSV_URL, timeout=30)
    r.raise_for_status()
    rows = list(csv.DictReader(io.StringIO(r.text)))
    print(f"✅ {len(rows)} entries read.")
    return rows

# ─── Download Photo ───────────────────────────────────────────
def download_photo(file_id, dest_path):
    """Download file from Google Drive by ID. Folder must be public (Anyone with link → Viewer)."""
    if not file_id:
        return False

    url = f"https://drive.google.com/uc?export=download&id={file_id}&confirm=t"
    r   = requests.get(url, stream=True, timeout=30)

    if r.status_code != 200:
        print(f"  ⚠️ HTTP {r.status_code} for file: {file_id}")
        return False

    if "text/html" in r.headers.get("Content-Type", ""):
        print(f"  ⚠️ Got HTML (folder not public?) for file: {file_id}")
        return False

    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with open(dest_path, "wb") as f:
        for chunk in r.iter_content(8192):
            f.write(chunk)
    return True

# ─── Parse Row ────────────────────────────────────────────────
def parse_row(row):
    name  = row.get("Name",  "").strip()
    year  = row.get("Year",  "").strip()
    batch = row.get("Batch", "").strip()

    roles      = [r.strip() for r in row.get("Roles",      "Member").split(",") if r.strip()]
    subsystems = [s.strip() for s in row.get("Subsystems", "").split(",")        if s.strip()]

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

# ─── Download All Photos ──────────────────────────────────────
def sync_photos(entries):
    print("\n📸 Syncing photos...")
    for e in entries:
        name     = e["name"]
        year     = e["year"]
        file_id  = e["photo_id"]
        dest     = f"assets/images/team/members/{year}/{name}.webp"

        if not file_id:
            print(f"  ⚠️ No photo ID: {name}")
            continue

        if os.path.exists(dest):
            print(f"  ⏭️  Already exists: {name}.webp")
            continue

        ok = download_photo(file_id, dest)
        if ok:
            print(f"  ✅ Downloaded: {dest}")
        else:
            print(f"  ❌ Failed: {name}")

# ─── Write JS ─────────────────────────────────────────────────
def write_js(filepath, entries, var_name, is_alumni=False):
    lines = [f"const {var_name} = ["]

    for e in entries:
        manual = MANUAL_FLAGS.get(e["name"], {})

        social = (
            f'linkedin: {js_val(e["linkedin"])}, '
            f'github: {js_val(e["github"])}, '
            f'gmail: {js_val(e["gmail"])}'
        )

        lines.append("  {")
        lines.append(f'    name: {js_val(e["name"])},')
        lines.append(f'    roles: {js_val(e["roles"])},')
        lines.append(f'    subsystem: {js_val(e["subsystem"])},')
        lines.append(f'    year: {js_val(e["year"])},')
        lines.append(f'    experience: {js_val(e["experience"] or "")},')
        lines.append(f'    social: {{ {social} }},')

        if e["prototypes"]:
            lines.append(f'    prototypes: {js_val(e["prototypes"])},')

        if is_alumni and e["testimony"]:
            lines.append(f'    testimony: {js_val(e["testimony"])},')

        if is_alumni and e["currentJob"]:
            lines.append(f'    currentJob: {js_val(e["currentJob"])},')

        for flag, val in manual.items():
            lines.append(f'    {flag}: {js_val(val)},')

        lines.append("  },")

    lines.append("];")
    lines.append("")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"  ✅ {filepath} — {len(entries)} entries")

# ─── Main ─────────────────────────────────────────────────────
def main():
    print("🚀 Ashwa Racing sync starting...\n")

    current_years = get_current_years()
    print(f"📅 Current team years: {sorted(current_years)}")
    print(f"📅 Alumni = anything below {min(current_years)}\n")

    # 1. Read sheet
    rows = read_sheet()
    if not rows:
        print("Nothing to sync.")
        return

    # 2. Parse
    entries = [parse_row(r) for r in rows]

    # 3. Download photos
    sync_photos(entries)

    # 4. Split current vs alumni
    team_entries   = [e for e in entries if e["year"] in current_years]
    alumni_entries = [e for e in entries if e["year"] not in current_years]

    print(f"\n👥 Current team: {len(team_entries)} | Alumni: {len(alumni_entries)}")

    # 5. Write JS files
    print("\n📝 Writing JS files...")
    write_js("teamData.js",   team_entries,   "teamData",   is_alumni=False)
    write_js("alumniData.js", alumni_entries, "alumniData", is_alumni=True)

    print("\n🎉 Sync complete!")

if __name__ == "__main__":
    main()