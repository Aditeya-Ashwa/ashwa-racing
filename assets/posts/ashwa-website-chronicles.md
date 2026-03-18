# The Ashwa Racing Website: A Forensic Analysis of Organised Chaos

**Author:** Ashwa Racing, Web & Electrical  
**Date:** March 18, 2026  
**Tags:** Behind the Scenes, Web, Culture, 2026

---

*We build a car that does 0–100 in under 4 seconds. We simulate suspension geometry, tune PID loops, and design PCBs from scratch. We are, by any reasonable definition, engineers.*

*Our git log reads like the diary of someone slowly losing their mind.*

This is that story.

---

## The Beginning

`7e342a8 Initial Commit`

Every great project starts here. Full of hope. Full of promise. No idea what is coming.

Three commits later:

`ff4ec10 Too many changes to note. Footers + Some refactor`

We gave up on documentation before the footer was even done. This set the tone for everything that followed.

The website you are reading right now is the product of approximately 150 commits, two primary contributors, one bot, and an indeterminate number of prayers. What follows is an honest accounting of what actually happened.

---

## The Commit Message Hall of Fame

A git log is a record of intent. What did you change? Why? What was the state of the system before and after? It is, in theory, the primary mechanism by which a team communicates about a codebase across time.

Ours communicates the following:

![A representative sample of our version control culture](/assets/images/blog/commit-hof.webp)

**The Minimalists:**

Three commits in this repository contain no meaningful information whatsoever.

- `asdsa`
- `asda`
- `she`

`asdsa` and `asda` are at least phonetically related — perhaps a series, perhaps a deteriorating mental state captured in real time. `she`, however, has no context, no follow-up, and no explanation. It was pushed to main. It is still in the history. Whatever happened in that commit, whoever `she` is, we may never know. The diff is not illuminating. The author has not commented.

**The Theological Commits:**

At least three commits in this repository invoke divine assistance:

- `Styling fixes are upto god :pray`
- `don't delete the google file :pray`
- `claude css :pray fix`

The third is notable because it delegates to *two* higher powers simultaneously — God, and an AI — for a single CSS problem. This is either belt-and-suspenders engineering applied to religion, or a genuine reflection of how difficult that specific CSS bug was. Both interpretations are valid.

**The Existential Crisis Collection:**

- `help me` — no context provided. The commit is self-contained.
- `bruh` — same
- `Some changes for stupid` — the stupid in question has never been publicly identified
- `more changes wtf` — the surprise implied by `wtf` raises the question of what, exactly, was expected

**The Optimists:**

- `Some changes hopefully fixes` — *hopefully*. The most honest word in this entire log.
- `Bare working website ?` — the question mark does a lot of work here. Schrödinger's deployment: simultaneously working and not working until someone checks.
- `fixed an oopsie daisie` — pushed to main. On a live website. Representing an engineering college team at a national competition.

---

## The SEO Saga

At some point, the team discovered that having a website and being *findable* on the internet are two distinct problems. What followed was a months-long, multi-commit effort to resolve this:

`da9aaaa Lot of SEO changes`  
`08d8d40 Added crawlbot instruc+sitemap`  
`02834eb Added sitemap txt should help with indexing of all pages`  
`5f3db4f Index Now setup`

The commit hash `da9aaa` for the SEO commit is not something we planned. The repository did that on its own.

Four separate commits. Eventually a Python script was written, a POST request was sent to `api.indexnow.org`, a `202 Accepted` came back, and the search engine submission problem was declared solved. Whether Google has noticed is, as of this writing, unconfirmed. The bots remain unmoved.

---

## The Merge Situation

This repository has two main contributors and six merge commits.

![The teams branch, doing its thing](/assets/images/blog/merge-chaos.webp)

At one point, the branch `teams` was branched from `main`, merged into `main` via pull request, merged back from `main` into `teams`, and then merged into `main` again. The commit `pullfix` exists because something went wrong during one of these operations and was resolved with sufficient urgency that documenting *what* was fixed felt secondary to fixing it.

This is not a workflow. This is a relationship with git that is best described as complicated.

---

## The Bot

Midway through development, a GitHub Action was written to automatically sync team member data from a Google Form into the website. It has been, without question, the most consistent contributor to this repository:

```
🔄 Auto-sync team data 2026-03-14
🔄 Auto-sync team data 2026-03-14
🔄 Auto-sync team data 2026-03-14
🔄 Auto-sync team data 2026-03-17
```

Three automated syncs on a single day. Timestamped. Formatted. Reliable.

On that same day, a human committed: `Some changes wtf`

The bot does not have feelings about this. The bot does not have feelings about anything. The bot simply commits and moves on. In many respects, the bot has the right approach.

---

## The One Good Commit

Buried in the log is this:

`feat(suspension): Complete rebuild with interactive SVG physics and modern editorial layout`

Conventional commit prefix. Scope defined. Description clear. This commit has read a style guide. It stands in the history like a lighthouse — surrounded, on all sides, by `asdsa`.

And then there is the most self-aware commit in the entire project:

`Fixed a lot of errors written by me using Claude, goated ?!`

The author introduced bugs. Claude identified and fixed them. The author committed the result and described the AI as goated, with a question mark. This is possibly the most accurate description of AI-assisted software development written in 2026, and it happened in a commit message on a Formula Student website.

---

## The Vagueness Cascade

There is a pattern in this log. Once spotted, it cannot be unseen:

`Some changes`  
`Some more changes`  
`Some more changes`  
`Some minimal changes`  
`Some small change`  
`Some visual changes for easier readability`  
`Some image changes`  

Seven commits. Zero specifics. Future maintainers will have no choice but to diff each one individually. We have, in a small but measurable way, made the future worse.

---

## What This Actually Means

The honest version: a Formula Student team built and shipped a full website — blog system, auto-syncing team directory, SEO pipeline, gallery, sponsor pages, subsystem pages, mobile-responsive layout — while simultaneously designing and building a race car.

The commit messages are what they are. The code underneath them is functional, mostly intentional, and occasionally impressive. The suspension page has interactive SVG physics that nobody explicitly asked for and everyone who sees it thinks is cool. The blog system uses a flat-file manifest and marked.js with no backend. The team directory syncs from a Google Form via a scheduled GitHub Action.

None of that shows up in `asdsa`. But it's there.

---

## What Comes Next

Better commit messages. Probably.

Also: instrumented data on the car, a revised sitemap, and at minimum one more blog post written by someone other than the web team making fun of the web team.

---

*Detailed commit diffs, merge conflict archaeology, and the full context of `she` are available in the repository history at github.com/Dilraj07/ashwa-racing. We recommend starting from `Initial Commit` and reading forward. It is an experience.*

**Live it. Love it. Race it.**

— *Ashwa Racing, IT*