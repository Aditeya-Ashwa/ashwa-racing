/* ============================================================
   ASHWA RACING — about-testimonials.js
   Voices section: paginated grid with prev/next + dots
   ============================================================ */

"use strict";

const voices = [
  {
    name: "Alumni",
    role: "Designated Role",
    image: "assets/images/team/members/2028/image.jpeg",
    quote: "Testimonials coming soon! Watch this space for stories from the people who built Ashwa Racing across generations."
  }
  // Add more entries here as testimonials are collected:
  // {
  //   name: "Full Name",
  //   role: "Role · Batch Year",
  //   image: "assets/images/...",
  //   quote: "Their quote here."
  // },
];

// ─── DOM ─────────────────────────────────────────────────────
const grid      = document.getElementById("voices-grid");
const prevBtn   = document.getElementById("voicesPrev");
const nextBtn   = document.getElementById("voicesNext");
const dotsWrap  = document.getElementById("voicesDots");

// ─── State ───────────────────────────────────────────────────
let pageIndex = 0;
let autoTimer = null;

function getCardsPerPage() {
  if (window.innerWidth < 640)  return 1;
  if (window.innerWidth < 960)  return 2;
  return 3;
}

function totalPages() {
  return Math.ceil(voices.length / getCardsPerPage());
}

// ─── Render ──────────────────────────────────────────────────
function renderVoices(animate = true) {
  const perPage = getCardsPerPage();
  const pages   = totalPages();

  // Clamp page index in case viewport changed
  if (pageIndex >= pages) pageIndex = 0;

  const start = pageIndex * perPage;
  const slice = voices.slice(start, start + perPage);

  // Fade out → swap → fade in
  if (animate) grid.style.opacity = "0";

  setTimeout(() => {
    grid.innerHTML = "";

    // Update column count via inline style to match perPage
    grid.style.gridTemplateColumns = `repeat(${Math.min(perPage, slice.length)}, 1fr)`;

    slice.forEach((v, i) => {
      const card = document.createElement("div");
      card.className = "voice-card";
      card.style.animationDelay = `${i * 0.08}s`;

      card.innerHTML = `
        <div class="voice-header">
          <img class="voice-img"
               src="${v.image}"
               alt="${v.name}"
               loading="lazy"
               onerror="this.style.display='none'">
          <div>
            <div class="voice-meta-name">${v.name}</div>
            <div class="voice-meta-role">${v.role}</div>
          </div>
        </div>
        <p class="voice-quote">"${v.quote}"</p>
      `;

      grid.appendChild(card);
    });

    // Update dots
    renderDots(pages);

    if (animate) grid.style.opacity = "1";
  }, animate ? 200 : 0);
}

// ─── Dots ────────────────────────────────────────────────────
function renderDots(pages) {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = "";

  for (let i = 0; i < pages; i++) {
    const dot = document.createElement("button");
    dot.className = "voices-dot" + (i === pageIndex ? " active" : "");
    dot.setAttribute("aria-label", `Page ${i + 1}`);
    dot.addEventListener("click", () => { goToPage(i); resetTimer(); });
    dotsWrap.appendChild(dot);
  }
}

// ─── Navigation ──────────────────────────────────────────────
function goToPage(n) {
  pageIndex = (n + totalPages()) % totalPages();
  renderVoices();
}

prevBtn?.addEventListener("click", () => { goToPage(pageIndex - 1); resetTimer(); });
nextBtn?.addEventListener("click", () => { goToPage(pageIndex + 1); resetTimer(); });

// Keyboard navigation
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") { goToPage(pageIndex - 1); resetTimer(); }
  if (e.key === "ArrowRight") { goToPage(pageIndex + 1); resetTimer(); }
});

// ─── Auto-advance ────────────────────────────────────────────
function startTimer() {
  autoTimer = setInterval(() => goToPage(pageIndex + 1), 5000);
}

function resetTimer() {
  clearInterval(autoTimer);
  startTimer();
}

// ─── Resize ──────────────────────────────────────────────────
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => renderVoices(false), 200);
});

// ─── Scroll reveal (story steps) ─────────────────────────────
function initReveal() {
  const targets = document.querySelectorAll(
    ".story-step-content, .story-step-media, .about-hero-stats .hs"
  );

  targets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${i * 0.05}s`;
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(el => obs.observe(el));
}

// ─── Init ─────────────────────────────────────────────────────
renderVoices(false);
startTimer();
initReveal();