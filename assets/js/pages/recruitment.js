document.addEventListener("DOMContentLoaded", () => {

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  const recruitmentConfig = {
    isOpen: true, //
    formURL: "https://forms.gle/hrbQxbTiwtwteNa18",
    openDate: "2026-07-01",
    closeDate: "2026-07-20"
  };

  const statusBadge = document.getElementById("rc-status-badge");
  const statusText = statusBadge.querySelector(".rc-status-text");
  const applyBtn = document.getElementById("rc-apply-btn");

  function updateRecruitmentStatus() {
    const today = new Date();
    const openDate = new Date(recruitmentConfig.openDate);
    const closeDate = new Date(recruitmentConfig.closeDate);

    let isCurrentlyOpen = recruitmentConfig.isOpen;

    if (today >= openDate && today <= closeDate) {
      isCurrentlyOpen = true;
    }

    if (isCurrentlyOpen) {
      statusBadge.classList.remove("rc-status--closed");
      statusBadge.classList.add("rc-status--open");
      statusText.textContent = "Recruitment Open";

      applyBtn.disabled = false;
      applyBtn.textContent = "Apply Now (Use your RVCE mail ID)";
      applyBtn.addEventListener("click", () => {
        window.open(recruitmentConfig.formURL, "_blank");
      });

    } else {
      statusBadge.classList.remove("rc-status--open");
      statusBadge.classList.add("rc-status--closed");
      statusText.textContent = "Recruitment Closed";

      applyBtn.disabled = true;
      applyBtn.textContent = "Applications Closed";
    }
  }

  updateRecruitmentStatus();

  const heroBg = document.querySelector(".rc-hero-bg");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    heroBg.style.transform = `scale(1.04) translateY(${scrollY * 0.03}px)`;
  });

  const statNumbers = document.querySelectorAll(".rhs-num");

  function animateValue(el, start, end, duration) {
    let startTime = null;

    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      el.innerHTML = value + el.innerHTML.replace(/[0-9]/g, '');
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.textContent.replace(/\D/g, '');
        const target = parseInt(raw);

        el.textContent = "0";
        animateValue(el, 0, target, 1200);

        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.6 });

  statNumbers.forEach(stat => statsObserver.observe(stat));

});