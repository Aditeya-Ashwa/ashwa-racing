/* ============================================================
   ASHWA RACING — index.js
   Blog-driven hero slideshow + scroll-reveal
   ============================================================ */

"use strict";

/* ─────────────────────────────────────────────────────────────
   HERO — loads latest blog posts from index.json,
   builds one slide per post (cover image + editorial overlay)
───────────────────────────────────────────────────────────── */

const slidesEl   = document.getElementById("hero-slides");
const contentEl  = document.getElementById("hero-content");
const dotsEl     = document.getElementById("hero-dots");
const prevBtn    = document.getElementById("hero-prev");
const nextBtn    = document.getElementById("hero-next");

let heroPosts    = [];
let heroIndex    = 0;
let heroTimer    = null;

const HERO_MAX      = 5;
const HERO_INTERVAL = 7500;

// ── Date formatter ──────────────────────────────────────────
function fmtDate(str) {
  if (!str) return "";
  return new Date(str).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// ── Build all slide background divs ─────────────────────────
function buildSlides(posts) {
  slidesEl.innerHTML = "";
  posts.forEach((post, i) => {
    const div = document.createElement("div");
    div.className = "hero-slide" + (i === 0 ? " active" : "");
    if (post.cover) div.style.backgroundImage = `url('${post.cover}')`;
    slidesEl.appendChild(div);
    if (post.cover) { const img = new Image(); img.src = post.cover; }
  });
}

// ── Build dot indicators ─────────────────────────────────────
function buildDots(count) {
  dotsEl.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const btn = document.createElement("button");
    btn.className = "hero-dot" + (i === 0 ? " active" : "");
    btn.dataset.index = i;
    btn.setAttribute("aria-label", `Slide ${i + 1}`);
    btn.addEventListener("click", () => { goToSlide(i); startTimer(); });
    dotsEl.appendChild(btn);
  }
}

// ── Render editorial content panel ──────────────────────────
function renderContent(post) {
  const tag  = post.tags?.length ? post.tags[0] : "Latest";
  const slug = encodeURIComponent(post.slug || "");

  contentEl.classList.add("hero-content--exit");

  setTimeout(() => {
    contentEl.innerHTML = `
      <div class="hero-eyebrow">
        <span class="eyebrow-dash"></span>
        <span class="hero-post-tag">${tag}</span>
        <span class="hero-post-sep">·</span>
        <span class="hero-post-date">${fmtDate(post.date)}</span>
      </div>
      <h1 class="hero-post-title">${post.title}</h1>
      ${post.excerpt ? `<p class="hero-post-excerpt">${post.excerpt}</p>` : ""}
      <div class="hero-cta-group">
        <a href="blog_post.html?slug=${slug}" class="btn-primary">Read now</a>
        <a href="blog_index.html" class="btn-ghost">All Posts <i class="fas fa-arrow-right"></i></a>
      </div>
    `;
    contentEl.classList.remove("hero-content--exit");
  }, 220);
}

// ── Activate a slide ─────────────────────────────────────────
function goToSlide(index) {
  const slides = slidesEl.querySelectorAll(".hero-slide");
  const dots   = dotsEl.querySelectorAll(".hero-dot");

  slides[heroIndex]?.classList.remove("active");
  dots[heroIndex]?.classList.remove("active");

  heroIndex = (index + heroPosts.length) % heroPosts.length;

  slides[heroIndex]?.classList.add("active");
  dots[heroIndex]?.classList.add("active");

  renderContent(heroPosts[heroIndex]);
}

function startTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => goToSlide(heroIndex + 1), HERO_INTERVAL);
}

prevBtn?.addEventListener("click", () => { goToSlide(heroIndex - 1); startTimer(); });
nextBtn?.addEventListener("click", () => { goToSlide(heroIndex + 1); startTimer(); });
slidesEl?.addEventListener("mouseenter", () => clearInterval(heroTimer));
slidesEl?.addEventListener("mouseleave", startTimer);

// ── Fallback while loading ───────────────────────────────────
function showFallback() {
  const fallbackImages = [
    "assets/images/team/2021 hybrd.webp",
    "assets/images/team/2025.webp",
    "assets/images/team/Consulate.webp",
    "assets/images/team/Hyperloop.webp"
  ];
  slidesEl.innerHTML = fallbackImages.map((src, i) =>
    `<div class="hero-slide${i === 0 ? " active" : ""}" style="background-image:url('${src}')"></div>`
  ).join("");

  contentEl.innerHTML = `
    <div class="hero-eyebrow">
      <span class="eyebrow-dash"></span>
      <span>Since 2003 · RV College of Engineering</span>
    </div>
    <h1 class="hero-post-title">Ashwa Racing</h1>
    <p class="hero-post-excerpt">Precision engineering. Relentless performance.<br>India's premier Formula Student team.</p>
    <div class="hero-cta-group">
      <a href="team.html" class="btn-primary">Meet the Team</a>
      <a href="projects.html" class="btn-ghost">Our Cars <i class="fas fa-arrow-right"></i></a>
    </div>
  `;
}

// ── Bootstrap ────────────────────────────────────────────────
showFallback();

fetch("assets/posts/index.json")
  .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(posts => {
    heroPosts = [...posts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, HERO_MAX);

    if (!heroPosts.length) return;

    buildSlides(heroPosts);
    buildDots(heroPosts.length);
    heroIndex = 0;
    renderContent(heroPosts[0]);
    startTimer();
  })
  .catch(() => {
    // Fallback stays; fake heroPosts so dots/timer work
    heroPosts = [
      { title: "Ashwa Racing", excerpt: "India's premier Formula Student team.", date: "", tags: ["Team"], slug: "" },
      { title: "Ashwa Racing", excerpt: "", date: "", tags: ["Team"], slug: "" },
      { title: "Ashwa Racing", excerpt: "", date: "", tags: ["Team"], slug: "" },
      { title: "Ashwa Racing", excerpt: "", date: "", tags: ["Team"], slug: "" }
    ];
    buildDots(heroPosts.length);
    startTimer();
  });


/* ─────────────────────────────────────────────────────────────
   SCROLL-REVEAL
───────────────────────────────────────────────────────────── */
const revealTargets = document.querySelectorAll(
  ".focus-card, .stat-item, .split-content, .sponsors-logos img"
);

revealTargets.forEach((el, i) => {
  el.style.opacity   = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s,
                          transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s`;
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealTargets.forEach(el => observer.observe(el));


/* ─────────────────────────────────────────────────────────────
   TICKER — pause on reduced motion
───────────────────────────────────────────────────────────── */
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const track = document.querySelector(".ticker-track");
  if (track) track.style.animation = "none";
}