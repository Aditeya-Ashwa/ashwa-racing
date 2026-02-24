"use strict";

// ─── State ───────────────────────────────────────────────────
let activeYear = "2027";
let activeSubsystem = "All";

// ─── Data ────────────────────────────────────────────────────
const teamData = [
  {
    name: "Aditeya Sarkar",
    roles: ["Member"],
    subsystem: ["Electrical & Testing", "IT"],
    year: "2027",
    experience: "Designed the BSPD. Worked on firmware for DAQ. Responsible for website design alongside IT 28. Part of 2nd Place BPP team at Formula Bharat 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/aditeya-sarkar/",
      github: "https://github.com/GigglePaste"
    }
  },
  {
    name: "N Akshay Urs",
    roles: ["Project Manager", "Subsystem Lead"],
    subsystem: ["Leads", "Electrical & Testing"],
    year: "2027",
    experience: "Designed Rear & Side IO. Worked on firmware for DAQ. Made the harness for RZ-XX6C. One of the drivers for the RZ-XX6C. Responsible for top 5 finish under EDP at Formula Bharat 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/n-akshayurs/",
      github: null
    }
  },
  {
    name: "Anshul Joshi",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2027",
    experience: "Delivered exceptional suspension work within a tight timeline, ensuring RZ-XX6C stood on her own four wheels. Contributed to P6 finish at FB 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/an-joshi/",
      github: null
    }
  },
  {
    name: "Aashrith Rao",
    roles: ["Member"],
    subsystem: ["Electrical & Testing", "Finance"],
    year: "2027",
    experience: "Designed the APPS. Responsible for top 20 finish under CDP at FB 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/aashrith-rao-893010326/",
      github: null
    }
  },
  {
    name: "Samith Belegadde Sirish",
    roles: ["Subsystem Lead"],
    subsystem: ["Sponsorship & Marketing"],
    year: "2027",
    experience: "Secured 45+ sponsors for the 2026–27 race season. Part of 2nd Place BPP team at Formula Bharat 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/samith-belegadde-sirish-162bb425b/",
      github: null
    }
  },
  {
    name: "Sathvik S Naik",
    roles: ["Subsystem Lead", "Chief Engineer"],
    subsystem: ["Leads", "Chassis & Workshop Management"],
    year: "2027",
    experience: "Designed the LV enclosure and chassis, and served as one of the drivers for the RZ-XX6C. Responsible for top 5 finish under EDP at Formula Bharat 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/sathvik-s-naik-b186342a8/",
      github: null
    }
  },
  {
    name: "Shravan CS",
    roles: ["Subsystem Lead", "Team Captain"],
    subsystem: ["Leads", "Brakes & Logistics"],
    year: "2027",
    experience: "Leading the team as Captain while managing the Brakes & Logistics subsystem.",
    social: {
      linkedin: null,
      github: null
    }
  },
  {
    name: "Talin Thimmaiah",
    roles: ["Subsystem Lead"],
    subsystem: ["Engine"],
    year: "2027",
    experience: "Leading engine development and performance tuning for the 2027 race season.",
    social: {
      linkedin: null,
      github: null
    }
  },
  {
    name: "Vinith Prabhu",
    roles: ["Member"],
    subsystem: ["Electrical & Testing", "Finance"],
    year: "2027",
    experience: "Contributing to electrical systems and financial operations for the 2027 season.",
    social: {
      linkedin: null,
      github: null
    }
  },
  {
    name: "Vibin",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2026",
    experience: "Designed and implemented a 600W motor controller, laid the foundations for the AWD hub motor system, and developed the VCU and CAN watchdog.",
    social: {
      linkedin: null,
      github: null
    },
    easterEgg: true
  },
];

// ─── DOM refs ─────────────────────────────────────────────────
const grid        = document.getElementById("member-profiles-grid");
const countEl     = document.getElementById("member-count");
const descBox     = document.getElementById("subsystem-desc");
const yearFilter  = document.getElementById("year-filter");
const subFilter   = document.getElementById("subsystem-filter");
const yearItems   = yearFilter.children;
const subItems    = subFilter.children;

const PROFILE_BASE = "assets/images/team/members/";

// ─── Card Builder ─────────────────────────────────────────────
function createMemberCard(member) {
  const card = document.createElement("div");
  card.classList.add("member-card");

  const imgPath = `${PROFILE_BASE}${member.year}/${member.name}.webp`;

  const linkedinLink = member.social.linkedin
    ? `<a href="${member.social.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>`
    : "";

  const githubLink = member.social.github
    ? `<a href="${member.social.github}" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>`
    : "";

  const easterEggCanvas = member.easterEgg
    ? `<div class="member-3d"><canvas></canvas></div>`
    : "";

  card.innerHTML = `
    ${easterEggCanvas}

    <div class="profile-header">
      <div class="profile-img-container">
        <img
          src="${imgPath}"
          alt="Photo of ${member.name}"
          loading="lazy"
          onerror="this.parentElement.style.background='#2a2a2a'"
        >
      </div>
      <div class="profile-info-overlay">
        <p class="member-name">${member.name}</p>
        <p class="member-role">${member.roles.join(" · ")}</p>
        <p class="member-subsystem">${member.subsystem.join(" · ")}</p>
      </div>
    </div>

    <div class="member-experience">
      <div class="exp-label">Contribution</div>
      <p>${member.experience}</p>
    </div>

    <div class="member-social">
      ${linkedinLink}
      ${githubLink}
    </div>
  `;

  return card;
}

// ─── Render ───────────────────────────────────────────────────
function renderMembers(year, subsystem) {
  grid.style.opacity = "0";

  setTimeout(() => {
    grid.innerHTML = "";

    const results = teamData.filter(m =>
      m.year === year &&
      (subsystem === "All" || m.subsystem.includes(subsystem))
    );

    // Update count
    if (countEl) {
      countEl.textContent = results.length
        ? `${results.length} member${results.length !== 1 ? "s" : ""}`
        : "—";
    }

    if (results.length === 0) {
      grid.innerHTML = `
        <div class="no-members">
          <i class="fas fa-users-slash"></i>
          <p>No members found for this filter.</p>
        </div>`;
    } else {
      results.forEach((member, i) => {
        const card = createMemberCard(member);
        card.style.animationDelay = `${i * 0.06}s`;

        if (member.easterEgg) {
          card.classList.add("easter-egg");
          initCard3D(card);
        }

        grid.appendChild(card);
      });
    }

    grid.style.opacity = "1";
  }, 150);
}

// ─── 3D Easter Egg ────────────────────────────────────────────
function initCard3D(card) {
  const canvas = card.querySelector(".member-3d canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.z = 2.5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

  function resize() {
    const r = card.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
  }

  resize();

  scene.add(new THREE.HemisphereLight(0xffffff, 0x222222, 1.2));

  const loader = new THREE.TextureLoader();
  const tex = loader.load(
    "assets/images/team/members/2026/easteregg.png",
    () => renderer.render(scene, camera)
  );

  if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

  const mat = new THREE.MeshStandardMaterial({ map: tex });
  const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), [mat, mat, mat, mat, mat, mat]);
  scene.add(cube);

  let running = false;

  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    cube.rotation.x += 0.005;
    renderer.render(scene, camera);
  }

  card.addEventListener("mouseenter", () => { resize(); running = true; animate(); });
  card.addEventListener("mouseleave", () => { running = false; });
}

// ─── Filter Scroll Helper ─────────────────────────────────────
function scrollStep(direction, wrapper, items) {
  let activeIdx = -1;

  for (let i = 0; i < items.length; i++) {
    if (items[i].querySelector?.(".filter-btn.active")) {
      activeIdx = i;
      break;
    }
  }

  if (activeIdx === -1) activeIdx = 1;

  let target = activeIdx + direction;
  const last = items.length - 1;
  if (target <= 0)    target = 1;
  if (target >= last) target = last - 1;

  const el = items[target];
  const x = el.offsetLeft - wrapper.clientWidth / 2 + el.clientWidth / 2;
  wrapper.scroll({ left: x, behavior: "smooth" });
  el.querySelector(".filter-btn")?.click();
}

// ─── Arrow Buttons ────────────────────────────────────────────
document.getElementById("year-left").onclick  = () => scrollStep(-1, yearFilter, yearItems);
document.getElementById("year-right").onclick = () => scrollStep(1,  yearFilter, yearItems);
document.getElementById("subsystem-left").onclick  = () => scrollStep(-1, subFilter, subItems);
document.getElementById("subsystem-right").onclick = () => scrollStep(1,  subFilter, subItems);

// ─── Wheel Scroll ─────────────────────────────────────────────
yearFilter.addEventListener("wheel", e => { e.preventDefault(); scrollStep(e.deltaY > 0 ? 1 : -1, yearFilter, yearItems); });
subFilter.addEventListener("wheel",  e => { e.preventDefault(); scrollStep(e.deltaY > 0 ? 1 : -1, subFilter,  subItems);  });

// ─── Filter Click Activation ──────────────────────────────────
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const item    = btn.closest(".year-item");
    const wrapper = item.parentElement;
    const isYear  = wrapper.id === "year-filter";
    const type    = isYear ? "year" : "subsystem";
    const val     = item.dataset[type];

    // Update subsystem description
    if (!isYear && descBox) {
      const desc = item.dataset.desc || "Members of Ashwa Racing.";
      descBox.style.opacity = "0";
      setTimeout(() => {
        descBox.textContent = desc;
        descBox.style.opacity = "1";
      }, 150);
    }

    // Deactivate siblings
    wrapper.querySelectorAll(".filter-btn").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");

    if (isYear) {
      activeYear = val;
    } else {
      activeSubsystem = val;
    }

    renderMembers(activeYear, activeSubsystem);
  });
});

// ─── Back to Top ──────────────────────────────────────────────
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 400 ? "flex" : "none";
});

backToTopBtn.addEventListener("click", () => {
  const anchor = document.getElementById("filters-start");
  (anchor || document.documentElement).scrollIntoView({ behavior: "smooth" });
});

// ─── Init ─────────────────────────────────────────────────────
window.addEventListener("load", () => {
  renderMembers(activeYear, activeSubsystem);

  // Set first filter active and center scroll
  const firstYearBtn = yearItems[1]?.querySelector(".filter-btn");
  firstYearBtn?.classList.add("active");

  setTimeout(() => {
    const iy = yearItems[1];
    if (iy) yearFilter.scrollLeft = iy.offsetLeft - yearFilter.clientWidth / 2 + iy.clientWidth / 2;

    const is = subItems[1];
    if (is) subFilter.scrollLeft = is.offsetLeft - subFilter.clientWidth / 2 + is.clientWidth / 2;
  }, 100);
});