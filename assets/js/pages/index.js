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

function initNewsletterPreview() {
  const card = document.getElementById("blog-card");
  if (!card) return;

  const latest = {
    title: "Feb 2026 — GENERAL",
    cover: "https://assets.ashwaracing.org/cdn-cgi/image/format=avif/images/newsletters/2026/2026-02.png",
    pdf: "https://assets.ashwaracing.org/pdfs/newsletters/2026/2026-02-general.pdf",
    date: "Feb 2026"
  };

  document.getElementById("blog-thumb").src = latest.cover;
  document.getElementById("blog-title").textContent = latest.title;
  document.getElementById("blog-excerpt").textContent = "Latest newsletter from Ashwa Racing.";
  document.getElementById("blog-date").textContent = latest.date;

  card.href = latest.pdf;
}