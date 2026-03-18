#!/usr/bin/env python3
"""
IndexNow Bulk URL Submitter for ashwa-racing.github.io
------------------------------------------------------
Scans the local repo for all .html pages, builds the URL list,
and POSTs to every IndexNow-participating search engine.

Usage:
    python submit_indexnow.py
    python submit_indexnow.py --dry-run        # print URLs only, no HTTP
    python submit_indexnow.py --root /path/to/repo
"""

import os
import json
import argparse
import urllib.request
import urllib.error
from pathlib import Path

# ── CONFIG ────────────────────────────────────────────────────────────────────
HOST        = "ashwa-racing.github.io"
BASE_URL    = f"https://{HOST}"
API_KEY     = "5882138a0a7c4798b5e45daaa3b8a764"
KEY_LOCATION = f"{BASE_URL}/{API_KEY}.key"

# All search engines that support IndexNow share the same protocol.
# Submitting to ANY ONE of them notifies all participants.
# Listed for redundancy / fallback.
INDEXNOW_ENDPOINTS = [
    "https://api.indexnow.org/indexnow",      # neutral aggregator → notifies all
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
    "https://search.seznam.cz/indexnow",
]

# Files / patterns to exclude from the URL list
EXCLUDE = {
    "google65122155159fc983.html",            # Google Search Console verification
    "prank_index.html",                       # internal / not public
    "corp_index.html",
    "header.html",
    "footer.html"
}
# ──────────────────────────────────────────────────────────────────────────────


def collect_urls(repo_root: Path) -> list[str]:
    """Walk the repo root and collect public-facing HTML page URLs."""
    urls = []
    for path in sorted(repo_root.rglob("*.html")):
        # Skip files in hidden dirs (.git, .github, node_modules, etc.)
        parts = path.relative_to(repo_root).parts
        if any(p.startswith(".") or p in ("node_modules",) for p in parts):
            continue
        # Skip excluded filenames
        if path.name in EXCLUDE:
            continue
        # Build the public URL
        rel = path.relative_to(repo_root).as_posix()
        urls.append(f"{BASE_URL}/{rel}")
    return urls


def submit(urls: list[str], endpoint: str) -> tuple[int, str]:
    payload = json.dumps({
        "host":        HOST,
        "key":         API_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList":     urls,
    }).encode("utf-8")

    req = urllib.request.Request(
        endpoint,
        data=payload,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.status, resp.read().decode()
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()
    except urllib.error.URLError as e:
        return 0, str(e.reason)


def main():
    parser = argparse.ArgumentParser(description="Submit URLs via IndexNow")
    parser.add_argument("--root", default=".", help="Path to repo root (default: cwd)")
    parser.add_argument("--dry-run", action="store_true", help="Print URLs, skip HTTP")
    args = parser.parse_args()

    repo_root = Path(args.root).resolve()
    urls = collect_urls(repo_root)

    print(f"Found {len(urls)} URLs under {repo_root}\n")
    for u in urls:
        print(" ", u)

    if args.dry_run:
        print("\n[dry-run] No requests sent.")
        return

    # IndexNow allows max 10 000 URLs per request; chunk if needed
    CHUNK = 10_000
    chunks = [urls[i:i+CHUNK] for i in range(0, len(urls), CHUNK)]

    print(f"\nSubmitting {len(urls)} URL(s) in {len(chunks)} chunk(s)…\n")

    # Submit to the neutral aggregator first (notifies all engines at once).
    # Fall back to individual engines only if the aggregator fails.
    primary   = INDEXNOW_ENDPOINTS[0]
    fallbacks = INDEXNOW_ENDPOINTS[1:]

    for chunk in chunks:
        print(f"  → {primary}")
        code, body = submit(chunk, primary)
        print(f"     {code}  {body[:120] or '(no body)'}")

        if code not in (200, 202):
            print("  Primary failed, trying fallbacks…")
            for ep in fallbacks:
                print(f"  → {ep}")
                code, body = submit(chunk, ep)
                print(f"     {code}  {body[:120] or '(no body)'}")
                if code in (200, 202):
                    break

    print("\nDone.")


if __name__ == "__main__":
    main()