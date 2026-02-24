# Welcome to Ashwa Racing — We're Back With a New Website

**Author:** Ashwa IT  
**Date:** February 4, 2026  
**Tags:** Announcement, IT, Team Update

---

Ashwa Racing is entering a new phase — both on the track and online. Over the past months the team has been working not only on engineering and testing, but also on rebuilding our digital presence from the ground up. This new website marks a fresh start: cleaner, faster, and structured to better reflect how the team actually operates.

![The XX6C on track during pre-season testing](/assets/images/blog/XX6C.jpg)

## Why a New Website?

The previous site no longer represented the scale, complexity, and direction of the work being done within the team. As Ashwa Racing continues to grow across engineering, manufacturing, testing, and operations, we needed a platform that could do the same.

> "A team that documents its work builds institutional knowledge. A team that doesn't starts from scratch every season."  
> — A principle we've tried to embed into everything we do.

The rebuild focuses on **clarity and structure** rather than flash. Here's what was holding the old site back:

- It couldn't communicate subsystem-level engineering efforts in any meaningful depth
- There was no structured way to document progress, testing cycles, or competition learnings
- Partner and sponsor representation was inconsistent across pages
- It wasn't maintainable — updates required touching too many files

### The Brief We Set Ourselves

We gave IT a simple mandate: build something the team would actually use. Not a marketing brochure, not a portfolio — a **living platform** that grows alongside the car development cycle.

That meant prioritising:

1. Engineering content over aesthetics
2. Easy updates without a developer in the loop
3. A blog system that lets any subsystem lead publish directly
4. Mobile-first performance, because most of our audience reads on phones

## What's New

The updated website introduces several structural improvements over the previous version.

### Subsystem Architecture

Each major subsystem now has dedicated representation across the site — from the team page through to the projects section. Roles, ownership, and technical scope are clearly communicated, which matters both for recruitment and for sponsor conversations.

### The Blog

This is the part we're most invested in. The blog runs on a flat-file `.md` system — posts are written in Markdown, stored as plain files, and rendered client-side. No database, no CMS, no friction.

Any team member can contribute a post by:

1. Writing a `.md` file with the post content
2. Adding a single entry to `index.json` with the post metadata
3. Merging via the standard Git workflow

That's it. The system handles the rest — hero image, read time, table of contents, tags, share links.

### Performance and Responsiveness

The old site had significant performance debt. The rebuild addresses this with:

- No framework dependencies — vanilla HTML, CSS, and JavaScript throughout
- `IntersectionObserver` for all scroll animations (no scroll event listeners)
- Lazy-loaded images with `loading="lazy"` across every page
- A single shared header and footer loaded via `fetch()` to avoid duplication

### Design System

The visual identity is consistent across every page — the same typographic scale, the same colour tokens, the same motion language. The system is built on **Barlow Condensed** for display text and **Barlow** for body copy, with a dark-first palette that reflects the motorsport context.

---

## Looking Ahead

The blog will be used throughout the season to document:

- **Competition reports** — detailed post-event debriefs covering dynamic events, design presentations, and business pitches
- **Engineering insights** — technical deep dives from subsystem leads on design decisions, simulation results, and manufacturing challenges
- **Testing milestones** — documented shakedowns, reliability runs, and data from the test track
- **Team updates** — recruitment cycles, sponsor announcements, and organisational changes

### What We Won't Do

It's worth being explicit about what this blog is *not*:

- It's not a PR channel. Posts will be direct and technical.
- It's not a highlight reel. If a test session surfaces problems, those problems will be documented.
- It's not updated on a fixed schedule. Posts are published when there's something worth saying.

The goal is a record that future Ashwa teams can actually learn from.

---

## A Note on the Tech Stack

For anyone curious about the implementation — the full site is built without any frontend framework. Every page is vanilla HTML, CSS, and JavaScript. The blog uses `marked.js` to render Markdown client-side, with post metadata stored in a flat `index.json` manifest.

```json
{
  "slug": "new-website-2026",
  "title": "Welcome to Ashwa Racing — We're Back With a New Website",
  "date": "2026-02-04",
  "author": "Ashwa IT",
  "cover": "/assets/images/blog/XX6C.jpg",
  "tags": ["Announcement", "IT", "Team Update"],
  "excerpt": "Ashwa Racing is entering a new phase — both on the track and online."
}
```

This keeps the system dependency-free and means the site can be hosted on any static server without a build step.

---

This is just the beginning. As the season progresses the site will continue to grow with detailed documentation of the work that goes into building and running an Ashwa Racing car.

**Live it. Love it. Race it.**

— *Ashwa Racing, IT Division*