# Ashwa Racing — Website

The official website for Ashwa Racing, the Formula Student team of RV College of Engineering, Bengaluru. Live at [ashwa-racing.github.io](https://ashwa-racing.github.io).

Built without a framework. No build step, no bundler, no dependencies to install. Open `index.html` in a browser and it works.

---

## What's in the repo

```
ashwa-racing.github.io/
│
├── index.html                  # Home — hero slideshow, sponsors strip, subsystem grid
├── about.html                  # Team history, mission, alumni testimonials
├── projects.html               # Prototype archive across all generations
├── team.html                   # Full team roster with subsystem filtering
├── sponsors.html               # Partner showcase by tier
├── smp.html                    # Sponsorship prospectus page
├── recruitment.html            # Open positions and application flow
├── contact.html                # Contact form
├── alumni.html                 # Alumni org chart and legacy members
├── achievements.html           # Competition results and records
├── gallery.html                # Photo gallery
├── blog_index.html             # Blog listing — all posts
├── blog_post.html              # Blog post reader (shared template)
│
├── — Subsystem pages —
├── aero.html
├── brakes-logistics.html
├── chassis-workshop.html
├── drivetrain-hr.html
├── electrical-testing.html
├── engine.html
├── finance.html
├── it.html
├── suspension-admin.html
│
├── components/
│   ├── header.html             # Shared nav, loaded via fetch()
│   └── footer.html             # Shared footer, loaded via fetch()
│
├── assets/
│   ├── css/
│   │   ├── global.css          # Design tokens, reset, typography, shared layout
│   │   └── pages/             # One CSS file per page (e.g. index.css, blog.css)
│   │
│   ├── js/
│   │   ├── header.js           # Injects header.html, handles nav scroll state
│   │   └── pages/             # One JS file per page (e.g. index.js, blog.js, team.js)
│   │
│   ├── posts/
│   │   ├── index.json          # Blog post manifest — source of truth for all posts
│   │   └── *.md               # Individual post files in Markdown
│   │
│   └── images/
│       ├── blog/              # Post cover images
│       ├── prototypes/        # Car photography per generation
│       ├── sponsors/          # Sponsor logos (SVG preferred)
│       └── team/              # Team and event photography
│
├── robots.txt
├── sitemap.xml
├── sitemap.txt
└── .github/workflows/         # GitHub Actions (Pages deployment)
```

---

## How the site works

### No framework, no build step

Every page is a plain HTML file. Styles live in `assets/css/`, scripts in `assets/js/`. There's no compilation, no npm, no bundler. To run it locally, just open any `.html` file directly in Chrome or Firefox — or serve the root directory with any static server if you need `fetch()` calls to work across pages:

```bash
# Python (any machine with Python 3)
python -m http.server 8000

# Node (if you have it)
npx serve .
```

`fetch()` calls fail on `file://` protocol in some browsers (CORS restriction), so the local server route is recommended for anything involving the blog or shared components.

### Shared header and footer

Rather than copying nav HTML into every page, `header.html` and `footer.html` live in `components/` and are injected at runtime:

```js
// header.js does roughly this
fetch('/components/header.html')
  .then(r => r.text())
  .then(html => {
    document.getElementById('header-placeholder').innerHTML = html;
    // then sets active nav link, scroll behaviour, etc.
  });
```

Every HTML page has `<div id="header-placeholder"></div>` at the top and loads `header.js` with `defer`. This means any nav change is a one-file edit.

### Blog system

The blog runs on flat files — no database, no CMS.

**How it works:**

1. `assets/posts/index.json` is the post manifest. It's an array of objects, one per post:

```json
{
  "slug": "new-website-2026",
  "title": "Welcome to Ashwa Racing — We're Back With a New Website",
  "date": "2026-02-04",
  "author": "Ashwa IT",
  "cover": "/assets/images/blog/XX6C.jpg",
  "tags": ["Announcement", "IT", "Team Update"],
  "excerpt": "Ashwa Racing is entering a new phase — both on the track and online.",
  "readTime": "5 min read"
}
```

2. Each post is a `.md` file in `assets/posts/` named `{slug}.md`.

3. `blog_index.html` fetches `index.json`, sorts by date, and renders the listing.

4. `blog_post.html` is a shared template. It reads the `?slug=` query parameter, fetches the corresponding `.md` file, and renders it using [marked.js](https://marked.js.org/) loaded from CDN.

**To publish a new post:**
- Write the post as a `.md` file and drop it in `assets/posts/`
- Add one entry to `assets/posts/index.json`
- Commit and push — that's it

No rebuild, no deploy step beyond the standard GitHub Pages push.

### Hero slideshow (index page)

The home page hero pulls the five most recent posts from `index.json` and turns them into editorial slides — cover image as background, post title and excerpt overlaid. If the fetch fails or is slow, a static fallback with team photos shows immediately. The post-driven slides replace the fallback once loaded.

### Team page filtering

`team.html` renders the full roster and supports `?sub=Suspension` style query parameters to pre-filter by subsystem. The subsystem pages (`suspension-admin.html`, `aero.html`, etc.) link here with the relevant parameter so visitors land on the right filtered view.

### Alumni org chart

`alumni.html` builds the org chart dynamically from `alumni-data.js` — a structured JS object containing every alumnus, their role, subsystem, and which generation they were part of. The chart is rendered into the DOM via `alumni.js` using inline-flex column layout, no canvas, no third-party chart library.

### Scroll animations

All scroll-triggered fade-ins use `IntersectionObserver`. There are no scroll event listeners anywhere in the codebase. Elements get a `data-reveal` attribute in HTML; `global.js` (or the page script) sets up the observer and toggles a `.visible` class when they enter the viewport.

---

## Adding content

### New blog post

```
1. Create assets/posts/your-slug.md
2. Add entry to assets/posts/index.json
3. Push
```

The slug must match between the filename and the `index.json` entry. The `cover` path should be absolute from the repo root (e.g. `/assets/images/blog/your-image.jpg`).

### New team member

Open `assets/js/pages/team.js`. Members are stored in a JS array — add an object with `name`, `role`, `subsystem`, `image`, and optionally `linkedin`. The page re-renders on load.

### New sponsor

Sponsors on the home page and `sponsors.html` are rendered from a data array in their respective page scripts. Add the sponsor object with `name`, `logo` (path to SVG in `assets/images/sponsors/`), `tier`, and `url`. SVG logos are preferred — they stay sharp on retina displays and high-DPI screens.

### New prototype / car generation

`projects.html` pulls from a data array in `assets/js/pages/projects.js`. Each prototype entry has `name`, `year`, `image`, `specs`, and a short description. Add an entry and drop the images in `assets/images/prototypes/`.

---

## Design system

The visual language is defined in `assets/css/global.css` as CSS custom properties:

```css
:root {
  --color-red:     #E63946;   /* Ashwa red — CTAs, accents, hover states */
  --color-bg:      #0a0a0a;   /* Page background */
  --color-surface: #111111;   /* Cards, panels */
  --color-border:  rgba(255, 255, 255, 0.08);
  --color-text:    #f0f0f0;
  --color-muted:   rgba(255, 255, 255, 0.45);

  --font-display:  'Barlow Condensed', sans-serif;   /* Headers, hero text */
  --font-body:     'Barlow', sans-serif;             /* Body copy, UI */
}
```

Both fonts are loaded from Google Fonts. The typographic scale, spacing units, and motion tokens (transition durations, easing curves) all live here rather than being repeated per-page.

Page-specific overrides go in the corresponding `assets/css/pages/*.css` file.

---

## Subsystem pages

Each subsystem has a dedicated HTML page (`aero.html`, `chassis-workshop.html`, etc.) that follows the same layout template: a hero section, a technical overview, a team roster pulled from the team data filtered to that subsystem, and links to related blog posts. Adding a new subsystem page means copying an existing one and updating the content and the `?sub=` filter value.

---

## Deployment

The site deploys automatically to GitHub Pages on every push to `main`. The workflow is in `.github/workflows/`. No build step is involved — Pages serves the repo root directly.

Custom domain is not currently configured; the site lives at the default `ashwa-racing.github.io` URL.

---

## File naming conventions

- HTML pages: lowercase, hyphenated (`blog_index.html`, `suspension-admin.html`)
- CSS/JS page files: match the HTML filename (`blog.css`, `blog.js`)
- Images: lowercase, hyphenated, descriptive (`XX6C-front-corner.jpg` not `IMG_2047.jpg`)
- Blog post slugs: lowercase, hyphenated, match both the `.md` filename and `index.json` slug field

---

## Things worth knowing

**Why no framework?** The site has no npm, no React, no build pipeline. This is intentional — anyone on the team should be able to open a file, make a change, and push it without understanding a toolchain. The maintenance burden stays low across team turnovers.

**Why `fetch()` for components?** Avoids duplicating nav HTML across 25+ pages. The alternative — server-side includes — isn't available on GitHub Pages. The fetch approach works fine for a static site this size.

**Why Markdown for the blog?** Subsystem leads write posts. Asking them to write HTML is a barrier; Markdown isn't. The flat-file approach also means posts are version-controlled alongside the code with no external dependency.

**Why inline JS data arrays instead of JSON for team/sponsors?** Simplicity. JSON requires a `fetch()` and error handling. A JS array in the page script is synchronous, easier to edit, and doesn't add a network request. For post metadata, `index.json` is external because it's shared across two pages (`blog_index.html` and `index.html`).

---

## License

MIT. See `LICENSE`.