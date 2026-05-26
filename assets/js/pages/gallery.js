/* ============================================================
   ASHWA RACING — GALLERY JS
   
   TO ADD A PHOTO:
   1. Drop .webp into assets/images/gallery/
   2. Add one entry to galleryData below
   3. Push. Done.
============================================================ */

const CDN_BASE = "https://assets.ashwaracing.org/images/";

const galleryData = [
  {
    story: true,
    chapter: "Chapter 01",
    title: "Concept to chassis",
    desc: "From first sketches to the rolling frame that defines a season.",
    meta: "2015-2026",
    category: "car",
    layout: "story"
  },
  {
    title: "RZ-05-C Early Rollout",
    src: "assets/images/prototypes/RZ-05-C/1.jpg",
    desc: "The early generation cars set the stance, packaging, and lessons we still build on.",
    category: "car",
    layout: "wide"
  },
  {
    title: "RZ-07-C Packaging Run",
    src: "assets/images/prototypes/RZ-07-C/12.jpg",
    desc: "Geometry locked, composites in place, and a full system check before competition season.",
    category: "car",
    layout: "tall"
  },
  {
    title: "RZ-X8-C Pre-Event Shakedown",
    src: "assets/images/prototypes/RZ-X8-C/PRE-EVENT/1.jpg",
    desc: "Every iteration runs longer, cleaner, and closer to peak pace.",
    category: "car",
    layout: "feature"
  },
  {
    title: "RZ-XX5C in Action",
    image: "XX5C",
    desc: "First prototype post-2021 to clear TI and run endurance. P2 Cost and Manufacturing at FB2025.",
    category: "car"
  },
  {
    title: "RZ-XX6C",
    image: "XX6C",
    desc: "P6 overall at Formula Bharat 2026. Top 5 Engineering Design, 2nd Business Plan Presentation.",
    category: "car"
  },
  {
    title: "Prototype Era Lineup",
    src: "assets/images/prototypes/Prototypesbanner.webp",
    desc: "A decade-long lineage of learning, each chassis refining the next.",
    category: "car",
    layout: "wide"
  },
  {
    story: true,
    chapter: "Chapter 02",
    title: "Race week rhythm",
    desc: "Static events, endurance runs, and the quiet reset between attempts.",
    meta: "Competition",
    category: "competition",
    layout: "story"
  },
  {
    title: "Endurance Flow",
    image: "IMG_3970_Original",
    desc: "The long run that proves the build: heat, pace, and consistency.",
    category: "competition",
    layout: "feature"
  },
  {
    title: "P2 Cost Presentation",
    image: "Costwin",
    desc: "2nd place Cost and Manufacturing at Formula Bharat 2025.",
    category: "competition"
  },
  {
    title: "RZ-09-C Track Light",
    src: "assets/images/prototypes/RZ-09-C/EVENT/1.jpg",
    desc: "Late afternoon runs and tight lines that define the lap.",
    category: "competition",
    layout: "wide"
  },
  {
    title: "RZ-06-C Endurance Sprint",
    src: "assets/images/prototypes/RZ-06-C/event/20.jpg",
    desc: "Momentum builds when the car settles into its stride.",
    category: "competition",
    layout: "tall"
  },
  {
    title: "RZ-06-C Dynamic Run",
    src: "assets/images/prototypes/RZ-06-C/event/21.jpg",
    desc: "Precision through slaloms, braking points dialed to the meter.",
    category: "competition"
  },
  {
    title: "RZ-09-C Paddock Reset",
    src: "assets/images/prototypes/RZ-09-C/POST-EVENT/1.jpg",
    desc: "Tools down, data up, and the next iteration already underway.",
    category: "competition"
  },
  {
    story: true,
    chapter: "Chapter 03",
    title: "Workshop nights",
    desc: "Fabrication, testing, and the quiet grind that makes the weekend possible.",
    meta: "Build and test",
    category: "workshop",
    layout: "story"
  },
  {
    title: "Composite Bay",
    image: "DSC_0698",
    desc: "Layups, trims, and the fit that makes the aero work.",
    category: "workshop",
    layout: "feature"
  },
  {
    title: "RZ-05-C Chassis Prep",
    src: "assets/images/prototypes/RZ-05-C/4.jpg",
    desc: "Alignment checks and setup work before the first test cycle.",
    category: "workshop",
    layout: "tall"
  },
  {
    title: "RZ-07-C Assembly Pass",
    src: "assets/images/prototypes/RZ-07-C/18.jpg",
    desc: "Subsystems come together, wiring and cooling locked in.",
    category: "workshop"
  },
  {
    title: "RZ-X8-C Pre-Event Build",
    src: "assets/images/prototypes/RZ-X8-C/PRE-EVENT/6.jpg",
    desc: "Final checks before the car leaves the bay.",
    category: "workshop",
    layout: "wide"
  },
  {
    title: "RZ-06-C Final Fit",
    src: "assets/images/prototypes/RZ-06-C/postevent/2.jpg",
    desc: "Post-run analysis feeds straight back into the workshop loop.",
    category: "workshop"
  },
  {
    title: "RZ-XX6-C Detail Pass",
    src: "assets/images/prototypes/RZ-XX6-C/postevent/3.png",
    desc: "The small details that make a big difference on race day.",
    category: "workshop"
  },
  {
    story: true,
    chapter: "Chapter 04",
    title: "People behind the machine",
    desc: "Designers, fabricators, drivers, and managers moving in sync.",
    meta: "Team",
    category: "team",
    layout: "story"
  },
  {
    title: "Hyperloop - Zurich 2024",
    image: "Hyperloop",
    desc: "Ashwa Mobility Foundation's first hyperloop prototype at European Hyperloop Week 2024.",
    category: "team"
  },
  {
    title: "Full Team 2026",
    src: "assets/images/team/fullteam/2026-C.png",
    desc: "A full-season crew ready for build, test, and compete.",
    category: "team",
    layout: "wide"
  },
  {
    title: "Full Team 2025",
    src: "assets/images/team/fullteam/2025-C.png",
    desc: "A season of steady gains and a tighter workflow.",
    category: "team"
  },
  {
    title: "Full Team 2021",
    src: "assets/images/team/fullteam/2021-H.png",
    desc: "The year that kept the team sharp through the reset.",
    category: "team",
    layout: "feature"
  }
  /* Add more entries here ↓
  {
    title: "",
    src: "",          // full path, or use image: "" for gallery webp
    desc:  "",
    category: "",     // car | competition | workshop | team
    layout: ""        // wide | tall | feature | story
  },
  */
];

/* ============================================================
   SETUP
============================================================ */
const NUM_COLS = 4;
const GAP = 8; // must match --gap in CSS (px)

let currentLbIndex = 0;       // index into activeItems
let activeItems = [];      // subset of galleryData indices

const section = document.querySelector(".gallery-section");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbTitle = document.getElementById("lbTitle");
const lbDesc = document.getElementById("lbDesc");
const lbCounter = document.getElementById("lbCounter");
const heroCollage = document.querySelector(".gallery-hero__collage");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const categories = [
  {
    key: "car",
    title: "Cars",
    desc: "Prototype builds and track-ready machines."
  },
  {
    key: "competition",
    title: "Competition",
    desc: "Endurance runs, static events, and podium moments."
  },
  {
    key: "workshop",
    title: "Workshop",
    desc: "Fabrication, testing, and late nights in the bay."
  },
  {
    key: "team",
    title: "Team",
    desc: "The people behind the machine and the wins."
  }
];

const layoutRatios = {
  story: 0.72,
  wide: 0.62,
  tall: 1.35,
  feature: 1.05
};

function isAbsoluteUrl(url) {
  return url.startsWith("http://") || url.startsWith("https://");
}

function toCdnPath(path) {
  const clean = path.replace(/^\/+/, "");
  if (clean.startsWith("assets/images/")) {
    return clean.slice("assets/images/".length);
  }
  return clean;
}

function toAbsoluteUrl(url) {
  if (isAbsoluteUrl(url)) return url;
  return new URL(url, window.location.href).href;
}

function getLocalSrc(item) {
  return item.src || `assets/images/gallery/${item.image}.webp`;
}

function getItemSrc(item) {
  const raw = getLocalSrc(item);
  if (isAbsoluteUrl(raw)) return raw;
  return `${CDN_BASE}${toCdnPath(raw)}`;
}

function applyFallback(img, localSrc) {
  if (!img || !localSrc) return;
  img.dataset.fallback = toAbsoluteUrl(localSrc);
  img.onerror = () => {
    if (img.src === img.dataset.fallback) return;
    img.src = img.dataset.fallback;
  };
}

/* ============================================================
   BUILD MASONRY
   Distribute items across columns by shortest column height.
   Images are loaded before measuring — no layout thrash.
============================================================ */
function getColCount() {
  const w = window.innerWidth;
  if (w <= 420) return 1;
  if (w <= 680) return 2;
  if (w <= 1024) return 3;
  return NUM_COLS;
}

function buildMasonry(indices, mount) {
  if (indices.length === 0) {
    const empty = document.createElement("p");
    empty.className = "gallery-empty show";
    empty.textContent = "No photos in this section yet.";
    mount.appendChild(empty);
    return;
  }

  const cols = getColCount();
  const heights = new Array(cols).fill(0);
  const colEls = [];

  /* create grid + columns */
  const grid = document.createElement("div");
  grid.className = "masonry-grid";

  for (let c = 0; c < cols; c++) {
    const col = document.createElement("div");
    col.className = "masonry-col";
    grid.appendChild(col);
    colEls.push(col);
  }
  mount.appendChild(grid);

  /* load all images first, then place them shortest-column-first */
  const lightboxIndices = indices.filter(i => !galleryData[i].story);
  const lightboxPosMap = new Map(
    lightboxIndices.map((dataIdx, pos) => [dataIdx, pos])
  );

  const promises = indices.map((dataIdx, posInFiltered) => {
    const item = galleryData[dataIdx];
    const ratioOverride = layoutRatios[item.layout];

    if (item.story) {
      return Promise.resolve({
        dataIdx,
        posInFiltered,
        naturalHeight: 220,
        naturalWidth: 300,
        ratioOverride
      });
    }

    return new Promise(resolve => {
      const img = new Image();

      img.onload = img.onerror = () => {
        resolve({
          dataIdx,
          posInFiltered,
          naturalHeight: img.naturalHeight || 200,
          naturalWidth: img.naturalWidth || 300,
          ratioOverride
        });
      };

      img.src = getItemSrc(item);
    });
  });

  Promise.all(promises).then(results => {
    results.forEach(({ dataIdx, posInFiltered, naturalHeight, naturalWidth, ratioOverride }) => {
      const item = galleryData[dataIdx];

      /* which column is shortest right now? */
      const colIdx = heights.indexOf(Math.min(...heights));
      const colWidth = colEls[colIdx].getBoundingClientRect().width || 300;
      const aspectRatio = ratioOverride || (naturalHeight / naturalWidth);
      const renderedH = colWidth * aspectRatio;

      heights[colIdx] += renderedH + GAP;

      /* build DOM node */
      const div = document.createElement("div");
      div.className = "gallery-item reveal";
      div.dataset.idx = dataIdx;
      div.style.transitionDelay = `${Math.min(posInFiltered * 35, 200)}ms`;

      if (item.story) {
        div.classList.add("is-story");
        div.style.height = `${Math.round(renderedH)}px`;
        div.innerHTML = `
          <div class="gallery-story">
            <span class="story-eyebrow">${item.chapter || "Story"}</span>
            <h3 class="story-title">${item.title}</h3>
            <p class="story-desc">${item.desc}</p>
            ${item.meta ? `<span class="story-meta">${item.meta}</span>` : ""}
          </div>
        `;
      } else {
        const localSrc = getLocalSrc(item);
        const src = getItemSrc(item);
        if (ratioOverride) {
          div.classList.add("is-cover", `is-${item.layout}`);
          div.style.height = `${Math.round(renderedH)}px`;
        }

        if (!prefersReducedMotion) {
          div.classList.add("is-animated");
          if (posInFiltered % 2 === 1) {
            div.classList.add("is-animated-alt");
          }
        }

        div.innerHTML = `
          <img
            src="${src}"
            alt="${item.title}"
            loading="lazy"
            decoding="async">
          <div class="gallery-overlay">
            <div class="ov-expand"><i class="fas fa-expand-alt"></i></div>
            <span class="ov-tag">${item.category}</span>
            <p class="ov-title">${item.title}</p>
            <p class="ov-desc">${item.desc}</p>
          </div>
        `;

        const imgEl = div.querySelector("img");
        applyFallback(imgEl, localSrc);

        const lightboxPos = lightboxPosMap.get(dataIdx);
        if (lightboxPos !== undefined) {
          div.addEventListener("click", () => openLightbox(lightboxIndices, lightboxPos));
        }
      }

      colEls[colIdx].appendChild(div);
      observeReveal(div);
    });
  });
}
function buildSections() {
  section.innerHTML = "";

  categories.forEach((cat, idx) => {
    const indices = galleryData
      .map((_, i) => i)
      .filter(i => galleryData[i].category === cat.key);

    const imageIndices = indices.filter(i => !galleryData[i].story);

    const group = document.createElement("div");
    group.className = "gallery-group";
    group.dataset.category = cat.key;

    const count = String(imageIndices.length).padStart(2, "0");

    group.innerHTML = `
      <div class="gallery-group__head reveal">
        <div class="gallery-group__eyebrow">Section ${String(idx + 1).padStart(2, "0")}</div>
        <div class="gallery-group__title-row">
          <h2 class="gallery-group__title">${cat.title}</h2>
          <span class="gallery-group__count">${count}</span>
        </div>
        <p class="gallery-group__desc">${cat.desc}</p>
      </div>
    `;

    const gridWrap = document.createElement("div");
    gridWrap.className = "gallery-group__grid";
    group.appendChild(gridWrap);
    section.appendChild(group);

    observeReveal(group.querySelector(".gallery-group__head"));
    buildMasonry(indices, gridWrap);
  });
}

function openLightbox(indices, filteredPos) {
  activeItems = indices;
  currentLbIndex = filteredPos;
  renderLightbox();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

function renderLightbox() {
  const dataIdx = activeItems[currentLbIndex];
  const item = galleryData[dataIdx];
  lbImg.src = getItemSrc(item);
  lbImg.alt = item.title;
  lbTitle.textContent = item.title;
  lbDesc.textContent = item.desc;
  lbCounter.textContent = `${currentLbIndex + 1} / ${activeItems.length}`;

  applyFallback(lbImg, getLocalSrc(item));

  const single = activeItems.length <= 1;
  document.getElementById("lbPrev").style.display = single ? "none" : "";
  document.getElementById("lbNext").style.display = single ? "none" : "";
}

function lbPrev() {
  currentLbIndex = (currentLbIndex - 1 + activeItems.length) % activeItems.length;
  renderLightbox();
}
function lbNext() {
  currentLbIndex = (currentLbIndex + 1) % activeItems.length;
  renderLightbox();
}

document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbBackdrop").addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", e => { e.stopPropagation(); lbPrev(); });
document.getElementById("lbNext").addEventListener("click", e => { e.stopPropagation(); lbNext(); });

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") lbPrev();
  if (e.key === "ArrowRight") lbNext();
});

/* swipe */
let swipeX = 0;
lightbox.addEventListener("touchstart", e => { swipeX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", e => {
  const d = e.changedTouches[0].clientX - swipeX;
  if (Math.abs(d) > 45) d < 0 ? lbNext() : lbPrev();
});

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => buildSections(), 200);
});

let revealObserver;
function observeReveal(el) {
  if (prefersReducedMotion) {
    el.classList.add("in");
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
  }
  revealObserver.observe(el);
}

let heroTicking = false;
function updateHeroParallax() {
  if (prefersReducedMotion) return;
  if (!heroCollage) return;
  const y = Math.max(0, window.scrollY);
  const offset = Math.min(60, y * 0.15);
  heroCollage.style.transform = `translateY(${offset}px)`;
  heroTicking = false;
}
window.addEventListener("scroll", () => {
  if (prefersReducedMotion) return;
  if (heroTicking) return;
  heroTicking = true;
  requestAnimationFrame(updateHeroParallax);
});

buildSections();

document.querySelectorAll("img[data-fallback]").forEach(img => {
  applyFallback(img, img.dataset.fallback);
});