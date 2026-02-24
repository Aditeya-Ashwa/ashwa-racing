/* ============================================================
   ASHWA RACING — blog.js
   Handles both blog index (blog_index.html) and
   single post view (blog_post.html).
   ============================================================ */

"use strict";

const isPostPage = window.location.pathname.includes("blog_post.html");

/* ════════════════════════════════════════════════════════════
   INDEX PAGE
════════════════════════════════════════════════════════════ */
if (!isPostPage) {

  const listEl       = document.getElementById("blog-list");
  const featuredEl   = document.getElementById("blog-featured");
  const filterBar    = document.getElementById("blog-filter-bar");
  const countEl      = document.getElementById("blog-post-count");
  const emptyEl      = document.getElementById("blog-empty");
  const sortNewBtn   = document.getElementById("sort-new");
  const sortOldBtn   = document.getElementById("sort-old");

  let allPosts       = [];
  let activeTag      = "all";
  let sortOrder      = "new";   // "new" | "old"

  // ── Show skeleton loaders while fetching ──────────────────
  function showSkeletons(count = 6) {
    listEl.innerHTML = "";
    for (let i = 0; i < count; i++) {
      listEl.innerHTML += `
        <div class="blog-skeleton">
          <div class="blog-skeleton-img"></div>
          <div class="blog-skeleton-body">
            <div class="blog-skeleton-line short"></div>
            <div class="blog-skeleton-line wide"></div>
            <div class="blog-skeleton-line mid"></div>
          </div>
        </div>`;
    }
  }

  // ── Build tag filter buttons from post data ───────────────
  function buildTagFilters(posts) {
    const tags = new Set();
    posts.forEach(p => { if (p.tags) p.tags.forEach(t => tags.add(t)); });

    tags.forEach(tag => {
      const btn = document.createElement("button");
      btn.className       = "blog-filter-btn";
      btn.dataset.tag     = tag;
      btn.textContent     = tag;
      btn.addEventListener("click", () => setTag(tag));
      filterBar.appendChild(btn);
    });
  }

  function setTag(tag) {
    activeTag = tag;
    filterBar.querySelectorAll(".blog-filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tag === tag || (tag === "all" && btn.dataset.tag === "all"));
    });
    renderList();
  }

  // ── Sort ──────────────────────────────────────────────────
  sortNewBtn?.addEventListener("click", () => {
    sortOrder = "new";
    sortNewBtn.classList.add("active");
    sortOldBtn.classList.remove("active");
    renderList();
  });

  sortOldBtn?.addEventListener("click", () => {
    sortOrder = "old";
    sortOldBtn.classList.add("active");
    sortNewBtn.classList.remove("active");
    renderList();
  });

  // ── Featured post (largest / latest) ─────────────────────
  function renderFeatured(post) {
    if (!featuredEl || !post) return;

    const tags = post.tags?.length ? post.tags[0] : "Latest";

    featuredEl.innerHTML = `
      <a class="featured-card" href="blog_post.html?slug=${encodeURIComponent(post.slug)}">
        <div class="featured-card-image">
          <img src="${post.cover || ''}" alt="${post.title}" loading="lazy"
               onerror="this.parentElement.style.background='#1e1e1e'">
          <span class="featured-label">${tags}</span>
        </div>
        <div class="featured-card-body">
          <div class="featured-meta">
            <span>${formatDate(post.date)}</span>
            <span class="featured-meta-sep">·</span>
            <span>${post.author || 'Ashwa Racing'}</span>
          </div>
          <h2 class="featured-title">${post.title}</h2>
          <p class="featured-excerpt">${post.excerpt || ''}</p>
          <span class="featured-read-more">
            Read More <i class="fas fa-arrow-right"></i>
          </span>
        </div>
      </a>
    `;
  }

  // ── Card builder ─────────────────────────────────────────
  function buildCard(post, delay = 0) {
    const card = document.createElement("article");
    card.className = "blog-card";
    card.style.transitionDelay = `${delay}s`;

    const tag  = post.tags?.length ? post.tags[0] : "";
    const slug = encodeURIComponent(post.slug);

    card.innerHTML = `
      <a href="blog_post.html?slug=${slug}" style="display:contents; text-decoration:none;">
        <div class="blog-card-image">
          <img src="${post.cover || ''}" alt="${post.title}" loading="lazy"
               onerror="this.parentElement.style.background='#1e1e1e'">
          ${tag ? `<span class="blog-card-tag">${tag}</span>` : ""}
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span>${formatDate(post.date)}</span>
            ${post.readTime ? `<span class="blog-card-meta-sep">·</span><span>${post.readTime}</span>` : ""}
          </div>
          <h2 class="blog-card-title">${post.title}</h2>
          ${post.excerpt ? `<p class="blog-card-excerpt">${post.excerpt}</p>` : ""}
        </div>
        <div class="blog-card-footer">
          <span class="blog-card-author">${post.author || 'Ashwa Racing'}</span>
          <i class="fas fa-arrow-right blog-card-arrow"></i>
        </div>
      </a>
    `;

    return card;
  }

  // ── Render filtered + sorted list ────────────────────────
  function renderList() {
    let filtered = activeTag === "all"
      ? allPosts
      : allPosts.filter(p => p.tags?.includes(activeTag));

    filtered = [...filtered].sort((a, b) => {
      const da = new Date(a.date), db = new Date(b.date);
      return sortOrder === "new" ? db - da : da - db;
    });

    // Count (exclude featured)
    const grid = filtered.slice(1);
    if (countEl) countEl.textContent = `${grid.length} post${grid.length !== 1 ? "s" : ""}`;

    listEl.innerHTML = "";

    if (grid.length === 0) {
      emptyEl?.removeAttribute("hidden");
    } else {
      emptyEl?.setAttribute("hidden", "");
      grid.forEach((post, i) => {
        const card = buildCard(post, i * 0.05);
        listEl.appendChild(card);
      });
      initCardReveal();
    }

    // Update featured (always latest in filtered set)
    renderFeatured(filtered[0]);
  }

  // ── Scroll reveal for cards ───────────────────────────────
  function initCardReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    listEl.querySelectorAll(".blog-card").forEach(c => obs.observe(c));
  }

  // ── Date formatter ────────────────────────────────────────
  function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  // ── Fetch posts ───────────────────────────────────────────
  showSkeletons();

  fetch("/assets/posts/index.json")
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(posts => {
      allPosts = posts;
      buildTagFilters(posts);
      renderList();
    })
    .catch(() => {
      // Graceful fallback — clear skeletons, show empty state
      listEl.innerHTML = "";
      emptyEl?.removeAttribute("hidden");
      if (featuredEl) featuredEl.innerHTML = "";
    });
}


/* ════════════════════════════════════════════════════════════
   SINGLE POST PAGE (blog_post.html)
════════════════════════════════════════════════════════════ */
if (isPostPage) {

  const params  = new URLSearchParams(window.location.search);
  const slug    = params.get("slug");
  const content = document.getElementById("post-content");

  if (!slug || !content) {
    console.warn("Missing slug or content container");
  } else {

  // ── Helpers ─────────────────────────────────────────────
  function formatDate(str) {
    if (!str) return "";
    return new Date(str).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric"
    });
  }

  function estimateReadTime(text) {
    const words = text.trim().split(/\s+/).length;
    return `${Math.max(1, Math.round(words / 200))} min read`;
  }

  // ── Reading progress bar ─────────────────────────────────
  function initProgressBar() {
    const bar = document.getElementById("post-progress-bar");
    if (!bar || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docH      = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = docH > 0 ? `${(scrollTop / docH) * 100}%` : "0%";
    }, { passive: true });
  }

  // ── Build hero from post metadata ────────────────────────
  function buildHero(post) {
    const heroEl   = document.getElementById("post-hero");
    const skeletonEl = document.getElementById("post-hero-skeleton");
    if (!heroEl) return;

    const tag      = post.tags?.length ? post.tags[0] : "Ashwa Racing";
    const readTime = post.readTime || estimateReadTime(post._rawText || "");

    heroEl.innerHTML = `
      ${post.cover ? `<div class="post-hero-img" style="background-image:url('${post.cover}')"></div>` : ""}
      <div class="post-hero-overlay"></div>
      <div class="post-hero-grid"></div>
      <div class="post-hero-stripe"></div>
      <div class="post-hero-content">
        <div class="post-hero-tag">${tag}</div>
        <h1 class="post-hero-title">${post.title}</h1>
        <div class="post-hero-meta">
          <span class="author">${post.author || "Ashwa Racing"}</span>
          <span class="post-hero-meta-sep">·</span>
          <span>${formatDate(post.date)}</span>
          <span class="post-hero-meta-sep">·</span>
          <span class="read-time">${readTime}</span>
        </div>
      </div>
    `;

    // Update page title
    document.title = `${post.title} | Ashwa Racing`;
  }

  // ── Generate TOC from rendered headings ──────────────────
  function buildTOC() {
    const tocNav = document.getElementById("post-toc-nav");
    const tocEl  = document.getElementById("post-toc");
    if (!tocNav) return;

    const headings = content.querySelectorAll("h2, h3");
    if (headings.length < 2) {
      if (tocEl) tocEl.style.display = "none";
      return;
    }

    // Give each heading an id if it doesn't have one
    headings.forEach((h, i) => {
      if (!h.id) {
        h.id = `section-${i}-${h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
      }
    });

    // Build links
    headings.forEach(h => {
      const link = document.createElement("a");
      link.href      = `#${h.id}`;
      link.className = `toc-link${h.tagName === "H3" ? " toc-h3" : ""}`;
      link.textContent = h.textContent;
      link.addEventListener("click", e => {
        e.preventDefault();
        h.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      tocNav.appendChild(link);
    });

    // Highlight active section on scroll
    const tocLinks = tocNav.querySelectorAll(".toc-link");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(l => l.classList.remove("active"));
          const active = tocNav.querySelector(`[href="#${entry.target.id}"]`);
          active?.classList.add("active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });

    headings.forEach(h => obs.observe(h));
  }

  // ── Build post footer (tags + share) ─────────────────────
  function buildPostFooter(post) {
    const bar = document.getElementById("post-footer-bar");
    if (!bar) return;

    // Tags
    const tagsEl = document.getElementById("post-tags");
    if (tagsEl && post.tags?.length) {
      post.tags.forEach(tag => {
        const span = document.createElement("span");
        span.className   = "post-tag";
        span.textContent = tag;
        tagsEl.appendChild(span);
      });
    }

    // Share: copy link
    const copyBtn = document.getElementById("share-copy");
    copyBtn?.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        copyBtn.classList.add("copied");
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          copyBtn.classList.remove("copied");
          copyBtn.innerHTML = '<i class="fas fa-link"></i>';
        }, 2000);
      });
    });

    // Share: Twitter / X
    const twitterBtn = document.getElementById("share-twitter");
    if (twitterBtn) {
      const tweetText = encodeURIComponent(`${post.title} — Ashwa Racing`);
      const tweetUrl  = encodeURIComponent(window.location.href);
      twitterBtn.href = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;
    }

    // Share: LinkedIn
    const linkedinBtn = document.getElementById("share-linkedin");
    if (linkedinBtn) {
      linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    }

    bar.hidden = false;
  }

  // ── Render markdown ──────────────────────────────────────
  function renderMarkdown(md) {
    // Remove skeleton
    document.getElementById("post-skeleton")?.remove();

    if (typeof marked !== "undefined") {
      marked.setOptions({ breaks: true, gfm: true });
      content.innerHTML = marked.parse(md);
    } else {
      content.innerHTML = `<pre style="white-space:pre-wrap;font-size:.9rem;">${md}</pre>`;
    }
  }

  // ── Not found state ──────────────────────────────────────
  function showNotFound() {
    document.getElementById("post-hero-skeleton")?.remove();
    document.getElementById("post-skeleton")?.remove();
    content.innerHTML = `
      <div style="text-align:center;padding:80px 0;color:#aaa;">
        <p style="font-family:var(--font-display);font-size:1.2rem;
                  letter-spacing:.12em;text-transform:uppercase;color:#ccc;">
          Post Not Found
        </p>
        <a href="blog_index.html"
           style="display:inline-block;margin-top:20px;font-family:var(--font-display);
                  font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;
                  color:var(--red);text-decoration:none;border-bottom:1px solid var(--red);">
          ← Back to Blog
        </a>
      </div>`;
  }

  // ── Main load sequence ───────────────────────────────────
  // 1. Fetch index.json to get metadata for the hero
  // 2. Fetch the .md file for content
  // Both run in parallel via Promise.all

  initProgressBar();

  Promise.all([
    fetch("/assets/posts/index.json")
      .then(r => r.ok ? r.json() : [])
      .catch(() => []),
    fetch(`/assets/posts/${encodeURIComponent(slug)}.md`)
      .then(r => {
        if (!r.ok) throw new Error("not found");
        return r.text();
      })
  ])
  .then(([posts, md]) => {
    const meta = posts.find(p => p.slug === slug) || {};
    meta._rawText = md;

    buildHero(meta);
    renderMarkdown(md);
    buildTOC();
    buildPostFooter(meta);
  })
  .catch(err => {
    console.warn("Blog post load error:", err);
    showNotFound();
  });

}
}