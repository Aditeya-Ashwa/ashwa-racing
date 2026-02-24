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
  console.warn("Missing slug or post container.");
} else {

  // Show skeleton in post content while loading
  content.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:14px;padding:40px 0;">
      <div class="blog-skeleton-line wide" style="height:16px;border-radius:2px;"></div>
      <div class="blog-skeleton-line mid"  style="height:16px;border-radius:2px;"></div>
      <div class="blog-skeleton-line wide" style="height:16px;border-radius:2px;"></div>
      <div class="blog-skeleton-line short"style="height:16px;border-radius:2px;"></div>
    </div>`;

  fetch(`/assets/posts/${encodeURIComponent(slug)}.md`)
    .then(r => {
      if (!r.ok) throw new Error(`Post not found: ${slug}`);
      return r.text();
    })
    .then(md => {
      if (typeof marked !== "undefined") {
        content.innerHTML = marked.parse(md);
      } else {
        // Basic fallback if marked.js isn't loaded
        content.innerHTML = `<pre style="white-space:pre-wrap;">${md}</pre>`;
      }
    })
    .catch(err => {
      content.innerHTML = `
        <div style="text-align:center;padding:60px 0;color:rgba(255,255,255,0.3);">
          <p style="font-family:var(--font-display);letter-spacing:.1em;text-transform:uppercase;">
            Post not found.
          </p>
        </div>`;
      console.warn("Blog post load error:", err);
    });
}
}