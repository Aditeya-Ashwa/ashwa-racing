"use strict";

/*
  Path prefix for fetching shared components and assets.
  All pages are assumed to live at the repo root (same depth as /components/).
  If a page is nested deeper, update this value for that page.
*/
const prefix = "../../";

fetch(prefix + "components/header.html")
  .then(r => r.text())
  .then(html => {
    document.getElementById("main-header").innerHTML = html;
    initNav();
    initSponsorMarquee();
    initScrollShrink();
    markActivePage();
  })
  .catch(err => console.warn("Header load failed:", err));

fetch(prefix + "components/footer.html")
  .then(r => r.text())
  .then(html => { document.getElementById("main-footer").innerHTML = html; })
  .catch(err => console.warn("Footer load failed:", err));


function initNav() {

  /* ── Hamburger toggle ──────────────────────────────────────── */
  const hamburger  = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen);
      mobileMenu.classList.toggle("open", isOpen);
      mobileMenu.setAttribute("aria-hidden", !isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    document.addEventListener("click", e => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeMenu();
    });
  }

  function closeMenu() {
    if (!hamburger) return;
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu?.classList.remove("open");
    mobileMenu?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ── Desktop dropdown ──────────────────────────────────────── */
  /*
    FIX: CSS :hover was removed from header.css to prevent the open/close
    conflict on touch laptops. Desktop hover is now handled here via
    mouseenter/mouseleave so the behaviour is identical but we have full
    control. Click still works as a fallback for keyboard/touch users.
  */
  function initDropdown(id) {
    const dd  = document.getElementById(id);
    const btn = dd?.querySelector(".nav-drop-btn");
    if (!dd || !btn) return;

    // Open on hover (desktop pointer devices)
    dd.addEventListener("mouseenter", () => {
      dd.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    });
    dd.addEventListener("mouseleave", () => {
      dd.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });

    // Click toggle as fallback (keyboard, touch)
    btn.addEventListener("click", e => {
      e.stopPropagation();
      document.querySelectorAll(".nav-dropdown.open").forEach(other => {
        if (other !== dd) {
          other.classList.remove("open");
          other.querySelector(".nav-drop-btn")?.setAttribute("aria-expanded", "false");
        }
      });
      const isOpen = dd.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen);
    });

    document.addEventListener("click", e => {
      if (!dd.contains(e.target)) {
        dd.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    dd.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        dd.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  initDropdown("teamDropdown");
  initDropdown("subsystemsDropdown");

  /* ── Mobile accordion ──────────────────────────────────────── */
  function initAccordion(btnId, panelId) {
    const btn   = document.getElementById(btnId);
    const panel = document.getElementById(panelId);
    if (!btn || !panel) return;
    btn.addEventListener("click", () => {
      const isOpen = btn.classList.toggle("open");
      panel.classList.toggle("open", isOpen);
      btn.setAttribute("aria-expanded", isOpen);
    });
  }

  initAccordion("mobTeamBtn", "mobTeamPanel");
  initAccordion("mobSubBtn",  "mobSubPanel");
}


function markActivePage() {
  const path = window.location.pathname;
  // FIX: pop() returns "" on directory roots (e.g. GitHub Pages /ashwa-racing/)
  // Fall back to "index.html" so the Home nav link gets marked active correctly
  const page = path.split("/").filter(Boolean).pop() || "index.html";

  document.querySelectorAll(".nav-link[href], .mob-link[href]").forEach(link => {
    const href = link.getAttribute("href");
    if (href && (href === page || href.endsWith("/" + page))) {
      link.classList.add("active");
    }
  });
}


async function initSponsorMarquee() {
  const track = document.getElementById("sponsor-track");
  // FIX: removed redundant sponsorInit module-level flag — dataset guard is enough
  if (!track || track.dataset.initialized) return;
  track.dataset.initialized = "true";

  const SPONSOR_PATH = prefix + "assets/images/sponsors/";

  let manifest;
  try {
    manifest = await fetch(SPONSOR_PATH + "manifest.json").then(r => r.json());
  } catch {
    console.warn("Sponsor manifest not found.");
    return;
  }

  const sponsors = manifest.sponsors ?? [];
  if (!sponsors.length) return;

  function buildSet() {
    const frag = document.createDocumentFragment();
    sponsors.forEach(name => {
      const img = document.createElement("img");
      img.src       = SPONSOR_PATH + name;
      img.alt       = name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      img.className = "sponsor-logo";

      const ext = name.split(".").pop().toLowerCase();
      if      (ext === "svg")                   img.classList.add("logo-svg");
      else if (ext === "png")                   img.classList.add("logo-png");
      else if (ext === "jpg" || ext === "jpeg") img.classList.add("logo-jpg");
      else if (ext === "webp" || ext === "avif") img.classList.add("logo-modern");

      // FIX: sponsor strip is in the sticky header — always in the viewport.
      // lazy loading caused a pop-in flash; eager ensures logos are ready immediately.
      img.loading = "eager";
      frag.appendChild(img);
    });
    return frag;
  }

  track.appendChild(buildSet());
  track.appendChild(buildSet()); // duplicate for seamless loop

  const imgs = [...track.querySelectorAll("img")];
  await Promise.all(
    imgs.map(img =>
      img.decode ? img.decode().catch(() => {}) :
      new Promise(res => img.complete ? res() : (img.onload = res))
    )
  );

  let pos = 0;
  const SPEED = 1.2;
  let raf = null;
  let running = false;

  function animate() {
    pos -= SPEED;
    const halfWidth = track.scrollWidth / 2;
    if (Math.abs(pos) >= halfWidth) pos = 0;
    track.style.transform = `translate3d(${pos}px, 0, 0)`;
    if (running) raf = requestAnimationFrame(animate);
  }

  function start() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(animate);
  }

  function stop() {
    running = false;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
  }

  // FIX: pause the rAF loop when the sponsor strip scrolls out of view
  // on long pages — avoids burning CPU/GPU for off-screen animation
  const strip = track.closest(".sponsor-strip");
  if (strip) {
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting ? start() : stop(),
      { threshold: 0 }
    );
    io.observe(strip);

    strip.addEventListener("mouseenter", stop);
    strip.addEventListener("mouseleave", () => { if (running || document.visibilityState === "visible") start(); });
  } else {
    start();
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    stop();
    track.style.transform = "none";
  }
}


function initScrollShrink() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const threshold = 60;
  // FIX: dirty-check avoids redundant classList mutations on every scroll tick
  let wasScrolled = false;

  function onScroll() {
    const isScrolled = window.scrollY > threshold;
    if (isScrolled === wasScrolled) return;
    wasScrolled = isScrolled;
    navbar.classList.toggle("scrolled", isScrolled);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load to set initial state
}