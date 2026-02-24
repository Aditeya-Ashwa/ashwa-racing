/* ============================================================
   ASHWA RACING — index.js
   Hero slideshow + scroll-reveal
   ============================================================ */

"use strict";

// ─── Hero Slideshow ──────────────────────────────────────────
const slides   = document.querySelectorAll(".hero-slide");
const dots     = document.querySelectorAll(".hero-dot");

let currentIndex  = 0;
let slideshowTimer = null;

/** Activate a specific slide index */
function goToSlide(index) {
  slides[currentIndex].classList.remove("active");
  dots[currentIndex]?.classList.remove("active");

  currentIndex = (index + slides.length) % slides.length;

  slides[currentIndex].classList.add("active");
  dots[currentIndex]?.classList.add("active");
}

/** Advance to the next slide */
function nextSlide() {
  goToSlide(currentIndex + 1);
}

/** Start the auto-advance timer */
function startTimer() {
  clearInterval(slideshowTimer);
  slideshowTimer = setInterval(nextSlide, 7500);
}

// Dot click → jump to slide and restart timer
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const idx = parseInt(dot.dataset.index, 10);
    goToSlide(idx);
    startTimer();
  });
});

// Preload all hero images for smooth transitions
slides.forEach(slide => {
  const url = slide.style.backgroundImage.replace(/url\(['"]?(.+?)['"]?\)/, "$1");
  if (url) {
    const img = new Image();
    img.src = url;
  }
});

// Kick off
startTimer();


// ─── Scroll-reveal ───────────────────────────────────────────
// Stagger-reveal cards/sections as they enter the viewport.
// Uses IntersectionObserver (no library required).

const revealTargets = document.querySelectorAll(
  ".focus-card, .stat-item, .split-content, .sponsors-logos img, .blog-card"
);

revealTargets.forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s,
                          transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s`;
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealTargets.forEach(el => observer.observe(el));


// ─── Ticker pause on reduced motion ──────────────────────────
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const track = document.querySelector(".ticker-track");
  if (track) track.style.animation = "none";
}