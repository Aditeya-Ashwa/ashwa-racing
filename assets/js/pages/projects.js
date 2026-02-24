/* ============================================================
   ASHWA RACING — projects.js
   Programme viewer: CV / EV / HYB / HYP / DV
   Each programme has its own accent colour + identity.
   ============================================================ */

"use strict";

// ─── Programme identity config ───────────────────────────────
const PROGRAMMES = {
  cv: {
    code:    "CV",
    tag:     "Combustion Vehicle",
    accent:  "#e8001d",
    cssVar:  "--cv-accent"
  },
  ev: {
    code:    "EV",
    tag:     "Electric Vehicle",
    accent:  "#00c2a8",
    cssVar:  "--ev-accent"
  },
  hyb: {
    code:    "HYB",
    tag:     "Hybrid Vehicle",
    accent:  "#f59e0b",
    cssVar:  "--hyb-accent"
  },
  hyp: {
    code:    "HYL",
    tag:     "Hyperloop",
    accent:  "#7c3aed",
    cssVar:  "--hyp-accent"
  },
  dv: {
    code:    "DRV",
    tag:     "Driverless Vehicle",
    accent:  "#3b82f6",
    cssVar:  "--dv-accent"
  }
};

// ─── Project data ─────────────────────────────────────────────
const projectData = {
  cv: {
    title: "High-Performance Combustion Platform",
    years: {
      2024: {
        image: "assets/images/prototypes/XX5C.jpg",
        changes: [
          "Revised intake & exhaust system for peak power gains",
          "Suspension geometry refinement — improved cornering stability",
          "Weight reduction programme across structural components"
        ],
        desc: "Focused on maximising reliability and endurance performance through systematic mechanical optimisation.",
        achievements: [
          "National endurance top scores",
          "Multiple podium finishes"
        ]
      },
      2023: {
        image: "assets/images/prototypes/XX5C.jpg",
        changes: [
          "ECU remapping for improved power delivery",
          "Cooling system redesign — reduced thermal load by 18%"
        ],
        desc: "Improved thermal stability and engine efficiency, enabling longer sustained stints in endurance events.",
        achievements: [
          "Completed all dynamic events",
          "Top 10 national ranking"
        ]
      }
    }
  },

  ev: {
    title: "Next-Generation Electric Prototype",
    years: {
      2025: {
        image: "assets/images/prototypes/ev_2025.jpg",
        changes: [
          "New modular accumulator architecture",
          "In-house BMS v2 — enhanced cell balancing",
          "Optimised motor controller for peak torque response"
        ],
        desc: "Electric platform engineered for safety, efficiency, and energy density — designed to pass the most rigorous scrutineering.",
        achievements: [
          "Passed full accumulator inspection",
          "Improved energy efficiency by 12%"
        ]
      }
    }
  },

  hyb: {
    title: "Hybrid Powertrain Development",
    years: {
      2025: {
        image: "assets/images/prototypes/ev_2025.jpg",
        changes: [
          "Integrated combustion + electric drivetrain architecture",
          "Regenerative braking calibration",
          "Hybrid ECU strategy development"
        ],
        desc: "A parallel hybrid platform combining the proven combustion base with an electric assist system for combined performance and efficiency.",
        achievements: [
          "First hybrid prototype completed",
          "Demonstrated energy recovery system"
        ]
      }
    }
  },

  hyp: {
    title: "Hyperloop Pod Development",
    years: {
      2025: {
        image: "assets/images/prototypes/ev_2025.jpg",
        changes: [
          "Low-drag monocoque pod shell design",
          "Magnetic levitation concept study",
          "Embedded systems and pod telemetry"
        ],
        desc: "Ashwa's entry into the Hyperloop space — a full pod prototype developed and tested for national-level competition.",
        achievements: [
          "Passed design review stage",
          "Recognised for systems integration"
        ]
      }
    }
  },

  dv: {
    title: "Autonomous & Driverless Platform",
    years: {
      2025: {
        image: "assets/images/prototypes/ev_2025.jpg",
        changes: [
          "LiDAR + camera sensor fusion pipeline",
          "Real-time path planning algorithm",
          "Hardware-in-the-loop simulation environment"
        ],
        desc: "The driverless programme builds on Ashwa's existing vehicle platforms, layering perception, planning, and control systems for autonomous competition.",
        achievements: [
          "Completed cone detection pipeline",
          "Achieved first autonomous lap"
        ]
      }
    }
  }
};

// ─── State ───────────────────────────────────────────────────
let activeProgKey  = "cv";
let activeYear     = null;

// ─── DOM refs ─────────────────────────────────────────────────
const viewer      = document.getElementById("prog-viewer");
const progCode    = document.getElementById("prog-code");
const progTag     = document.getElementById("prog-tag");
const progTitle   = document.getElementById("prog-title");
const progYears   = document.getElementById("prog-years");
const progImage   = document.getElementById("prog-image");
const progContent = document.getElementById("prog-content");
const stripe      = document.querySelector(".proj-hero-stripe");

// ─── Render year data ─────────────────────────────────────────
function renderYear(progKey, year) {
  const data     = projectData[progKey].years[year];
  const identity = PROGRAMMES[progKey];

  // Image
  progImage.style.opacity = "0";
  progImage.src = data.image;
  progImage.alt = `${identity.tag} — ${year}`;
  progImage.onload = () => {
    progImage.style.opacity = "1";
    progImage.style.transition = "opacity 0.4s ease";
  };

  // Content block
  const changeItems = data.changes
    .map(c => `<li>${c}</li>`)
    .join("");

  const achItems = data.achievements
    .map(a => `<li>${a}</li>`)
    .join("");

  progContent.innerHTML = `
    <div>
      <div class="prog-changes-label">Updates for ${year}</div>
      <ul class="prog-changes">${changeItems}</ul>
    </div>

    <p class="prog-desc">${data.desc}</p>

    <div>
      <div class="prog-ach-label">Achievements</div>
      <ul class="prog-achievements">${achItems}</ul>
    </div>
  `;

  // Update active year button
  progYears.querySelectorAll(".year-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.year === String(year));
  });

  activeYear = year;
}

// ─── Switch programme ─────────────────────────────────────────
function switchProgramme(progKey) {
  const identity = PROGRAMMES[progKey];
  const proto    = projectData[progKey];
  const years    = Object.keys(proto.years).map(Number).sort((a, b) => b - a);

  activeProgKey = progKey;

  // Fade viewer out
  viewer.style.opacity = "0";
  viewer.style.transition = "opacity 0.2s ease";

  setTimeout(() => {
    // Update CSS accent variable on :root
    document.documentElement.style.setProperty("--prog-accent", identity.accent);

    // Identity bar
    progCode.textContent  = identity.code;
    progTag.textContent   = identity.tag;
    progTitle.textContent = proto.title;

    // Stripe colour (hero)
    if (stripe) stripe.dataset.prog = progKey;

    // Year buttons
    progYears.innerHTML = "";
    years.forEach(year => {
      const btn = document.createElement("button");
      btn.className    = "year-btn";
      btn.textContent  = year;
      btn.dataset.year = year;
      btn.addEventListener("click", () => renderYear(progKey, year));
      progYears.appendChild(btn);
    });

    // Render latest year
    renderYear(progKey, years[0]);

    // Nav buttons active state
    document.querySelectorAll(".prog-nav-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.prog === progKey);
    });

    viewer.style.opacity = "1";
  }, 200);
}

// ─── Programme nav listeners ──────────────────────────────────
document.querySelectorAll(".prog-nav-btn").forEach(btn => {
  btn.addEventListener("click", () => switchProgramme(btn.dataset.prog));
});

// ─── Build overview cards ─────────────────────────────────────
function buildOverviewCards() {
  const grid = document.getElementById("all-progs-grid");
  if (!grid) return;

  Object.entries(projectData).forEach(([key, proto]) => {
    const identity = PROGRAMMES[key];
    const years    = Object.keys(proto.years).sort((a, b) => b - a);

    const card = document.createElement("div");
    card.className = "prog-card";
    card.style.setProperty("--card-accent", identity.accent);
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `View ${identity.tag} programme`);

    card.innerHTML = `
      <div class="prog-card-code">${identity.code}</div>
      <div class="prog-card-name">${identity.tag}</div>
      <div class="prog-card-title">${proto.title}</div>
      <div class="prog-card-years">
        ${years.length > 1
          ? `${years[years.length - 1]} – ${years[0]}`
          : years[0]
        } · ${years.length} season${years.length !== 1 ? "s" : ""}
      </div>
      <i class="fas fa-arrow-up-right prog-card-arrow"></i>
    `;

    // Click → scroll to viewer + switch
    function activate() {
      switchProgramme(key);
      viewer.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    card.addEventListener("click", activate);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") activate(); });

    grid.appendChild(card);
  });
}

// ─── Scroll reveal ───────────────────────────────────────────
function initReveal() {
  const targets = document.querySelectorAll(".prog-card, .prog-viewer");
  targets.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.5s var(--ease-expo) ${i * 0.05}s, transform 0.5s var(--ease-expo) ${i * 0.05}s`;
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => obs.observe(el));
}

// ─── Init ─────────────────────────────────────────────────────
switchProgramme("cv");
buildOverviewCards();
initReveal();