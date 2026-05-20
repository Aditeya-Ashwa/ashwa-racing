"use strict";

document.addEventListener("DOMContentLoaded", () => {

  // ─── Recruitment config ───────────────────────────────────────
  // Edit isOpen, formURL, and date range here each season
  const recruitmentConfig = {
    isOpen:    true,
    formURL:   "https://forms.gle/hrbQxbTiwtwteNa18",
    openDate:  "2026-07-01",
    closeDate: "2026-07-20",
  };

  // ─── Status badge + apply button ─────────────────────────────
  const statusBadge = document.getElementById("rc-status-badge");
  const statusText  = statusBadge?.querySelector(".rc-status-text");
  const applyBtn    = document.getElementById("rc-apply-btn");

  function updateRecruitmentStatus() {
    if (!statusBadge || !applyBtn) return;

    const today     = new Date();
    const openDate  = new Date(recruitmentConfig.openDate);
    const closeDate = new Date(recruitmentConfig.closeDate);

    // Date range overrides manual flag
    const isOpen =
      recruitmentConfig.isOpen ||
      (today >= openDate && today <= closeDate);

    if (isOpen) {
      statusBadge.classList.remove("rc-status--closed");
      statusBadge.classList.add("rc-status--open");
      if (statusText) statusText.textContent = "Recruitment Open";

      applyBtn.disabled    = false;
      applyBtn.textContent = "Apply Now — Use RVCE Mail ID";
      applyBtn.addEventListener("click", () => {
        window.open(recruitmentConfig.formURL, "_blank", "noopener,noreferrer");
      });

    } else {
      statusBadge.classList.remove("rc-status--open");
      statusBadge.classList.add("rc-status--closed");
      if (statusText) statusText.textContent = "Recruitment Closed";

      applyBtn.disabled    = true;
      applyBtn.textContent = "Applications Closed";
    }
  }

  updateRecruitmentStatus();

  // ─── Reveal observer (scroll-triggered) ──────────────────────
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── Hero background parallax ────────────────────────────────
  const heroBg = document.querySelector(".rc-hero-bg");

  if (heroBg) {
    // Throttle with requestAnimationFrame to avoid scroll jank
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          heroBg.style.transform = `scale(1.04) translateY(${y * 0.025}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ─── Stat counter animation ───────────────────────────────────
  // Reads the data-target attribute so the DOM number stays correct
  // for crawlers/accessibility even before JS fires
  const statNumbers = document.querySelectorAll(".rhs-num[data-target]");

  function animateCounter(el, target, duration) {
    const hasSup   = el.querySelector("sup");
    const supHTML  = hasSup ? hasSup.outerHTML : "";
    let startTime  = null;

    function step(now) {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = Math.floor(eased * target);

      // Rebuild text node — keep sup element intact
      el.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = value;
      });
      if (!hasSup && el.firstChild) el.firstChild.textContent = value;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (!isNaN(target)) animateCounter(el, target, 1100);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));

});