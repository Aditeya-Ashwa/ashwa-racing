"use strict";

/* ── Scroll-reveal ── */
const revealEls = document.querySelectorAll(
  ".stat, .split-body, .cta-card, .sponsors-grid img, .feed-card"
);

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReduced) {
  const track = document.querySelector(".ticker-track");
  if (track) track.style.animation = "none";
} else {
  revealEls.forEach((el, i) => {
    el.style.cssText += `opacity:0;transform:translateY(20px);
      transition:opacity .5s cubic-bezier(.16,1,.3,1) ${Math.min(i*.04,.3)}s,
                 transform .5s cubic-bezier(.16,1,.3,1) ${Math.min(i*.04,.3)}s`;
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(0)";
      io.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  revealEls.forEach(el => io.observe(el));
}