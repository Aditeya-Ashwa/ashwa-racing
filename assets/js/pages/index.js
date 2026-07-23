"use strict";

// ─── Sponsor data ─────────────────────────────────────────────
const sponsorData = [
    { logo: "assets/images/sponsors/rvce.svg",      url: "https://rvce.edu.in",      name: "RV College of Engineering"},
    { logo: "assets/images/sponsors/infineon.svg",      url: "https://www.infineon.com",      name: "Infineon Technologies"},
    { logo: "assets/images/sponsors/bosch.svg",      url: "https://www.bosch.in/",      name: "Bosch"},
    { logo: "assets/images/sponsors/adani.svg",            url: "https://www.adani.com/",      name: "Adani Group"},
    { logo: "assets/images/sponsors/dynamatics.svg",      url: "https://dynamatics.com/",      name: "Dynamatic Technologies"},
    { logo: "assets/images/sponsors/skf.svg",                url: "https://www.skf.com/in",                       name: "SKF" },
    { logo: "assets/images/sponsors/analogdevices.svg",      url: "https://www.analog.com/en/index.html",         name: "Analog Devices" },
    { logo: "assets/images/sponsors/vrl.svg",                url: "https://vrlgroup.in/vrl_group_home.aspx",      name: "VRL Logistics" },
    { logo: "assets/images/sponsors/pegasyssystemspvtltd.svg", url: "https://pegasyssystems.com/",               name: "Pegasys Systems" },
    { logo: "assets/images/sponsors/motul.svg",              url: "https://www.motul.com/en-IN",                  name: "Motul" },
    { logo: "assets/images/sponsors/lapp.svg",               url: "https://www.lapp.com/en_US/us/",               name: "LAPP" },
    { logo: "assets/images/sponsors/henkel.svg",             url: "https://www.henkel.in/",                       name: "Henkel" },
    { logo: "assets/images/sponsors/sansera.png",            url: "https://sansera.in/",                          name: "Sansera Engineering" },
    { logo: "assets/images/sponsors/delhivery.svg",  url: "https://www.delhivery.com",  name: "Delhivery" },
    { logo: "assets/images/sponsors/aruanigrid.svg", url: "https://aruanigrid.com/",    name: "Aruani Grid" },
    { logo: "assets/images/sponsors/fastolex.svg",    url: "https://www.tatanexarc.com/company/fastolex-products-utn3938fas42bno/", name: "Fastolex" },
    { logo: "assets/images/sponsors/speedworks.svg",  url: "https://www.speedworks.cc/",                                           name: "Speedworks" },
    { logo: "https://assets.ashwaracing.org/images/sponsors/progressive-engineers.png", url: "https://www.progressiveengineers.co.in/", name: "Progressive Engineers" },
    { logo: "assets/images/sponsors/uniflex.svg",         url: "https://myuniflex.com/",          name: "Uniflex" },
    { logo: "assets/images/sponsors/mercedes.svg",        url: "https://www.akshayamotors.mercedes-benz.co.in/passengercars/about-us.html", name: "Mercedes-Benz" },
    { logo: "assets/images/sponsors/barrelexhaust.webp",  url: "https://www.barrelexhaust.com/",  name: "Barrel Exhaust" },
    { logo: "assets/images/sponsors/royalbrothers.svg",   url: "https://www.royalbrothers.com/bangalore/bike-rentals", name: "Royal Brothers" },
    { logo: "assets/images/sponsors/bender.svg",          url: "https://www.bender-in.com/",      name: "Bender" },
    { logo: "assets/images/sponsors/bmcairfilter.svg",    url: "https://www.bmcairfilters.com/en", name: "BMC Air Filter" },
    { logo: "assets/images/sponsors/dmgmori.svg",         url: "https://in.dmgmori.com/",         name: "DMG Mori" },
    { logo: "assets/images/sponsors/elcoats.svg",         url: "https://elcoats.com/",            name: "Elcoats" },
    { logo: "assets/images/sponsors/ansys.svg",           url: "https://www.ansys.com/en-in",     name: "Ansys" },
    { logo: "assets/images/sponsors/icp.jpg",             url: "http://www.icp-india.com/",       name: "ICP India" },
    { logo: "assets/images/sponsors/impulsepower.jpg",    url: "https://impulse-power.com/",      name: "Impulse Power" },
    { logo: "assets/images/sponsors/joesgarage.png",      url: "https://www.instagram.com/joesgarageindia/?hl=en", name: "Joe's Garage" },
    { logo: "assets/images/sponsors/lioncircuits.svg",    url: "https://www.lioncircuits.com/",   name: "Lion Circuits" },
    { logo: "assets/images/sponsors/motousher.svg",       url: "https://www.motousher.com/",      name: "Motousher" },
    { logo: "assets/images/sponsors/magodlaser.png",     url: "https://www.magodlaser.in/",      name: "Magod Laser" },
    { logo: "assets/images/sponsors/pankaj.png",          url: "https://pankaj.com/",             name: "Pankaj" },
    { logo: "assets/images/sponsors/pcbway.svg",          url: "https://www.pcbway.com/",         name: "PCBWay" },
    { logo: "assets/images/sponsors/powerhaus.jpg",       url: "https://www.powerhaus.in/MainPageFiles/index.htm", name: "Powerhaus" },
    { logo: "assets/images/sponsors/pcbpower.webp",       url: "https://www.pcbpower.com",        name: "PCB Power" },
    { logo: "assets/images/sponsors/pcprocess.png",       url: "https://www.pcprocess.in/",       name: "PC Process" },
    { logo: "assets/images/sponsors/triumphlaser.avif",   url: "https://www.justdial.com/Bangalore/Triumph-Laser-Peenya-2nd-Stage/080PXX80-XX80-180307235407-G2Q7_BZDET", name: "Triumph Laser" },
    { logo: "assets/images/sponsors/solidworks.svg",      url: "https://www.solidworks.com/",     name: "SolidWorks" },
    { logo: "assets/images/sponsors/sve.png",             url: "#",                               name: "SVE" },
    { logo: "assets/images/sponsors/team88india.svg",     url: "https://www.instagram.com/team88india/?hl=en", name: "Team 88 India" },
    { logo: "assets/images/sponsors/nd.png",              url: "#",                               name: "ND" },
    { logo: "assets/images/sponsors/btpl.png",            url: "#",                               name: "BTPL" },
];

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function renderSponsorStrip() {
  const track = document.getElementById('sponsor-track');
  if (!track) return;

  const allSponsors = sponsorData;

  const cardsHtml = allSponsors.map(s => {
    const logo = `
                  <img
                      src="${escapeAttr(s.logo)}"
                      alt="${escapeAttr(s.name)}"
                      loading="eager"
                      fetchpriority="high"
                      decoding="async"
                      width="360"
                      height="360">
                  `;
    return `<a href="${escapeAttr(s.url)}" target="_blank" rel="noopener" class="sp-card">${logo}</a>`;
  }).join('');

  // duplicated once so translateX(-50%) loops seamlessly
  track.innerHTML = cardsHtml + cardsHtml;
}

function preloadSponsorImages() {
    return Promise.all(
        sponsorData.map(s => new Promise(resolve => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = s.logo;
        }))
    );
}

document.addEventListener("DOMContentLoaded", async () => {
    await preloadSponsorImages();

    renderSponsorStrip();
    initReveal();
    initNewsletterPreview();
    initStatCounters();
});

/* ── Scroll reveal ────────────────────────────────────────── */
function initReveal() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const els = document.querySelectorAll(
    ".bento-card, .sponsors-grid img, .news-card, .insta-tile"
  );
  if (!els.length) return;

  els.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(i * 0.04, 0.3)}s`;
  });

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("reveal-visible");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px" });

  els.forEach(el => io.observe(el));
}

/* ── Newsletter preview (unchanged) ── */
function initNewsletterPreview() {
  const card  = document.getElementById("blog-card");
  const thumb = document.getElementById("blog-thumb");
  if (!card || !thumb) return;

  const latest = {
    title:   "June 2026 — General Newsletter",
    cover:   "https://assets.ashwaracing.org/cdn-cgi/image/width=600,format=avif,quality=80/images/newsletters/2026/2026-06.png",
    pdf:     "https://assets.ashwaracing.org/pdfs/newsletters/2026/2026-06-general.pdf",
    date:    "June 2026",
    excerpt: "RZ-XX7C electrical redesign consolidation; RZ-XX8E simulation work sets FDR and energy targets for the EV prototype; plus May expenses, sponsor roster, and team directory."
  };

  thumb.src = latest.cover;
  document.getElementById("blog-title").textContent   = latest.title;
  document.getElementById("blog-excerpt").textContent = latest.excerpt;
  document.getElementById("blog-date").textContent    = latest.date;
  card.href = latest.pdf;
}

/* ── Stat bar count-up (unchanged) ── */
function initStatCounters() {
  const nums = document.querySelectorAll(".stat-num[data-count]");
  if (!nums.length) return;

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";

    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animate(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  nums.forEach(el => io.observe(el));
}