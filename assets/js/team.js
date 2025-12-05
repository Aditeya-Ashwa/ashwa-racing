/* ==========================================================
       COMPLETE FULLY FIXED SCROLLING & FILTERING LOGIC
       ========================================================== */

let activeYear = "2028";
let activeSubsystem = "All";

/* Sample team data stays SAME as yours */
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
  // ADDED AERO MEMBER FOR TESTING
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
                <a href="${member.social.linkedin}" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
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

  // Add a fade out effect before changing content (optional polish)
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
    // Reset animation
    grid.style.animation = 'none';
    grid.offsetHeight; /* trigger reflow */
    grid.style.animation = 'fadeIn 0.5s ease-in-out';

  }, 150); // Short delay for transition
}


/* -------------------------------
   Fix: Include spacers using `.children`
-------------------------------- */
const yearFilter = document.getElementById("year-filter");
const subsystemFilter = document.getElementById("subsystem-filter-wrapper");

const yearItems = yearFilter.children;       // ✔ includes spacers
const subsystemItems = subsystemFilter.children;


/* -------------------------------
   Scrolling Logic (Fixed)
-------------------------------- */
function scrollStep(direction, wrapper, items) {
  let activeIndex = -1;

  for (let i = 0; i < items.length; i++) {
    const btn = items[i].querySelector(".filter-btn");
    if (btn && btn.classList.contains("active")) activeIndex = i;
  }

  // If no active button found (e.g., initial load), default to index 1 (first real item)
  if (activeIndex === -1) activeIndex = 1;

  let targetIndex = activeIndex + direction;

  // boundaries: skip spacers at 0 and last index
  const last = items.length - 1;

  // If we try to go to index 0 (spacer), clamp to 1
  if (targetIndex <= 0) targetIndex = 1;

  // If we try to go to last index (spacer), clamp to last-1
  if (targetIndex >= last) targetIndex = last - 1;

  const target = items[targetIndex];

  // center scroll
  const x = target.offsetLeft - wrapper.clientWidth / 2 + target.clientWidth / 2;
  wrapper.scroll({ left: x, behavior: "smooth" });

  // activate button
  target.querySelector(".filter-btn")?.click();
}


/* -------------------------------
   Attach Event Listeners
-------------------------------- */
document.getElementById("year-left").onclick = () =>
  scrollStep(-1, yearFilter, yearItems);

document.getElementById("year-right").onclick = () =>
  scrollStep(1, yearFilter, yearItems);

document.getElementById("subsystem-left").onclick = () =>
  scrollStep(-1, subsystemFilter, subsystemItems);

document.getElementById("subsystem-right").onclick = () =>
  scrollStep(1, subsystemFilter, subsystemItems);


/* Wheel scroll */
yearFilter.addEventListener("wheel", e => {
  e.preventDefault();
  scrollStep(e.deltaY > 0 ? 1 : -1, yearFilter, yearItems);
});
subsystemFilter.addEventListener("wheel", e => {
  e.preventDefault();
  scrollStep(e.deltaY > 0 ? 1 : -1, subsystemFilter, subsystemItems);
});


/* Click activate & Update Description */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".year-item");

    const wrapper =
      item.parentElement.id === "year-filter"
        ? yearFilter
        : subsystemFilter;

    const type = wrapper.id === "year-filter" ? "year" : "subsystem";

    const val = item.dataset[type];

    // Update Description if it's a subsystem click
    if (type === 'subsystem') {
      const desc = item.dataset.desc;
      const descBox = document.getElementById('subsystem-desc');
      descBox.style.opacity = 0;
      setTimeout(() => {
        descBox.textContent = desc || "Members of Ashwa Racing.";
        descBox.style.opacity = 1;
      }, 200);
    }

    // deactivate siblings
    wrapper.querySelectorAll(".filter-btn").forEach(x =>
      x.classList.remove("active")
    );
    btn.classList.add("active");

    if (type === "year") {
      activeYear = val;
    }
    else activeSubsystem = val;

    renderMembers(activeYear, activeSubsystem);
  });
});


/* Back to Top Logic */
const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  document.getElementById('filters-start').scrollIntoView({
    behavior: 'smooth'
  });
});


/* Initial render */
window.onload = () => {
  // Trigger initial render without delay to show something immediately
  renderMembers(activeYear, activeSubsystem);

  // Then perform the centering scroll
  setTimeout(() => {
    // Center Year Filter initially
    const initialYearItem = yearItems[1]; // 2028
    if (initialYearItem) {
      const x = initialYearItem.offsetLeft - yearFilter.clientWidth / 2 + initialYearItem.clientWidth / 2;
      yearFilter.scrollLeft = x;
    }

    // Center Subsystem Filter initially
    const initialSubItem = subsystemItems[1]; // All
    if (initialSubItem) {
      const x = initialSubItem.offsetLeft - subsystemFilter.clientWidth / 2 + initialSubItem.clientWidth / 2;
      subsystemFilter.scrollLeft = x;
    }
  }, 100);
};