/* ============================================================
   ASHWA RACING — GALLERY JS
   
   TO ADD A PHOTO:
   1. Drop .webp into assets/images/gallery/
   2. Add one entry to galleryData below
   3. Push. Done.
============================================================ */

const galleryData = [
  {
    title: "RZ-XX6C",
    image: "XX6C",
    desc: "P6 overall at Formula Bharat 2026. Top 5 Engineering Design, 2nd Business Plan Presentation.",
    category: "car"
  },
  {
    title: "RZ-XX5C in Action",
    image: "XX5C",
    desc: "First prototype post-2021 to clear TI and run endurance. P2 Cost and Manufacturing at FB2025.",
    category: "car"
  },
  {
    title: "P2 Cost Presentation",
    image: "Costwin",
    desc: "2nd place Cost and Manufacturing at Formula Bharat 2025.",
    category: "competition"
  },
  {
    title: "Hyperloop — Zürich 2024",
    image: "Hyperloop",
    desc: "Ashwa Mobility Foundation's first hyperloop prototype at European Hyperloop Week 2024.",
    category: "team"
  }
  /* Add more entries here ↓
  {
    title: "",
    image: "",        // filename without .webp
    desc:  "",
    category: ""      // car | competition | workshop | team
  },
  */
];

/* ============================================================
   SETUP
============================================================ */
const NUM_COLS     = 4;
const GAP          = 5; // must match --gap in CSS (px)
const STAGGER_MS   = 55;

let currentFilter  = "all";
let currentLbIndex = 0;       // index into activeItems
let activeItems    = [];      // filtered subset of galleryData indices

const section      = document.querySelector(".gallery-section");
const filterBtns   = document.querySelectorAll(".filter-btn");
const lightbox     = document.getElementById("lightbox");
const lbImg        = document.getElementById("lbImg");
const lbTitle      = document.getElementById("lbTitle");
const lbDesc       = document.getElementById("lbDesc");
const lbCounter    = document.getElementById("lbCounter");

/* ============================================================
   FILTER COUNTS
============================================================ */
function updateCounts() {
  filterBtns.forEach(btn => {
    const f     = btn.dataset.filter;
    const count = f === "all"
      ? galleryData.length
      : galleryData.filter(d => d.category === f).length;
    const badge = btn.querySelector(".filter-count");
    if (badge) badge.textContent = count;
  });
}

/* ============================================================
   BUILD MASONRY
   Distribute items across columns by shortest column height.
   Images are loaded before measuring — no layout thrash.
============================================================ */
function getColCount() {
  const w = window.innerWidth;
  if (w <= 420)  return 1;
  if (w <= 680)  return 2;
  if (w <= 1024) return 3;
  return NUM_COLS;
}

function buildMasonry(indices) {
  /* clear */
  section.innerHTML = "";

  if (indices.length === 0) {
    const empty = document.createElement("p");
    empty.className = "gallery-empty show";
    empty.textContent = "No photos in this category yet.";
    section.appendChild(empty);
    return;
  }

  const cols    = getColCount();
  const heights = new Array(cols).fill(0);
  const colEls  = [];

  /* create grid + columns */
  const grid = document.createElement("div");
  grid.className = "masonry-grid";

  for (let c = 0; c < cols; c++) {
    const col = document.createElement("div");
    col.className = "masonry-col";
    grid.appendChild(col);
    colEls.push(col);
  }
  section.appendChild(grid);

  /* load all images first, then place them shortest-column-first */
  const promises = indices.map((dataIdx, posInFiltered) => {
    return new Promise(resolve => {
      const item = galleryData[dataIdx];
      const img  = new Image();

      img.onload = img.onerror = () => {
        resolve({
          dataIdx,
          posInFiltered,
          naturalHeight: img.naturalHeight || 200,
          naturalWidth:  img.naturalWidth  || 300,
          src:           img.src
        });
      };

      img.src = `assets/images/gallery/${item.image}.webp`;
    });
  });

  Promise.all(promises).then(results => {
    results.forEach(({ dataIdx, posInFiltered, naturalHeight, naturalWidth }) => {
      const item = galleryData[dataIdx];

      /* which column is shortest right now? */
      const colIdx      = heights.indexOf(Math.min(...heights));
      const colWidth    = colEls[colIdx].getBoundingClientRect().width || 300;
      const aspectRatio = naturalHeight / naturalWidth;
      const renderedH   = colWidth * aspectRatio;

      heights[colIdx]  += renderedH + GAP;

      /* build DOM node */
      const div = document.createElement("div");
      div.className      = "gallery-item";
      div.dataset.idx    = dataIdx;

      div.innerHTML = `
        <img
          src="assets/images/gallery/${item.image}.webp"
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

      div.addEventListener("click", () => openLightbox(posInFiltered));
      colEls[colIdx].appendChild(div);

      /* staggered reveal */
      const delay = posInFiltered * STAGGER_MS;
      setTimeout(() => div.classList.add("in"), delay + 20);
    });
  });
}

function applyFilter(filter) {
  currentFilter = filter;

  filterBtns.forEach(b => b.classList.toggle("active", b.dataset.filter === filter));

  activeItems = galleryData
    .map((_, i) => i)
    .filter(i => filter === "all" || galleryData[i].category === filter);

  buildMasonry(activeItems);
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
});

function openLightbox(filteredPos) {
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
  const item    = galleryData[dataIdx];
  lbImg.src          = `assets/images/gallery/${item.image}.webp`;
  lbImg.alt          = item.title;
  lbTitle.textContent = item.title;
  lbDesc.textContent  = item.desc;
  lbCounter.textContent = `${currentLbIndex + 1} / ${activeItems.length}`;

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
  if (e.key === "Escape")     closeLightbox();
  if (e.key === "ArrowLeft")  lbPrev();
  if (e.key === "ArrowRight") lbNext();
});

/* swipe */
let swipeX = 0;
lightbox.addEventListener("touchstart", e => { swipeX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend",   e => {
  const d = e.changedTouches[0].clientX - swipeX;
  if (Math.abs(d) > 45) d < 0 ? lbNext() : lbPrev();
});

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => applyFilter(currentFilter), 200);
});

updateCounts();
applyFilter("all");