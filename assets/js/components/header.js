"use strict";

const prefix = "../../"

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

  /* -- Hamburger toggle -- */
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

  /* -- Helper: wire up a desktop dropdown -- */
  function initDropdown(id) {
    const dd  = document.getElementById(id);
    const btn = dd?.querySelector(".nav-drop-btn");
    if (!dd || !btn) return;

    btn.addEventListener("click", e => {
      e.stopPropagation();
      // Close every other open dropdown first
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

  /* -- Helper: wire up a mobile accordion -- */
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
  const page = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link[href], .mob-link[href]").forEach(link => {
    const href = link.getAttribute("href");
    if (href && (href === page || href.endsWith("/" + page))) {
      link.classList.add("active");
    }
  });
}

let sponsorInit = false;

async function initSponsorMarquee() {
  if (sponsorInit) return;
  sponsorInit = true;

  const track = document.getElementById("sponsor-track");
  if (!track) return;
  if (track.dataset.initialized) return;
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

      const ext = name.split('.').pop().toLowerCase();
      if      (ext === "svg")                  img.classList.add("logo-svg");
      else if (ext === "png")                  img.classList.add("logo-png");
      else if (ext === "jpg" || ext === "jpeg") img.classList.add("logo-jpg");
      else if (ext === "webp" || ext === "avif") img.classList.add("logo-modern");

      img.loading = "lazy";
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
  let raf;

  function animate() {
    pos -= SPEED;
    const halfWidth = track.scrollWidth / 2;
    if (Math.abs(pos) >= halfWidth) pos = 0;
    track.style.transform = `translate3d(${pos}px, 0, 0)`;
    raf = requestAnimationFrame(animate);
  }

  animate();

  const strip = track.closest(".sponsor-strip");
  strip?.addEventListener("mouseenter", () => cancelAnimationFrame(raf));
  strip?.addEventListener("mouseleave", () => { raf = requestAnimationFrame(animate); });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cancelAnimationFrame(raf);
    track.style.transform = "none";
  }
}

function initScrollShrink() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const threshold = 60;

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > threshold);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}