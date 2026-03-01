"use strict";

// ─── State ───────────────────────────────────────────────────
let activeYear = "2026";
let activeSubsystem = "All";

// ─── Data ────────────────────────────────────────────────────
const teamData = [
  {
    name: "Ananth Krishna",
    roles: ["Member"],
    subsystem: ["Chassis & Workshop Management"],
    year: "2028",
    experience: "Member of the Chassis & Workshop Management team.",
    social: { linkedin: "https://www.linkedin.com/in/ananth-krishna-679060243", github: null }
  },
  {
    name: "Dilan Da Silva",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations"],
    year: "2028",
    experience: "Handles sponsor outreach and follow-ups, leads newsletter drafting, and contributes to social media content strategy.",
    social: { linkedin: "https://www.linkedin.com/in/dilan-d-silva-a8297b32a", github: null }
  },
  {
    name: "Sughosha Rao R",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2028",
    experience: "Working on PCB designs including accumulator precharge circuits and brake light systems using pressure transducers.",
    social: { linkedin: null, github: null }
  },
  {
    name: "Dilraj Singh",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations", "IT"],
    year: "2028",
    experience: "Manages social media content and contributes to website development.",
    social: { linkedin: "https://www.linkedin.com/in/dilraj-singh-cos007", github: "https://github.com/Dilraj07" }
  },
  {
    name: "Damian C Dani",
    roles: ["Member"],
    subsystem: ["Drivetrain & Human Resources"],
    year: "2028",
    experience: "Member of the Drivetrain & HR team.",
    social: { linkedin: "https://www.linkedin.com/in/damian-c-dani-56a25b353", github: null }
  },
  {
    name: "Praful P I",
    roles: ["Member"],
    subsystem: ["Brakes & Logistics"],
    year: "2028",
    experience: "Member of the Brakes & Logistics subsystem.",
    social: { linkedin: null, github: null }
  },
  {
    name: "Ganesha K L",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2028",
    experience: "Member of the Suspension & Admin team.",
    social: { linkedin: "https://www.linkedin.com/in/ganesha-kalburgi-388042268", github: null }
  },
  {
    name: "Anarghya Hatti",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2028",
    experience: "Member of the Electrical & Testing subsystem.",
    social: { linkedin: "https://www.linkedin.com/in/anarghya-hatti-94a377251", github: null }
  },
  {
    name: "Lakshana Jeevanandan",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations"],
    year: "2028",
    experience: "Member of the Sponsorship, Marketing & PR team.",
    social: { linkedin: "https://www.linkedin.com/in/lakshana-jeevanandan-a1568432a", github: "https://github.com/lakshana009" }
  },
  {
    name: "K M Sri Raghava",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2028",
    experience: "Member of the Electrical & Testing subsystem.",
    social: { linkedin: null, github: null }
  },
  {
    name: "Shrinidhi R",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2028",
    experience: "Member of the Suspension & Admin team.",
    social: { linkedin: "https://www.linkedin.com/in/shrinidhi-ramesh-852026341", github: null }
  },
  {
    name: "Pritha Nandy",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2028",
    experience: "Member of the Electrical & Testing subsystem.",
    social: { linkedin: null, github: null }
  },
  {
    name: "Samyak Nahar",
    roles: ["Member"],
    subsystem: ["Chassis & Workshop Management"],
    year: "2028",
    experience: "Member of the Chassis & Workshop Management team.",
    social: { linkedin: "https://www.linkedin.com/in/samyak-nahar-00709132b", github: null }
  },
  {
    name: "Prithvi Krishna Shambhu",
    roles: ["Member"],
    subsystem: ["Chassis & Workshop Management"],
    year: "2028",
    experience: "Member of the Chassis & Workshop Management team.",
    social: { linkedin: null, github: null }
  },
  {
    name: "Shreni Shetty",
    roles: ["Member"],
    subsystem: ["Drivetrain & Human Resources"],
    year: "2028",
    experience: "Member of the Drivetrain & HR team.",
    social: { linkedin: "https://www.linkedin.com/in/shreni-shetty", github: "https://github.com/ShreniShetty" }
  },
  {
    name: "Ishita K. Bharadhwaj",
    roles: ["Member"],
    subsystem: ["Chassis & Workshop Management"],
    year: "2028",
    experience: "Designed the accumulator mezzanine section and busbars housing safety and shutdown circuits, and manufactured the charging cart for the electric prototype.",
    social: { linkedin: "https://www.linkedin.com/in/ishita-bharadhwaj-b12741384", github: null }
  },
  {
    name: "Mrunal M",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2028",
    experience: "Member of the Electrical & Testing subsystem.",
    social: { linkedin: null, github: null }
  },
  {
    name: "Mayank S",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2028",
    experience: "Member of the Electrical & Testing subsystem.",
    social: { linkedin: null, github: null }
  },
  {
    name: "Arya Sunil",
    roles: ["Member"],
    subsystem: ["Engine", "Sponsorship, Marketing & Public Relations"],
    year: "2028",
    experience: "Contributes to both Engine development and Sponsorship & Marketing initiatives.",
    social: { linkedin: "https://www.linkedin.com/in/arya-sunil-a781a5318", github: null }
  },
  {
    name: "Prajwal G Koli",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2028",
    experience: "Member of the Suspension & Admin team.",
    social: { linkedin: null, github: null }
  },
  {
    name: "Tejas Nagendra Naik",
    roles: ["Member"],
    subsystem: ["Chassis & Workshop Management"],
    year: "2028",
    experience: "Member of the Chassis & Workshop Management team.",
    social: { linkedin: null, github: null }
  },
  {
    name: "Neil S Wesley",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2028",
    experience: "Assisted in procurement, basic manufacturing, and drafting administrative documents.",
    social: { linkedin: null, github: null }
  },
  {
    name: "Vinay Krishna B V",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations", "Finance"],
    year: "2028",
    experience: "Contributes to Sponsorship, Marketing & PR initiatives and financial operations.",
    social: { linkedin: "https://www.linkedin.com/in/vinay-krishna-b-v-182428317", github: null }
  },
  {
    name: "Jainaav Pramod",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations"],
    year: "2028",
    experience: "Designed sponsor and Formula Bharat social media posts and contributed to multiple editions of the team newsletter.",
    social: { linkedin: "https://www.linkedin.com/in/jainaav-pramod-b1b319383/", github: "https://github.com/JainavPS" }
  },
  {
    name: "Thanusha HU",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2028",
    experience: "Member of the Suspension & Admin team.",
    social: { linkedin: "https://www.linkedin.com/in/thanusha-h-u-438091354", github: null }
  },
  {
    name: "N Akshay Urs",
    roles: ["Project Manager", "Subsystem Lead"],
    subsystem: ["Leads", "Electrical & Testing"],
    year: "2027",
    experience: "Designed Rear & Side IO. Worked on firmware for DAQ. Made the harness for RZ-XX6C. One of the drivers for the RZ-XX6C. Part of EDP team, achieving P5 at Formula Bharat 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/n-akshayurs/",
      github: null
    }
  },
  {
    name: "Sathvik S Naik",
    roles: ["Subsystem Lead", "Chief Engineer"],
    subsystem: ["Leads", "Chassis & Workshop Management"],
    year: "2027",
    experience: "Designed the LV enclosure and chassis. One of the drivers for the RZ-XX6C. Part of EDP team, achieving P5 at Formula Bharat 2026.",
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
    name: "Anshul Joshi",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2027",
    experience: "Delivered exceptional suspension work within a tight timeline, ensuring RZ-XX6C stood on her own four wheels. Part of EDP team, achieving P5 at Formula Bharat 2026. Contributed to P6 finish at FB 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/an-joshi/",
      github: null
    }
  },
  {
    name: "Vinith Prabhu",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2027",
    experience: "Designed the Power Distribution Board handling 300+ Watts of power around the car. Main proponent behind EDP position at Formula Bharat 2026, achieving P5 at Formula Bharat 2026. One of the drivers for the RZ-XX6C.",
    social: {
      linkedin: null,
      github: null
    }
  },

  {
    name: "Samith Belegadde Sirish",
    roles: ["Subsystem Lead"],
    subsystem: ["Sponsorship, Marketing & Public Relations"],
    year: "2027",
    experience: "Secured sponsors for the 2026–27 race season. Part of BPP team, achieving 2nd Place at Formula Bharat 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/samith-belegadde-sirish-162bb425b/",
      github: null
    }
  },
  {
    name: "Talin Thimmaiah",
    roles: ["Subsystem Lead"],
    subsystem: ["Engine"],
    year: "2027",
    experience: "Leading engine development and performance tuning for the 2027 race season. Worked on all engine components including sensors, ensuring a reliable power output.",
    social: {
      linkedin: null,
      github: null
    }
  },

  {
    name: "Aman Kumar Gupta",
    roles: ["Member"],
    subsystem: ["Drivetrain & Human Resources"],
    year: "2027",
    experience: "Designed drive shafts, DT Sprocket etc for the powertrain components of the car. Part of EDP team, achieving P5 at Formula Bharat 2026. Designed the team jersey and car livery.",
    social: {
      linkedin: "https://www.linkedin.com/in/aman-kumar-gupta-867996297/",
      github: null
    }
  },
  {
    name: "Preetham Paravastu",
    roles: ["Member"],
    subsystem: ["Brakes & Logistics"],
    year: "2027",
    experience: "Designed the front pedal assembly taking driver ergonomics into account. Part of EDP team, achieving P5 at Formula Bharat 2026. Also worked in implementation of a mechanical brake biasing system.",
    social: {
      linkedin: "https://www.linkedin.com/in/preetham-paravastu-90a97a2ba/",
      github: null
    }
  },
  {
    name: "Ranjith DS",
    roles: ["Member"],
    subsystem: ["Drivetrain & Human Resources"],
    year: "2027",
    experience: "Designed drive shafts, DT Sprocket etc for the powertrain components of the car. Part of EDP team, achieving P5 at Formula Bharat 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/ranjithds28/",
      github: null
    }
  },
  {
    name: "Tejas",
    roles: ["Member"],
    subsystem: ["Engine"],
    year: "2027",
    experience: "Designed fully sealed and tested oil and fuel tanks, reducing space taken. Part of EDP team, achieving P5 at Formula Bharat 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/ranjithds28/",
      github: null
    }
  },
  {
    name: "Aditeya Sarkar",
    roles: ["Member"],
    subsystem: ["Electrical & Testing", "IT"],
    year: "2027",
    experience: "Designed the BSPD. Worked on firmware for DAQ. Responsible for website design alongside IT 28.Part of BPP team, achieving 2nd Place at Formula Bharat 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/aditeya-sarkar/",
      github: "https://github.com/GigglePaste"
    }
  },
  {
    name: "Aashrith Rao",
    roles: ["Member"],
    subsystem: ["Electrical & Testing", "Finance"],
    year: "2027",
    experience: "Designed the APPS. Part of CDP team, achieving top 20 finish at Formula Bharat 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/aashrith-rao-893010326/",
      github: null
    }
  },
  {
    name: "Pranav Ramakrishnan",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations", "Finance"],
    year: "2027",
    experience: "Responsible for finances of RZ-XX6C. Part of BPP team, achieving P2 at Formula Bharat 2026.",
    social: {
      linkedin: "https://www.linkedin.com/in/aashrith-rao-893010326/",
      github: null
    }
  },
  {
    name: "Gaurav Raju",
    roles: ["Chief Engineer"],
    subsystem: ["Leads","Chassis & Workshop Management"],
    year: "2026",
    experience: "Chief Engineer of the 2026 batch, leading the development of Ashwa Racing’s first Electric Formula Student prototype.",
    social: {
      linkedin: "https://www.linkedin.com/in/gaurav-raju-9a2b92258",
      github: null
    }
  },
  {
    name: "Vansh Vikas Jain",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations"],
    year: "2026",
    experience: "Leads sponsorship and marketing initiatives, securing 20+ sponsors including major industry partners. Focused on building long-term strategic collaborations that strengthen the team’s financial and brand presence.",
    social: {
      linkedin: "https://www.linkedin.com/in/vansh-jain-a55b272b6",
      github: null
    }
  },
  { name: "Hemanth", roles: ["Subsystem Lead"], subsystem: ["Brakes & Logistics"], year: "2026", experience: "Designed and manufactured an ergonomically optimized pedal assembly and implemented the team’s first real-time brake bias adjuster, enabling dynamic brake force tuning. Strong vehicle-level understanding with specialized expertise in braking systems.", social: { linkedin: null, github: null } },
  {
    name: "Sandeep N Uttarkar",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2026",
    experience: "Designed and developed the BMS/AMS architecture and supporting firmware for the vehicle.",
    social: {
      linkedin: "https://www.linkedin.com/in/sandeepnu0620/",
      github: "https://github.com/SandeepASHWARACING"
    }
  },
  {
    name: "G Venkat Shreyas",
    roles: ["Subsystem Lead"],
    subsystem: ["Leads","Electrical & Testing", "Finance"],
    year: "2026",
    experience: "Managed team finances within a ₹15 lakh budget for both electric and combustion programs, supported international competition logistics, and contributed to accumulator design and energy requirement analysis for performance and endurance targets.",
    social: {
      linkedin: null,
      github: null
    }
  },
  {
    name: "U P Madhavan",
    roles: ["Subsystem Lead"],
    subsystem: ["Leads","Sponsorship, Marketing & Public Relations"],
    year: "2026",
    experience: "Manufacturing lead overseeing sponsor onboarding (10+ partners), fundraising, vendor selection, and procurement for machining and raw materials.",
    social: {
      linkedin: "https://www.linkedin.com/in/madhavan-pari-28651526b",
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
      linkedin: "#",
      github: null
    },
    easterEgg: false
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
const DEFAULT_PROFILE_IMAGE = "assets/images/team/default.webp";

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
            class="member-img"
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
    // Handle image fallback
  const img = card.querySelector(".member-img");

  img.addEventListener("error", function () {
    if (this.src.includes("default.webp")) return; // prevent loop
    this.src = DEFAULT_PROFILE_IMAGE;
  });

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