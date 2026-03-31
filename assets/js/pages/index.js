"use strict";

/* ── Init ───────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initBlogPreview();
});


/* ── Scroll Reveal ───────────────── */
function initReveal() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const els = document.querySelectorAll(
    ".stat, .split-body, .cta-card, .sponsors-grid img, .feed-card"
  );

  if (!els.length) return;

  els.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(i * 0.04, 0.3)}s`;
  });

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("reveal-visible");
      obs.unobserve(e.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px"
  });

  els.forEach(el => io.observe(el));
}


/* ── Blog Preview ───────────────── */
async function initBlogPreview() {
  const card = document.getElementById("blog-card");
  if (!card) return; // 🔥 don’t fetch if not needed

  try {
    const posts = await fetch("assets/posts/index.json").then(r => r.json());
    if (!posts?.length) return;

    const p = posts.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    const thumb = document.getElementById("blog-thumb");
    const title = document.getElementById("blog-title");
    const excerpt = document.getElementById("blog-excerpt");
    const date = document.getElementById("blog-date");

    card.href = `blog_post.html?slug=${encodeURIComponent(p.slug || "")}`;
    if (thumb) { thumb.src = p.cover || ""; thumb.alt = p.title || ""; }
    if (title) title.textContent = p.title || "";
    if (excerpt) excerpt.textContent = p.excerpt || "";
    if (date && p.date) {
      date.textContent = new Date(p.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }

  } catch {
    // silent fail
  }
}