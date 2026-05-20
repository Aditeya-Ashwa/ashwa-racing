"use strict";

// ─── State ────────────────────────────────────────────────────
// Initialised to null; set properly on first render from dynamic year list
let activeYear      = null;
let activeSubsystem = "All";

// ─── Data ─────────────────────────────────────────────────────
const teamData = [
  {
    name: "Ananth Krishna",
    roles: ["Member"],
    subsystem: ["Chassis & Workshop Management"],
    year: "2028",
    experience: "Member of the Chassis & Workshop Management team.",
    social: { linkedin: "https://www.linkedin.com/in/ananth-krishna-679060243", github: null, gmail: "ananth.ashwa@gmail.com" },
  },
  {
    name: "Dilan Da Silva",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations"],
    year: "2028",
    experience: "Handles sponsor outreach and follow-ups, leads newsletter drafting, and contributes to social media content strategy.",
    social: { linkedin: "https://www.linkedin.com/in/dilan-d-silva-a8297b32a", github: null, gmail: "dilandsilva.ashwa@gmail.com" },
  },
  {
    name: "Sughosha Rao R",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2028",
    experience: "Working on PCB designs including accumulator precharge circuits and brake light systems using pressure transducers.",
    social: { linkedin: null, github: null, gmail: "sughosharaor.ashwa@gmail.com" },
  },
  {
    name: "Dilraj Singh",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations", "IT"],
    year: "2028",
    experience: "Manages social media content and contributes to website development.",
    social: { linkedin: "https://www.linkedin.com/in/dilraj-singh-cos007", github: "https://github.com/Dilraj07", gmail: "dilrajsingh.ashwa@gmail.com" },
  },
  {
    name: "Praful P I",
    roles: ["Member"],
    subsystem: ["Brakes & Logistics"],
    year: "2028",
    experience: "Member of the Brakes & Logistics subsystem.",
    social: { linkedin: null, github: null, gmail: "praful.ashwa@gmail.com" },
  },
  {
    name: "Ganesha K L",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2028",
    experience: "Member of the Suspension & Admin team.",
    social: { linkedin: "https://www.linkedin.com/in/ganesha-kalburgi-388042268", github: null, gmail: "ganeshakl.ashwa@gmail.com" },
  },
  {
    name: "Anarghya Hatti",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2028",
    experience: "Member of the Electrical & Testing subsystem.",
    social: { linkedin: "https://www.linkedin.com/in/anarghya-hatti-94a377251", github: null, gmail: "anarghya.ashwa@gmail.com" },
  },
  {
    name: "Lakshana Jeevanandan",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations"],
    year: "2028",
    experience: "Member of the Sponsorship, Marketing & PR team.",
    social: { linkedin: "https://www.linkedin.com/in/lakshana-jeevanandan-a1568432a", github: "https://github.com/lakshana009", gmail: "lakshanajeevanandan.ashwa@gmail.com" },
  },
  {
    name: "K M Sri Raghava",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2028",
    experience: "Member of the Electrical & Testing subsystem.",
    social: { linkedin: null, github: null, gmail: "raghava.ashwa@gmail.com" },
  },
  {
    name: "Shrinidhi R",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2028",
    experience: "Member of the Suspension & Admin team.",
    social: { linkedin: "https://www.linkedin.com/in/shrinidhi-ramesh-852026341", github: null, gmail: "shrinidhir.ashwa@gmail.com" },
  },
  {
    name: "Heer Maloo",
    roles: ["Member"],
    subsystem: ["Drivetrain & Human Resources", "Sponsorship, Marketing & Public Relations"],
    year: "2028",
    experience: "Member of the Drivetrain & HR and Sponsorship, Marketing & PR teams.",
    social: { linkedin: "https://www.linkedin.com/in/heer-maloo-490198260", github: "https://github.com/heermaloo03", gmail: "heermaloo.ashwa@gmail.com" },
  },
  {
    name: "Hansel Biju Mathew",
    roles: ["Member"],
    subsystem: ["Drivetrain & Human Resources"],
    year: "2028",
    experience: "Member of the Drivetrain & Human Resources team.",
    social: { linkedin: null, github: null, gmail: "hansel.ashwa@gmail.com" },
  },
  {
    name: "Pritha Nandy",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2028",
    experience: "Member of the Electrical & Testing subsystem.",
    social: { linkedin: null, github: null, gmail: "pritha.ashwa@gmail.com" },
  },
  {
    name: "Samyak Nahar",
    roles: ["Member"],
    subsystem: ["Chassis & Workshop Management"],
    year: "2028",
    experience: "Member of the Chassis & Workshop Management team.",
    social: { linkedin: "https://www.linkedin.com/in/samyak-nahar-00709132b", github: null, gmail: "samyaknahar.ashwa@gmail.com" },
  },
  {
    name: "Prithvi Krishna Shambhu",
    roles: ["Member"],
    subsystem: ["Chassis & Workshop Management"],
    year: "2028",
    experience: "Member of the Chassis & Workshop Management team.",
    social: { linkedin: null, github: null, gmail: "prithviks.ashwa@gmail.com" },
  },
  {
    name: "Shreni Shetty",
    roles: ["Member"],
    subsystem: ["Drivetrain & Human Resources"],
    year: "2028",
    experience: "Member of the Drivetrain & HR team.",
    social: { linkedin: "https://www.linkedin.com/in/shreni-shetty", github: "https://github.com/ShreniShetty", gmail: "shrenishetty.ashwa@gmail.com" },
  },
  {
    name: "Ishita K. Bharadhwaj",
    roles: ["Member"],
    subsystem: ["Chassis & Workshop Management"],
    year: "2028",
    experience: "Designed the accumulator mezzanine section and busbars housing safety and shutdown circuits, and manufactured the charging cart for the electric prototype.",
    social: { linkedin: "https://www.linkedin.com/in/ishita-bharadhwaj-b12741384", github: null, gmail: "ishitab.ashwa@gmail.com" },
  },
  {
    name: "Mrunal M",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2028",
    experience: "Member of the Electrical & Testing subsystem.",
    social: { linkedin: null, github: null, gmail: "mrunal.ashwa@gmail.com" },
  },
  {
    name: "Mayank S",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2028",
    experience: "Member of the Electrical & Testing subsystem.",
    social: { linkedin: null, github: null, gmail: "mayanks.ashwa@gmail.com" },
  },
  {
    name: "Sarah Das",
    roles: ["Member"],
    subsystem: ["Brakes & Logistics"],
    year: "2028",
    experience: "Member of the Brakes & Logistics subsystem.",
    social: { linkedin: null, github: null, gmail: "sarahdas.ashwa@gmail.com" },
  },
  {
    name: "Arya Sunil",
    roles: ["Member"],
    subsystem: ["Engine", "Sponsorship, Marketing & Public Relations"],
    year: "2028",
    experience: "Contributes to both Engine development and Sponsorship & Marketing initiatives.",
    social: { linkedin: "https://www.linkedin.com/in/arya-sunil-a781a5318", github: null, gmail: "aryas.ashwa@gmail.com" },
  },
  {
    name: "Prajwal G Koli",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2028",
    experience: "Member of the Suspension & Admin team.",
    social: { linkedin: null, github: null, gmail: "prajwalgopalkashwa@gmail.com" },
  },
  {
    name: "Tejas Nagendra Naik",
    roles: ["Member"],
    subsystem: ["Chassis & Workshop Management"],
    year: "2028",
    experience: "Member of the Chassis & Workshop Management team.",
    social: { linkedin: null, github: null, gmail: "tejasn.ashwa@gmail.com" },
  },
  {
    name: "Neil S Wesley",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2028",
    experience: "Assisted in procurement, basic manufacturing, and drafting administrative documents.",
    social: { linkedin: null, github: null, gmail: "neils.ashwa@gmail.com" },
  },
  {
    name: "Vinay Krishna B V",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations", "Finance"],
    year: "2028",
    experience: "Contributes to Sponsorship, Marketing & PR initiatives and financial operations.",
    social: { linkedin: "https://www.linkedin.com/in/vinay-krishna-b-v-182428317", github: null, gmail: "vinaykrishna.ashwa@gmail.com" },
  },
  {
    name: "Thanusha HU",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2028",
    experience: "Member of the Suspension & Admin team.",
    social: { linkedin: "https://www.linkedin.com/in/thanusha-h-u-438091354", github: null, gmail: "thanusha.ashwa@gmail.com" },
  },
  {
    name: "Priyansh Gupta",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations"],
    year: "2028",
    experience: "Member of the Sponsorship, Marketing & Public Relations team.",
    social: { linkedin: "https://www.linkedin.com/in/priyansh-gupta-a64328356", github: "https://github.com/prawnsgupta", gmail: "priyanshgupta.ashwa@gmail.com" },
  },
  {
    name: "Chakshu M Diwakar",
    roles: ["Member"],
    subsystem: ["Suspension & Admin", "Aero"],
    year: "2028",
    experience: "Currently developing a Lap-Time Simulator.",
    social: { linkedin: "https://www.linkedin.com/in/chakshu-m-diwakar-5a5777216", github: null, gmail: "chakshumd.ashwa@gmail.com" },
  },
  {
    name: "RZ-XX6-C",
    roles: ["Member"],
    subsystem: ["Chassis & Workshop Management", "Suspension & Admin", "Drivetrain & Human Resources", "Brakes & Logistics", "Engine", "Electrical & Testing", "Sponsorship", "Marketing & Public Relations", "Finance", "IT", "Aero"],
    year: "2027",
    experience: "The car. She is heavy, but she is ours.",
    social: { linkedin: "https://www.linkedin.com/company/ashwa-racing/", github: "https://github.com/Ashwa-Racing", gmail: "rzxx6c.ashwa@gmail.com" },
    prototypes: { "Combustion": "Member / Part of team" },
  },
  {
    name: "N Akshay Urs",
    roles: ["Project Manager"],
    subsystem: ["Leads", "Electrical & Testing"],
    year: "2027",
    experience: "Designed Rear & Side IO. Worked on firmware for DAQ. Made the harness for RZ-XX6C. One of the drivers for the RZ-XX6C. Part of EDP team, achieving P5 at Formula Bharat 2026.",
    social: { linkedin: "https://www.linkedin.com/in/n-akshayurs/", github: null, gmail: null },
  },
  {
    name: "Sathvik S Naik",
    roles: ["Subsystem Lead", "Chief Engineer"],
    subsystem: ["Leads", "Chassis & Workshop Management"],
    year: "2027",
    experience: "Designed the LV enclosure and chassis. One of the drivers for the RZ-XX6C. Part of EDP team, achieving P5 at Formula Bharat 2026.",
    social: { linkedin: "https://www.linkedin.com/in/sathvik-s-naik-b186342a8/", github: null, gmail: null },
  },
  {
    name: "Vinith Prabhu",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2027",
    experience: "Designed the Power Distribution Board handling 300+ Watts of power around the car. Main proponent behind EDP position at Formula Bharat 2026, achieving P5 at Formula Bharat 2026. One of the drivers for the RZ-XX6C.",
    social: { linkedin: null, github: null, gmail: null },
  },
  {
    name: "Shravan CS",
    roles: ["Subsystem Lead", "Team Captain"],
    subsystem: ["Leads", "Brakes & Logistics"],
    year: "2027",
    experience: "Leading the team as Captain while managing the Brakes & Logistics subsystem.",
    social: { linkedin: null, github: null, gmail: null },
  },
  {
    name: "Anshul Joshi",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2027",
    experience: "Delivered exceptional suspension work within a tight timeline, ensuring RZ-XX6C stood on her own four wheels. Part of EDP team, achieving P5 at Formula Bharat 2026. Contributed to P6 finish at FB 2026.",
    social: { linkedin: "https://www.linkedin.com/in/an-joshi/", github: null, gmail: null },
  },
  {
    name: "Talin Thimmaiah",
    roles: ["Subsystem Lead"],
    subsystem: ["Engine"],
    year: "2027",
    experience: "Leading engine development and performance tuning for the 2027 race season. Worked on all engine components including sensors, ensuring reliable power output.",
    social: { linkedin: null, github: null, gmail: null },
  },
  {
    name: "Ranjith DS",
    roles: ["Subsystem Lead"],
    subsystem: ["Drivetrain & Human Resources"],
    year: "2027",
    experience: "Designed drive shafts, DT Sprocket and other powertrain components. Part of EDP team, achieving P5 at Formula Bharat 2026.",
    social: { linkedin: "https://www.linkedin.com/in/ranjithds28/", github: null, gmail: null },
  },
  {
    name: "Aditeya Sarkar",
    roles: ["Subsystem Lead"],
    subsystem: ["Electrical & Testing", "IT"],
    year: "2027",
    experience: "Designed the BSPD. Worked on firmware for DAQ. Responsible for website design alongside IT 28. Part of BPP team, achieving 2nd Place at Formula Bharat 2026.",
    social: { linkedin: "https://www.linkedin.com/in/aditeya-sarkar/", github: "https://github.com/AditeyaDC", gmail: "aditeya.ashwa@gmail.com" },
    prototypes: { "Combustion": "Member / Part of team", "Driverless": "Member / Part of team" },
  },
  {
    name: "Pranav Ramakrishnan",
    roles: ["Subsystem Lead"],
    subsystem: ["Sponsorship, Marketing & Public Relations", "Finance"],
    year: "2027",
    experience: "Responsible for finances of RZ-XX6C. Part of BPP team, achieving P2 at Formula Bharat 2026.",
    social: { linkedin: "https://www.linkedin.com/in/pranav-ramakrishnan-387358297", github: null, gmail: "pranavramakrishnan.ashwa@gmail.com" },
  },
  {
    name: "Gaurav Raju",
    roles: ["Chief Engineer"],
    subsystem: ["Leads", "Chassis & Workshop Management"],
    year: "2026",
    experience: "Chief Engineer of the 2026 batch, leading the development of Ashwa Racing's first Electric Formula Student prototype.",
    social: { linkedin: "https://www.linkedin.com/in/gaurav-raju-9a2b92258", github: null, gmail: "gauravraju.ashwa@gmail.com" },
  },
  {
    name: "Vansh Vikas Jain",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations"],
    year: "2026",
    experience: "Secured 20+ sponsors including industry giants like Adani Group, Motul, Henkel, SKF, Delhivery, and BMC. Turns conversations into long-term collaborations, building partnerships that fuel performance on and off the track.",
    social: { linkedin: "https://www.linkedin.com/in/vansh-jain-a55b272b6", github: null, gmail: "vanshjain.ashwa@gmail.com" },
  },
  {
    name: "Hemanth",
    roles: ["Subsystem Lead"],
    subsystem: ["Brakes & Logistics"],
    year: "2026",
    experience: "Designed and manufactured an ergonomically optimized pedal assembly and implemented the team's first real-time brake bias adjuster, enabling dynamic brake force tuning.",
    social: { linkedin: null, github: null, gmail: null },
  },
  {
    name: "Sandeep N Uttarkar",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2026",
    experience: "Designed and developed the BMS/AMS architecture and supporting firmware for the vehicle.",
    social: { linkedin: "https://www.linkedin.com/in/sandeepnu0620/", github: "https://github.com/SandeepASHWARACING", gmail: "sandeepnuttarkar.ashwa@gmail.com" },
  },
  {
    name: "U P Madhavan",
    roles: ["Subsystem Lead"],
    subsystem: ["Sponsorship, Marketing & Public Relations"],
    year: "2026",
    experience: "Manufacturing lead overseeing sponsor onboarding (10+ partners), fundraising, vendor selection, and procurement for machining and raw materials.",
    social: { linkedin: "https://www.linkedin.com/in/madhavan-pari-28651526b", github: null, gmail: "upmadhavan.ashwa@gmail.com" },
  },
  {
    name: "Vibin",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2026",
    experience: "Designed and implemented a 600W motor controller, laid the foundations for the AWD hub motor system, and developed the VCU and CAN watchdog.",
    social: { linkedin: "#", github: null, gmail: null },
    easterEgg: true,
  },
  {
    name: "Ravikiran K",
    roles: ["Member", "Team Captain"],
    subsystem: ["Sponsorship, Marketing & Public Relations", "Leads"],
    year: "2025",
    experience: "Raised 5 lakhs and multiple sponsors for the team, 1st place BPP in Formula Bharat 2024, 2nd place Cost and Manufacturing Formula Bharat 2025, organised F1 simulator event in 8th Mile 2023, Led Ashwa team of 2025.",
    social: { linkedin: null, github: null, gmail: "ravikiran.ashwa@gmail.com" },
    prototypes: { "Combustion": "Team Captain" },
    testimony: "My journey at Ashwa Racing was the most transformative experience of my life. I learnt volumes about team building, project management, leadership and so on while simultaneously discovering my own shortcomings and strengths.",
    currentJob: "MBA",
  },
  {
    name: "Chinmay Vanahalli",
    roles: ["Member", "Chief Engineer"],
    subsystem: ["Chassis & Workshop Management", "Leads"],
    year: "2025",
    experience: "Started with hybrid project, developed PoC for a series-parallel hybrid powertrain, then contributed to Hyperloop manufacturing. Signed off as Chief Engineer for RZ-XX5C — vehicle completed endurance at Formula Bharat 2025, winning 2nd in Cost and Manufacturing.",
    social: { linkedin: "https://www.linkedin.com/in/chinmay-v-ab703620b", github: null, gmail: "chinmayv.ashwa@gmail.com" },
    prototypes: { "Combustion": "Chief Engineer", "Hybrid": "Member / Part of team", "Hyperloop": "Member / Part of team" },
    testimony: "My journey in Ashwa is something I will cherish forever. From late-night manufacturing sessions to assembly chaos, the experience transformed me into a much better engineer.",
    currentJob: "Product Engineer, Ather Energy",
  },
  {
    name: "Amish Srivastava",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2026",
    experience: "Kinematics and geometry optimization, spring rates, anti-roll bar design, rocker design, car setup.",
    social: { linkedin: "https://www.linkedin.com/in/amish-s", github: null, gmail: "amish.ashwa@gmail.com" },
    prototypes: { "Electric": "Member / Part of team" },
  },
  {
    name: "Syed Nadeem",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations"],
    year: "2026",
    experience: "Helped raise sponsorship for both CV and EV cars. Finished in podium places in static events.",
    social: { linkedin: "https://www.linkedin.com/in/syed-nadeem-30ab66264", github: null, gmail: "syednadeem.ashwa@gmail.com" },
    prototypes: { "Combustion": "Member / Part of team", "Electric": "Member / Part of team" },
  },
  {
    name: "Dhruva Kashyap",
    roles: ["Subsystem Lead"],
    subsystem: ["Electrical & Testing"],
    year: "2026",
    experience: "Developed a data-centric vehicle system architecture on a modular DAQ and telemetry system. Designed DAQ, Power Unit, AMS Master, Precharge, and TSSI systems. Contributed to ETV, Hyperloop, FS-XX6E, and FS-XX6C prototypes.",
    social: { linkedin: null, github: null, gmail: "dhruva.ashwa@gmail.com" },
    prototypes: { "Electric": "Member / Part of team" },
  },
  {
    name: "Adithya Ranjith",
    roles: ["Subsystem Lead"],
    subsystem: ["Drivetrain & Human Resources"],
    year: "2026",
    experience: "Designed and built the drivetrain architecture and system for the 2026 Electric Prototype.",
    social: { linkedin: "https://www.linkedin.com/in/adithyaranjith", github: null, gmail: "adithyaranjith.ashwa@gmail.com" },
    prototypes: { "Combustion": "Member / Part of team", "Electric": "Member / Part of team", "Hyperloop": "Member / Part of team" },
  },
];

// ─── DOM refs ──────────────────────────────────────────────────
const grid        = document.getElementById("member-profiles-grid");
const countEl     = document.getElementById("member-count");
const descBox     = document.getElementById("subsystem-desc");
const rosterHeading = document.getElementById("roster-heading");
const yearFilter  = document.getElementById("year-filter");
const subFilter   = document.getElementById("subsystem-filter");

const PROFILE_BASE           = "assets/images/team/members/";
const DEFAULT_PROFILE_IMAGE  = "assets/images/team/default.webp";

// ─── Role Classification ───────────────────────────────────────
// Returns the highest-authority role class for a member
function getRoleClass(member) {
  const roles = member.roles.map(r => r.toLowerCase());
  const isCommand =
    roles.some(r => r.includes("team captain") || r.includes("chief engineer") || r.includes("project manager"));
  const isLead =
    !isCommand && roles.some(r => r.includes("lead"));
  if (isCommand) return "is-command";
  if (isLead)    return "is-lead";
  return "";
}

// Human-readable badge text for top roles
function getBadgeText(member) {
  const roles = member.roles.map(r => r.toLowerCase());
  if (roles.some(r => r.includes("team captain")))   return { text: "Team Captain",   cls: "badge-command" };
  if (roles.some(r => r.includes("chief engineer"))) return { text: "Chief Engineer", cls: "badge-command" };
  if (roles.some(r => r.includes("project manager"))) return { text: "Project Manager", cls: "badge-command" };
  if (roles.some(r => r.includes("lead")))           return { text: "Subsystem Lead", cls: "badge-lead" };
  return null;
}

// ─── Card Builder ──────────────────────────────────────────────
function createMemberCard(member) {
  const card = document.createElement("div");
  card.classList.add("member-card");

  const roleClass = getRoleClass(member);
  if (roleClass) card.classList.add(roleClass);

  const imgName = member.image || member.name;
  const imgPath = `${PROFILE_BASE}${member.year}/${imgName}.webp`;

  // Social links
  const linkedinLink = member.social.linkedin && member.social.linkedin !== "#"
    ? `<a href="${member.social.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>`
    : "";
  const githubLink = member.social.github
    ? `<a href="${member.social.github}" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>`
    : "";
  const gmailLink = member.social.gmail
    ? `<a href="mailto:${member.social.gmail}" aria-label="Email"><i class="fas fa-envelope"></i></a>`
    : "";

  // Role badge HTML
  const badge = getBadgeText(member);
  const badgeHTML = badge
    ? `<div class="role-badge ${badge.cls}">${badge.text}</div>`
    : "";

  // Easter egg canvas
  const easterEggCanvas = member.easterEgg
    ? `<div class="member-3d"><canvas></canvas></div>`
    : "";

  // Subsystem display — strip duplicate entries cleanly
  const uniqueSubs = [...new Set(member.subsystem)].join(" · ");

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
      ${badgeHTML}
      <div class="profile-info-overlay">
        <p class="member-name">${member.name}</p>
        <p class="member-role">${member.roles.join(" · ")}</p>
        <p class="member-subsystem">${uniqueSubs}</p>
      </div>
    </div>

    <div class="member-experience">
      <div class="exp-label">Contribution</div>
      <p>${member.experience}</p>
    </div>

    <div class="member-social">
      ${linkedinLink}
      ${githubLink}
      ${gmailLink}
    </div>
  `;

  // Image error fallback — prevent infinite loop
  const img = card.querySelector(".member-img");
  img.addEventListener("error", function () {
    if (this.src.includes("default.webp")) return;
    this.src = DEFAULT_PROFILE_IMAGE;
  });

  return card;
}

// ─── Sort order ────────────────────────────────────────────────
// Command > Lead > Member
function roleSortWeight(member) {
  const cls = getRoleClass(member);
  if (cls === "is-command") return 0;
  if (cls === "is-lead")    return 1;
  return 2;
}

// ─── Render ────────────────────────────────────────────────────
function renderMembers(year, subsystem) {
  grid.style.opacity = "0";

  setTimeout(() => {
    grid.innerHTML = "";

    const results = teamData
      .filter(m =>
        m.year === year &&
        (subsystem === "All" || m.subsystem.includes(subsystem))
      )
      .sort((a, b) => roleSortWeight(a) - roleSortWeight(b));

    // Update count
    if (countEl) {
      countEl.textContent = results.length
        ? `${results.length} member${results.length !== 1 ? "s" : ""}`
        : "—";
    }

    // Update dynamic heading
    if (rosterHeading) {
      const sub = subsystem === "All" ? "Full Team" : subsystem;
      rosterHeading.textContent = `${sub} — ${year}`;
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
        card.style.animationDelay = `${i * 0.055}s`;

        if (member.easterEgg) {
          card.classList.add("easter-egg");
          initCard3D(card);
        }

        grid.appendChild(card);
      });
    }

    grid.style.opacity = "1";
  }, 160);
}

// ─── 3D Easter Egg ────────────────────────────────────────────
function initCard3D(card) {
  const canvas = card.querySelector(".member-3d canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
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
  const tex    = loader.load(
    "assets/images/team/members/2026/easteregg.png",
    () => renderer.render(scene, camera)
  );

  if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

  const mat  = new THREE.MeshStandardMaterial({ map: tex });
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
    if (items[i].querySelector?.(".filter-btn.active")) { activeIdx = i; break; }
  }
  if (activeIdx === -1) activeIdx = 1;

  let target = activeIdx + direction;
  const last = items.length - 1;
  if (target <= 0)    target = 1;
  if (target >= last) target = last - 1;

  const el = items[target];
  const x  = el.offsetLeft - wrapper.clientWidth / 2 + el.clientWidth / 2;
  wrapper.scroll({ left: x, behavior: "smooth" });
  el.querySelector(".filter-btn")?.click();
}

// ─── Arrow Buttons ────────────────────────────────────────────
document.getElementById("year-left").onclick  = () => scrollStep(-1, yearFilter, yearFilter.children);
document.getElementById("year-right").onclick = () => scrollStep( 1, yearFilter, yearFilter.children);
document.getElementById("subsystem-left").onclick  = () => scrollStep(-1, subFilter, subFilter.children);
document.getElementById("subsystem-right").onclick = () => scrollStep( 1, subFilter, subFilter.children);

// ─── Wheel Scroll ─────────────────────────────────────────────
yearFilter.addEventListener("wheel", e => {
  e.preventDefault();
  scrollStep(e.deltaY > 0 ? 1 : -1, yearFilter, yearFilter.children);
});
subFilter.addEventListener("wheel", e => {
  e.preventDefault();
  scrollStep(e.deltaY > 0 ? 1 : -1, subFilter, subFilter.children);
});

// ─── Subsystem Filter Click ───────────────────────────────────
subFilter.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".year-item");
    const val  = item.dataset.subsystem;

    // Update description block
    if (descBox) {
      const tagEl  = descBox.querySelector(".desc-tag");
      const textEl = descBox.querySelector(".desc-text");
      const desc   = item.dataset.desc || "Members of Ashwa Racing.";
      const label  = val === "All" ? "All Subsystems" : val.toUpperCase();

      descBox.style.opacity = "0";
      setTimeout(() => {
        if (tagEl)  tagEl.textContent  = label;
        if (textEl) textEl.textContent = desc;
        descBox.style.opacity = "1";
      }, 150);
    }

    subFilter.querySelectorAll(".filter-btn").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    activeSubsystem = val;
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

  // Build year filter dynamically from teamData
  const years   = [...new Set(teamData.map(m => m.year))].sort();
  const spacers = yearFilter.querySelectorAll(".spacer");

  years.forEach(year => {
    const item          = document.createElement("div");
    item.className      = "year-item";
    item.dataset.year   = year;

    const btn           = document.createElement("button");
    btn.className       = "filter-btn";
    btn.textContent     = year;

    btn.addEventListener("click", () => {
      yearFilter.querySelectorAll(".filter-btn").forEach(x => x.classList.remove("active"));
      btn.classList.add("active");
      activeYear = year;
      renderMembers(activeYear, activeSubsystem);
    });

    item.appendChild(btn);
    yearFilter.insertBefore(item, spacers[spacers.length - 1]);
  });

  // Activate the first available year
  const firstYearItem = [...yearFilter.children].find(el => el.dataset.year);
  if (firstYearItem) {
    activeYear = firstYearItem.dataset.year;
    firstYearItem.querySelector(".filter-btn").classList.add("active");
  }

  renderMembers(activeYear, activeSubsystem);

  // Centre the active filter items on load
  setTimeout(() => {
    if (firstYearItem) {
      yearFilter.scrollLeft =
        firstYearItem.offsetLeft - yearFilter.clientWidth / 2 + firstYearItem.clientWidth / 2;
    }
    const firstSubItem = [...subFilter.children].find(el => el.dataset.subsystem);
    if (firstSubItem) {
      subFilter.scrollLeft =
        firstSubItem.offsetLeft - subFilter.clientWidth / 2 + firstSubItem.clientWidth / 2;
    }
  }, 100);
});