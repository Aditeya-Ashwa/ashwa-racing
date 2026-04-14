"use strict";

const prefix = "/";

async function loadComponent(id, path, callback) {
  try {
    const html = await fetch(prefix + path).then(r => r.text());
    document.getElementById(id).innerHTML = html;
    callback?.();
  } catch (err) {
    console.warn(`${id} load failed:`, err);
  }
}

loadComponent("main-header", "components/header.html", () => {
  initNav();
  initScrollShrink();
});

loadComponent("main-footer", "components/footer.html");

function initNav() {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  const hamburger = $("#hamburger");
  const mobileMenu = $("#mobile-menu");

  /* ── Mobile Menu Toggle */
  const toggleMenu = (open) => {
    hamburger.classList.toggle("open", open);
    mobileMenu.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
    mobileMenu.setAttribute("aria-hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  hamburger?.addEventListener("click", () => {
    toggleMenu(!hamburger.classList.contains("open"));
  });

  document.addEventListener("click", e => {
    if (!hamburger?.contains(e.target) && !mobileMenu?.contains(e.target)) {
      toggleMenu(false);
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") toggleMenu(false);
  });

  $$(".nav-dropdown").forEach(dd => {
    const btn = dd.querySelector(".nav-drop-btn");
    if (!btn) return;

    const set = (state) => {
      dd.classList.toggle("open", state);
      btn.setAttribute("aria-expanded", state);
    };

    dd.addEventListener("mouseenter", () => set(true));
    dd.addEventListener("mouseleave", () => set(false));

    btn.addEventListener("click", e => {
      e.stopPropagation();
      $$(".nav-dropdown.open").forEach(d => d !== dd && d.classList.remove("open"));
      set(!dd.classList.contains("open"));
    });

    document.addEventListener("click", e => {
      if (!dd.contains(e.target)) set(false);
    });
  });

  /* ── Mobile Accordion */
  $$(".mob-accordion-btn").forEach(btn => {
    const panel = document.getElementById(btn.id.replace("Btn", "Panel"));
    btn.addEventListener("click", () => {
      const open = btn.classList.toggle("open");
      panel?.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open);
    });
  });
}


/* ── Active Page Highlight ─────────────────────── */
function markActivePage() {
  const page = location.pathname.split("/").filter(Boolean).pop() || "index.html";

  document.querySelectorAll(".nav-link[href], .mob-link[href]").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    const cleanHref = href.replace(".html", "");
    const cleanPage = page.replace(".html", "");

    if (cleanHref === cleanPage) {
      link.classList.add("active");
    }
  });
}

function initScrollShrink() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let last = false;

  const onScroll = () => {
    const scrolled = scrollY > 60;
    if (scrolled !== last) {
      navbar.classList.toggle("scrolled", scrolled);
      last = scrolled;
    }
  };

  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}