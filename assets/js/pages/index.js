"use strict";

/* ── Init ───────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initNewsletterPreview();
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


/* ── Newsletter Preview ──────────── */
function initNewsletterPreview() {
  const card  = document.getElementById("blog-card");
  const thumb = document.getElementById("blog-thumb");
  if (!card || !thumb) return;

  const latest = {
    title:  "June 2026 — GENERAL",
    // FIX: add width + quality to CDN URL — prevents oversized download
    // and ensures correct aspect ratio (600×450) matches img width/height attrs in HTML
    cover:  "https://assets.ashwaracing.org/cdn-cgi/image/width=600,format=avif,quality=80/images/newsletters/2026/2026-06.png",
    pdf:    "https://assets.ashwaracing.org/pdfs/newsletters/2026/2026-06-general.pdf",
    date:   "June 2026",
    excerpt: "June 2026 newsletter from Ashwa Racing — RZ-XX7C electrical redesign consolidation; RZ-XX8E simulation work sets FDR and energy targets for the EV prototype; plus May expenses, sponsor roster, and team directory."
  };

  // Set src last — width/height attrs already on the img element in HTML prevent CLS
  thumb.src = latest.cover;
  document.getElementById("blog-title").textContent   = latest.title;
  document.getElementById("blog-excerpt").textContent = latest.excerpt;
  document.getElementById("blog-date").textContent    = latest.date;
  card.href = latest.pdf;
}