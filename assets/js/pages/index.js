"use strict";

/* ── Init ───────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initNewsletterPreview();
});


/* ── Scroll Reveal ───────────────── */
function initReveal() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const els = document.querySelectorAll(
    ".stat, .split-body, .cta-card, .sponsors-grid img, .feed-card"
  );

  if (!els.length) return;

  els.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(i * 0.04, 0.3)}s`;
  });

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("reveal-visible");
      obs.unobserve(e.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px"
  });

  els.forEach(el => io.observe(el));
}

function initNewsletterPreview() {
  const card = document.getElementById("blog-card");
  if (!card) return;

  const basePDF = "assets/pdfs/newsletters/";
  const baseIMG = "assets/images/newsletters/";

const files = [
  "2017-11-general.pdf",
  "2017-09-alumni.pdf",
  "2017-09-general.pdf",
  "2017-08-alumni.pdf",
  "2017-08-general.pdf",
  "2017-07-alumni.pdf",
  "2017-07-general.pdf",
  "2017-06-general.pdf",
  "2017-05-general.pdf",
  "2017-04-alumni.pdf",
  "2017-04-combustion.pdf",
  "2017-04-hybrid.pdf",
  "2017-02-alumni.pdf",
  "2017-02-combustion.pdf",
  "2017-02-hybrid.pdf",
  "2016-12-combustion.pdf",
  "2016-12-hybrid.pdf",
  "2016-11-alumni.pdf",
  "2016-11-combustion.pdf",
  "2016-11-hybrid.pdf",
  "2016-10-alumni.pdf",
  "2016-10-combustion.pdf",
  "2016-10-hybrid.pdf",
  "2016-09-alumni.pdf",
  "2016-09-combustion.pdf",
  "2016-09-hybrid.pdf",
  "2016-07-alumni.pdf",
  "2016-04-alumni.pdf",
  "2015-12-alumni.pdf",
  "2015-12-combustion.pdf",
  "2015-12-hybrid.pdf",
  "2015-11-alumni.pdf",
  "2015-11-combustion.pdf",
  "2015-11-hybrid.pdf",
  "2015-09-alumni.pdf",
  "2015-09-combustion.pdf",
  "2015-09-hybrid.pdf",
  "2015-04-hybrid.pdf",
  "2015-03-hybrid.pdf",
  "2015-02-hybrid.pdf",
  "2015-01-hybrid.pdf",
];

  function getMonthName(m) {
    const months = [
      "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[parseInt(m)];
  }

  const newsletters = files.map(file => {
    const [year, month, typeWithExt] = file.split("-");
    const type = typeWithExt.replace(".pdf", "");

    return {
      year,
      month,
      type,
      title: `${getMonthName(month)} ${year}`,
      cover: `${baseIMG}${year}/${year}-${month}.png`,
      pdf: `${basePDF}${year}/${file}`
    };
  });

  // latest newsletter (single file)
  newsletters.sort((a, b) => {
    return `${b.year}${b.month}` - `${a.year}${a.month}`;
  });

  const latest = newsletters[0];

  const thumb = document.getElementById("blog-thumb");
  const title = document.getElementById("blog-title");
  const excerpt = document.getElementById("blog-excerpt");
  const date = document.getElementById("blog-date");

  if (thumb) {
    thumb.src = latest.cover;
    thumb.alt = latest.title;
  }

  if (title) {
    title.textContent = `${latest.title} — ${latest.type.toUpperCase()}`;
  }

  if (excerpt) {
    excerpt.textContent = "Latest newsletter from Ashwa Racing.";
  }

  if (date) {
    date.textContent = `${getMonthName(latest.month)} ${latest.year}`;
  }

  card.href = latest.pdf;
}