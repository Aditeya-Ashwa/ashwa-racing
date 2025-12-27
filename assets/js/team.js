/* ==========================================================
   TEAM PAGE - COMPLETE FILTERING & SCROLLING LOGIC
   ========================================================== */

let activeYear = "2028";
let activeSubsystem = "All";

/* Sample team data */
const teamData = [
  {
    name: "Ranjit DSouza",
    role: "Project Manager (PM)",
    subsystem: "Leads",
    year: "2028",
    experience: "Led the 2028 team through Formula Bharat competition, securing 3rd place in Cost Analysis. Focused on budget management and strategic planning.",
    social: { linkedin: "#", github: "#" }
  },
  {
    name: "Ranjit DSouza",
    role: "Chassis Subsystem Lead",
    subsystem: "Chassis",
    year: "2028",
    experience: "Designed lightweight steel space-frame chassis and managed fabrication, achieving a 15% weight reduction over the previous prototype.",
    social: { linkedin: "#", github: null }
  },
  {
    name: "Ranjit DSouza",
    role: "Aerodynamics Lead",
    subsystem: "Aerodynamics",
    year: "2028",
    experience: "Developed and simulated the front and rear wing packages using CFD to maximize downforce and efficiency.",
    social: { linkedin: "#", github: "#" }
  },
  {
    name: "Ranjit DSouza",
    role: "Engine & Powertrain Specialist",
    subsystem: "Engine",
    year: "2027",
    experience: "Dyno tuned the CBR600RR engine and developing custom intake restrictor geometries for peak power output.",
    social: { linkedin: "#", github: "#" }
  },
  {
    name: "Ranjit DSouza",
    role: "Electrical & Testing Lead",
    subsystem: "Electrical",
    year: "2028",
    experience: "Implemented high-speed CAN bus communication system and designed the custom ECU harness for improved reliability.",
    social: { linkedin: "#", github: "#" }
  },
  {
    name: "Ranjit DSouza",
    role: "Suspension Member",
    subsystem: "Suspension",
    year: "2028",
    experience: "Optimized double-wishbone geometry and conducted kinematic analysis for dynamic track performance.",
    social: { linkedin: "#", github: null }
  },
  {
    name: "Ranjit DSouza",
    role: "Finance Lead",
    subsystem: "Finance",
    year: "2028",
    experience: "Managed fundraising & sponsorship reporting, ensuring compliance with all university regulations.",
    social: { linkedin: "#", github: null }
  },
  {
    name: "Ranjit DSouza",
    role: "Project Manager (2027)",
    subsystem: "Leads",
    year: "2027",
    experience: "Managed the 2027 project cycle.",
    social: { linkedin: "#", github: null }
  }
];

const PROFILE_IMAGE_URL = 'assets/images/team/members/2028/image.jpeg';


/* -------------------------------
   Create Member Cards
-------------------------------- */
function createMemberCard(member) {
  const card = document.createElement("div");
  card.classList.add("member-card");

  const githubLink = member.social.github
    ? `<a href="${member.social.github}" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>`
    : "";

  card.innerHTML = `
    <div class="profile-header">
      <div class="profile-img-container">
        <img src="${PROFILE_IMAGE_URL}" alt="${member.name}">
      </div>
      <h3 class="member-name">${member.name}</h3>
      <p class="member-role">${member.role}</p>
    </div>

    <div class="member-experience">
      <h3>Contribution</h3>
      <p>${member.experience}</p>
    </div>

    <div class="member-social">
      <a href="${member.social.linkedin}" target="_blank" aria-label="LinkedIn">
        <i class="fab fa-linkedin-in"></i>
      </a>
      ${githubLink}
    </div>
  `;

  return card;
}


/* -------------------------------
   Render Members
-------------------------------- */
function renderMembers(year, subsystem) {
  const grid = document.getElementById("member-profiles-grid");

  // Fade out effect
  grid.style.opacity = '0';

  setTimeout(() => {
    grid.innerHTML = "";

    const results = teamData.filter(m =>
      m.year === year &&
      (subsystem === "All" || m.subsystem === subsystem)
    );

    if (results.length === 0) {
      grid.innerHTML = `
        <div class="no-members">
          <i class="fas fa-users-slash" style="font-size: 3rem; margin-bottom: 20px; display: block;"></i>
          <p style="font-size: 1.2rem;">No team members found for <strong>${subsystem}</strong> in <strong>${year}</strong>.</p>
        </div>`;
    } else {
      results.forEach(m => grid.appendChild(createMemberCard(m)));
    }

    // Fade in
    grid.style.opacity = '1';
  }, 150);
}


/* -------------------------------
   Get Filter Items (includes spacers)
-------------------------------- */
const yearFilter = document.getElementById("year-filter");
const subsystemFilter = document.getElementById("subsystem-filter");

const yearItems = yearFilter.children;
const subsystemItems = subsystemFilter.children;


/* -------------------------------
   Scrolling Logic
-------------------------------- */
function scrollStep(direction, wrapper, items) {
  let activeIndex = -1;

  // Find the currently active button
  for (let i = 0; i < items.length; i++) {
    const btn = items[i].querySelector(".filter-btn");
    if (btn && btn.classList.contains("active")) {
      activeIndex = i;
      break;
    }
  }

  // Default to first real item if none active
  if (activeIndex === -1) activeIndex = 1;

  let targetIndex = activeIndex + direction;

  // Clamp to valid range (skip spacers at start and end)
  const last = items.length - 1;
  if (targetIndex <= 0) targetIndex = 1;
  if (targetIndex >= last) targetIndex = last - 1;

  const target = items[targetIndex];

  // Center scroll
  const x = target.offsetLeft - wrapper.clientWidth / 2 + target.clientWidth / 2;
  wrapper.scroll({ left: x, behavior: "smooth" });

  // Activate button
  target.querySelector(".filter-btn")?.click();
}


/* -------------------------------
   Attach Arrow Button Listeners
-------------------------------- */
document.getElementById("year-left").onclick = () =>
  scrollStep(-1, yearFilter, yearItems);

document.getElementById("year-right").onclick = () =>
  scrollStep(1, yearFilter, yearItems);

document.getElementById("subsystem-left").onclick = () =>
  scrollStep(-1, subsystemFilter, subsystemItems);

document.getElementById("subsystem-right").onclick = () =>
  scrollStep(1, subsystemFilter, subsystemItems);


/* -------------------------------
   Wheel Scroll Support
-------------------------------- */
yearFilter.addEventListener("wheel", e => {
  e.preventDefault();
  scrollStep(e.deltaY > 0 ? 1 : -1, yearFilter, yearItems);
});

subsystemFilter.addEventListener("wheel", e => {
  e.preventDefault();
  scrollStep(e.deltaY > 0 ? 1 : -1, subsystemFilter, subsystemItems);
});


/* -------------------------------
   Click Activation & Description Update
-------------------------------- */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".year-item");

    const wrapper = item.parentElement;
    const type = wrapper.id === "year-filter" ? "year" : "subsystem";
    const val = item.dataset[type];

    // Update subsystem description
    if (type === 'subsystem') {
      const desc = item.dataset.desc || "Members of Ashwa Racing.";
      const descBox = document.getElementById('subsystem-desc');
      descBox.style.opacity = '0';
      
      setTimeout(() => {
        descBox.textContent = desc;
        descBox.style.opacity = '1';
      }, 150);
    }

    // Deactivate all siblings
    wrapper.querySelectorAll(".filter-btn").forEach(x =>
      x.classList.remove("active")
    );
    btn.classList.add("active");

    // Update active state
    if (type === "year") {
      activeYear = val;
    } else {
      activeSubsystem = val;
    }

    renderMembers(activeYear, activeSubsystem);
  });
});


/* -------------------------------
   Back to Top Button
-------------------------------- */
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  const filtersSection = document.getElementById('filters-start');
  if (filtersSection) {
    filtersSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});


/* -------------------------------
   Initial Load
-------------------------------- */
window.onload = () => {
  // Initial render
  renderMembers(activeYear, activeSubsystem);

  // Center filters after a short delay
  setTimeout(() => {
    // Center Year Filter
    const initialYearItem = yearItems[1]; // First real item (2028)
    if (initialYearItem) {
      const x = initialYearItem.offsetLeft - yearFilter.clientWidth / 2 + initialYearItem.clientWidth / 2;
      yearFilter.scrollLeft = x;
    }

    // Center Subsystem Filter
    const initialSubItem = subsystemItems[1]; // First real item (All)
    if (initialSubItem) {
      const x = initialSubItem.offsetLeft - subsystemFilter.clientWidth / 2 + initialSubItem.clientWidth / 2;
      subsystemFilter.scrollLeft = x;
    }
  }, 100);
};