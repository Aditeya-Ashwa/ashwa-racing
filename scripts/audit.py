import os
import re
import urllib.request
import urllib.parse
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor, as_completed
import socket

# Timeout for network requests in seconds
NETWORK_TIMEOUT = 5
MAX_WORKERS = 10
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

class AshwaWebParser(HTMLParser):
    def __init__(self, filepath):
        super().__init__()
        self.filepath = filepath
        self.anchors = set()
        self.links = []       # List of (tag, attr, value, line_no)
        self.images = []      # List of (src, alt, line_no)
        self.title = None
        self.description = None
        self.viewport = False
        self.in_title = False
        self.line_no = 1

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        # Track IDs for anchor links
        if 'id' in attrs_dict:
            self.anchors.add(attrs_dict['id'])
        if tag == 'a' and 'name' in attrs_dict:
            self.anchors.add(attrs_dict['name'])

        # Track links and resources
        if tag == 'a' and 'href' in attrs_dict:
            self.links.append((tag, 'href', attrs_dict['href'], self.getpos()[0]))
        elif tag == 'link' and 'href' in attrs_dict:
            # Skip preconnect/dns-prefetch relations
            rel = attrs_dict.get('rel', '').lower()
            if rel not in ('preconnect', 'dns-prefetch'):
                self.links.append((tag, 'href', attrs_dict['href'], self.getpos()[0]))
        elif tag in ('script', 'iframe') and 'src' in attrs_dict:
            self.links.append((tag, 'src', attrs_dict['src'], self.getpos()[0]))
        elif tag == 'img':
            src = attrs_dict.get('src', '')
            alt = attrs_dict.get('alt', None)
            self.images.append((src, alt, self.getpos()[0]))
            if 'srcset' in attrs_dict:
                self.links.append((tag, 'srcset', attrs_dict['srcset'], self.getpos()[0]))
            if src:
                self.links.append((tag, 'src', src, self.getpos()[0]))
        elif tag == 'source':
            if 'src' in attrs_dict:
                self.links.append((tag, 'src', attrs_dict['src'], self.getpos()[0]))
            if 'srcset' in attrs_dict:
                self.links.append((tag, 'srcset', attrs_dict['srcset'], self.getpos()[0]))

        # Meta validation
        if tag == 'title':
            self.in_title = True
        elif tag == 'meta':
            if attrs_dict.get('name') == 'description':
                self.description = attrs_dict.get('content')
            elif attrs_dict.get('name') == 'viewport':
                self.viewport = True

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title = data.strip()

def check_external_url(url):
    """
    Checks if an external URL is reachable.
    Returns (status_code, error_msg). Status 200 means OK.
    """
    # Normalize protocol relative URLs
    if url.startswith("//"):
        url = "https:" + url

    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': USER_AGENT},
            method='HEAD'
        )
        with urllib.request.urlopen(req, timeout=NETWORK_TIMEOUT) as response:
            return response.status, None
    except urllib.error.HTTPError as e:
        # Some servers block HEAD requests, retry with GET
        if e.code in (404, 405, 403, 500, 502):
            try:
                req = urllib.request.Request(
                    url,
                    headers={'User-Agent': USER_AGENT},
                    method='GET'
                )
                # Read a small chunk to prevent full download
                with urllib.request.urlopen(req, timeout=NETWORK_TIMEOUT) as response:
                    return response.status, None
            except urllib.error.HTTPError as e2:
                return e2.code, str(e2.reason)
            except Exception as e2:
                return 0, str(e2)
        return e.code, str(e.reason)
    except urllib.error.URLError as e:
        return 0, str(e.reason)
    except socket.timeout:
        return 0, "Timeout"
    except Exception as e:
        return 0, str(e)

def parse_srcset(srcset_val):
    # Parses srcset containing parameters with commas (like Cloudflare parameters)
    parts = []
    current = []
    for chunk in srcset_val.split(','):
        current.append(chunk)
        combined = ','.join(current).strip()
        # Heuristic: does this look like it ends with a descriptor like 768w or 2x?
        has_descriptor = False
        subparts = chunk.strip().split()
        if len(subparts) > 1 and re.match(r'^\d+[wx]$', subparts[-1]):
            has_descriptor = True
        
        if has_descriptor:
            parts.append(combined)
            current = []
    if current:
        parts.append(','.join(current).strip())
    
    urls = []
    for p in parts:
        sp = p.split()
        if sp:
            urls.append(sp[0])
    return urls

def run_audit(root_dir):
    print(f"Starting audit in: {root_dir}")
    
    # 1. Discover all HTML files
    html_files = []
    for dirpath, _, filenames in os.walk(root_dir):
        # Exclude directories
        if any(part in dirpath.split(os.sep) for part in ('.git', '.venv', '.vscode', 'node_modules')):
            continue
        for f in filenames:
            if f.endswith('.html'):
                html_files.append(os.path.join(dirpath, f))

    print(f"Found {len(html_files)} HTML file(s) to scan.")

    # 2. Parse all files
    parsed_pages = {} # filepath -> AshwaWebParser object
    for filepath in html_files:
        rel_path = os.path.relpath(filepath, root_dir)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            parser = AshwaWebParser(rel_path)
            parser.feed(content)
            parsed_pages[rel_path] = parser
        except Exception as e:
            print(f"Error parsing {rel_path}: {e}")

    # 3. Process links and assets
    broken_local_links = []  # (source_file, target_path, line, error_type)
    external_urls = set()
    external_url_mappings = [] # (source_file, url, line)
    missing_alts = [] # (source_file, img_src, line)
    seo_metadata_issues = [] # (source_file, issue_description)

    for rel_path, parser in parsed_pages.items():
        # SEO & Meta checks
        # Ignore SEO issues for components as they are not full standalone pages
        if not rel_path.startswith(('components/', 'components\\')):
            if not parser.title:
                seo_metadata_issues.append((rel_path, "Missing <title> tag or title content is empty."))
            if not parser.description:
                seo_metadata_issues.append((rel_path, "Missing <meta name=\"description\"> tag."))
            if not parser.viewport:
                seo_metadata_issues.append((rel_path, "Missing responsive <meta name=\"viewport\"> tag."))

        # Image alt checks
        for src, alt, line in parser.images:
            if alt is None:
                missing_alts.append((rel_path, src, line, "Missing 'alt' attribute"))
            elif alt.strip() == "":
                missing_alts.append((rel_path, src, line, "Empty 'alt' attribute (fine only if decorative)"))

        # Link and asset validation
        for tag, attr, val, line in parser.links:
            # Handle srcset values
            urls_to_check = []
            if attr == 'srcset':
                urls_to_check = parse_srcset(val)
            else:
                urls_to_check.append(val)

            for u in urls_to_check:
                u = u.strip()
                if not u:
                    continue

                # Skip mailto, tel, javascript, etc.
                if u.startswith(('mailto:', 'tel:', 'javascript:', '#')):
                    # If it's a local anchor link on the same page e.g. '#about'
                    if u.startswith('#'):
                        anchor_id = u[1:]
                        if anchor_id not in parser.anchors:
                            broken_local_links.append((rel_path, u, line, "Local anchor ID not found in current page"))
                    continue

                # Parse URL
                parsed_u = urllib.parse.urlparse(u)
                if parsed_u.scheme in ('http', 'https') or u.startswith('//'):
                    external_urls.add(u)
                    external_url_mappings.append((rel_path, u, line))
                else:
                    # It's a local/relative path
                    # URL-decode to match file path on disk (e.g. %20 -> space)
                    local_path = urllib.parse.unquote(parsed_u.path)
                    anchor = parsed_u.fragment

                    # Check absolute vs relative
                    if local_path.startswith('/'):
                        # Resolve to root dir
                        absolute_target = os.path.normpath(os.path.join(root_dir, local_path.lstrip('/')))
                    else:
                        # Resolve relative to the source page's directory
                        # If the source page is a component fragment, resolve relative to the root dir
                        if rel_path.startswith(('components/', 'components\\')):
                            source_dir = root_dir
                        else:
                            source_dir = os.path.dirname(os.path.join(root_dir, rel_path))
                        absolute_target = os.path.normpath(os.path.join(source_dir, local_path))

                    # Verify existence
                    if not os.path.exists(absolute_target):
                        broken_local_links.append((rel_path, u, line, "Local file/asset does not exist"))
                    else:
                        # If local file exists, verify the anchor/fragment if present
                        if anchor:
                            # We need to find the target parsed HTML page to check anchors
                            target_rel = os.path.relpath(absolute_target, root_dir).replace('\\', '/')
                            if target_rel in parsed_pages:
                                if anchor not in parsed_pages[target_rel].anchors:
                                    broken_local_links.append((rel_path, u, line, f"Anchor '#{anchor}' not found in target '{target_rel}'"))
                            else:
                                # Target file exists but isn't HTML or parsed (e.g. PDF/assets)
                                pass

    # 4. Check external URLs concurrently
    print(f"Auditing {len(external_urls)} unique external URL(s)...")
    external_url_status = {}
    
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_url = {executor.submit(check_external_url, url): url for url in external_urls}
        for future in as_completed(future_to_url):
            url = future_to_url[future]
            try:
                status, err_msg = future.result()
                external_url_status[url] = (status, err_msg)
            except Exception as exc:
                external_url_status[url] = (0, str(exc))

    # Identify broken external links
    broken_external_links = [] # (source_file, url, line, status, error_msg)
    warn_external_links = []   # (source_file, url, line, status, error_msg)
    
    for rel_path, url, line in external_url_mappings:
        status, err = external_url_status.get(url, (0, "Not Checked"))
        if status == 0 or status >= 400:
            # Check if it's a known false positive or strict external protection (like LinkedIn/Instagram blocking scrapers)
            if any(domain in url for domain in ('linkedin.com', 'instagram.com', 'twitter.com', 'facebook.com', 'youtube.com')) and status in (403, 999):
                warn_external_links.append((rel_path, url, line, status, f"Likely scraper block ({err or 'Access Denied'})"))
            else:
                broken_external_links.append((rel_path, url, line, status, err))

    # 5. Compile and print report
    report_lines = []
    report_lines.append("# Website Audit Report")
    report_lines.append(f"**Target Site/Directory:** {root_dir}")
    report_lines.append(f"**Pages Scanned:** {len(html_files)}")
    report_lines.append(f"**Unique External Links Verified:** {len(external_urls)}")
    report_lines.append("")

    report_lines.append("## Summary Table")
    report_lines.append("| Category | Count | Status |")
    report_lines.append("|---|---|---|")
    
    local_status = "❌ Issues Found" if broken_local_links else "✅ OK"
    report_lines.append(f"| Broken Local Links & Assets | {len(broken_local_links)} | {local_status} |")
    
    ext_status = "❌ Issues Found" if broken_external_links else "✅ OK"
    report_lines.append(f"| Broken External Links | {len(broken_external_links)} | {ext_status} |")
    
    warn_status = "⚠️ Warning" if warn_external_links else "✅ OK"
    report_lines.append(f"| External Link Warnings (Scraper Blocks) | {len(warn_external_links)} | {warn_status} |")
    
    seo_status = "❌ Issues Found" if seo_metadata_issues else "✅ OK"
    report_lines.append(f"| SEO & Meta Tag Issues | {len(seo_metadata_issues)} | {seo_status} |")
    
    alt_status = "⚠️ Warning" if missing_alts else "✅ OK"
    report_lines.append(f"| Missing Image Alt Attributes | {len(missing_alts)} | {alt_status} |")
    report_lines.append("")

    # Broken Local Links Section
    report_lines.append("## Broken Local Links & Assets")
    if broken_local_links:
        report_lines.append("| Page | Line | Target Reference | Issue |")
        report_lines.append("|---|---|---|---|")
        for page, target, line, issue in sorted(broken_local_links):
            page_path = os.path.join(root_dir, page).replace('\\', '/')
            report_lines.append(f"| [{page}](file:///{page_path}) | {line} | `{target}` | {issue} |")
    else:
        report_lines.append("No broken local links or missing local assets found.")
    report_lines.append("")

    # Broken External Links Section
    report_lines.append("## Broken External Links")
    if broken_external_links:
        report_lines.append("| Page | Line | Target URL | Status Code | Error Message |")
        report_lines.append("|---|---|---|---|---|")
        for page, url, line, status, err in sorted(broken_external_links):
            page_path = os.path.join(root_dir, page).replace('\\', '/')
            report_lines.append(f"| [{page}](file:///{page_path}) | {line} | [{url}]({url}) | {status} | {err} |")
    else:
        report_lines.append("No broken external links found.")
    report_lines.append("")

    # Warnings Section
    report_lines.append("## Warnings & Potential Scraper Blocks")
    if warn_external_links:
        report_lines.append("| Page | Line | Target URL | Status Code | Notes |")
        report_lines.append("|---|---|---|---|---|")
        for page, url, line, status, err in sorted(warn_external_links):
            page_path = os.path.join(root_dir, page).replace('\\', '/')
            report_lines.append(f"| [{page}](file:///{page_path}) | {line} | [{url}]({url}) | {status} | {err} |")
    else:
        report_lines.append("No warnings.")
    report_lines.append("")

    # SEO Issues Section
    report_lines.append("## SEO & Meta Tag Issues")
    if seo_metadata_issues:
        report_lines.append("| Page | Issue |")
        report_lines.append("|---|---|")
        for page, issue in sorted(seo_metadata_issues):
            page_path = os.path.join(root_dir, page).replace('\\', '/')
            report_lines.append(f"| [{page}](file:///{page_path}) | {issue} |")
    else:
        report_lines.append("All pages have title, description, and viewport metadata configured.")
    report_lines.append("")

    # Image Alt Section
    report_lines.append("## Missing Image Alt Attributes")
    if missing_alts:
        report_lines.append("| Page | Line | Image Source | Issue |")
        report_lines.append("|---|---|---|---|")
        for page, src, line, issue in sorted(missing_alts):
            report_lines.append(f"| [{page}](file:///{os.path.join(root_dir, page).replace('\\', '/')}) | {line} | `{src}` | {issue} |")
    else:
        report_lines.append("No images with missing alt attributes found.")
    report_lines.append("")

    # Write report file
    report_content = "\n".join(report_lines)
    report_file_path = os.path.join(root_dir, "audit_report.md")
    with open(report_file_path, 'w', encoding='utf-8') as rf:
        rf.write(report_content)

    print("\nAudit completed!")
    print(f"Report written to: {report_file_path}")
    print(f"Broken Local: {len(broken_local_links)}")
    print(f"Broken External: {len(broken_external_links)}")
    print(f"SEO Issues: {len(seo_metadata_issues)}")
    print(f"Missing Alts: {len(missing_alts)}")

if __name__ == "__main__":
    import sys
    root = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
    run_audit(root)
