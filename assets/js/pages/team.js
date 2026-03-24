"use strict";

let activeYear = "2026";
let activeSubsystem = "All";

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
    name: "Damian C Dani",
    roles: ["Member"],
    subsystem: ["Drivetrain & Human Resources"],
    year: "2028",
    experience: "Member of the Drivetrain & HR team.",
    social: { linkedin: "https://www.linkedin.com/in/damian-c-dani-56a25b353", github: null, gmail: "damiancdani.ashwa@gmail.com" },
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
    name: "Jainaav Pramod",
    roles: ["Member"],
    subsystem: ["Sponsorship, Marketing & Public Relations"],
    year: "2028",
    experience: "Designed sponsor and Formula Bharat social media posts and contributed to multiple editions of the team newsletter.",
    social: { linkedin: "https://www.linkedin.com/in/jainaav-pramod-b1b319383/", github: "https://github.com/JainavPS", gmail: "jainaav.ashwa@gmail.com" },
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
    experience: "Currently creating a Lap-Time Simulator.",
    social: { linkedin: "https://www.linkedin.com/in/chakshu-m-diwakar-5a5777216", github: null, gmail: "chakshumd.ashwa@gmail.com" },
  },
  {
    name: "N Akshay Urs",
    roles: ["Project Manager", "Subsystem Lead"],
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
    name: "Vinith Prabhu",
    roles: ["Member"],
    subsystem: ["Electrical & Testing"],
    year: "2027",
    experience: "Designed the Power Distribution Board handling 300+ Watts of power around the car. Main proponent behind EDP position at Formula Bharat 2026, achieving P5 at Formula Bharat 2026. One of the drivers for the RZ-XX6C.",
    social: { linkedin: null, github: null, gmail: null },
  },
  {
    name: "Samith Belegadde Sirish",
    roles: ["Subsystem Lead"],
    subsystem: ["Sponsorship, Marketing & Public Relations"],
    year: "2027",
    experience: "Secured sponsors for the 2026–27 race season. Part of BPP team, achieving 2nd Place at Formula Bharat 2026.",
    social: { linkedin: "https://www.linkedin.com/in/samith-belegadde-sirish-162bb425b/", github: null, gmail: null },
  },
  {
    name: "Talin Thimmaiah",
    roles: ["Subsystem Lead"],
    subsystem: ["Engine"],
    year: "2027",
    experience: "Leading engine development and performance tuning for the 2027 race season. Worked on all engine components including sensors, ensuring a reliable power output.",
    social: { linkedin: null, github: null, gmail: null },
  },
  {
    name: "Aman Kumar Gupta",
    roles: ["Member"],
    subsystem: ["Drivetrain & Human Resources"],
    year: "2027",
    experience: "Designed drive shafts, DT Sprocket etc for the powertrain components of the car. Part of EDP team, achieving P5 at Formula Bharat 2026. Designed the team jersey and car livery.",
    social: { linkedin: "https://www.linkedin.com/in/aman-kumar-gupta-867996297/", github: null, gmail: null },
  },
  {
    name: "Preetham Paravastu",
    roles: ["Member"],
    subsystem: ["Brakes & Logistics"],
    year: "2027",
    experience: "Designed the front pedal assembly taking driver ergonomics into account. Part of EDP team, achieving P5 at Formula Bharat 2026. Also worked in implementation of a mechanical brake biasing system.",
    social: { linkedin: "https://www.linkedin.com/in/preetham-paravastu-90a97a2ba/", github: null, gmail: null },
  },
  {
    name: "Ranjith DS",
    roles: ["Member"],
    subsystem: ["Drivetrain & Human Resources"],
    year: "2027",
    experience: "Designed drive shafts, DT Sprocket etc for the powertrain components of the car. Part of EDP team, achieving P5 at Formula Bharat 2026.",
    social: { linkedin: "https://www.linkedin.com/in/ranjithds28/", github: null, gmail: null },
  },
  {
    name: "Tejas",
    roles: ["Member"],
    subsystem: ["Engine"],
    year: "2027",
    experience: "Designed fully sealed and tested oil and fuel tanks, reducing space taken. Part of EDP team, achieving P5 at Formula Bharat 2026.",
    social: { linkedin: null, github: null, gmail: null },
  },
  {
    name: "Aditeya Sarkar",
    roles: ["Subsystem Lead"],
    subsystem: ["Electrical & Testing", "IT"],
    year: "2027",
    experience: "Designed the BSPD. Worked on firmware for DAQ. Responsible for website design alongside IT 28.Part of BPP team, achieving 2nd Place at Formula Bharat 2026.",
    social: { linkedin: "https://www.linkedin.com/in/aditeya-sarkar/", github: "https://github.com/AditeyaDC", gmail: "aditeya.ashwa@gmail.com" },
    prototypes: {"Combustion": "Member / Part of team", "Driverless": "Member / Part of team"},
  },
  {
    name: "Aashrith Rao",
    roles: ["Member"],
    subsystem: ["Electrical & Testing", "Finance"],
    year: "2027",
    experience: "Designed the APPS. Part of CDP team, achieving top 20 finish at Formula Bharat 2026.",
    social: { linkedin: "https://www.linkedin.com/in/aashrith-rao-893010326/", github: null, gmail: null },
  },
  {
    name: "Pranav Ramakrishnan",
    roles: ["Member"],
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
    experience: "Designed and manufactured an ergonomically optimized pedal assembly and implemented the team's first real-time brake bias adjuster, enabling dynamic brake force tuning. Strong vehicle-level understanding with specialized expertise in braking systems.",
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
    name: "G Venkat Shreyas",
    roles: ["Subsystem Lead"],
    subsystem: ["Finance", "Electrical & Testing"],
    year: "2026",
    experience: "Managed funds for XX6E and XX6C within a ₹15 lakh budget, stabilized operations during a leadership transition, secured representation for Formula Hybrid Electric 2026, and represented Ashwa at European Hyperloop Week 2024 at ETH Zurich. Also contributed to accumulator design and energy requirement analysis for performance and endurance targets.",
    social: { linkedin: null, github: null, gmail: "venkatshreyas.ashwa@gmail.com" },
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
    subsystem: ["Sponsorship", "Marketing & Public Relations", "Leads"],
    year: "2025",
    experience: "Raised 5 lakhs and multiple sponsors for the team, 1st place BPP in Formula Bharat 2024, 2nd place Cost and Manufacturing Formula Bharat 2025, organised F1 simulator event in 8th mile 2023, Led Ashwa team of 2025,",
    social: { linkedin: null, github: null, gmail: "ravikiran.ashwa@gmail.com" },
    prototypes: {"Combustion": "Team Captain"},
    testimony: "My journey at Ashwa Racing was the most transformative experience of my life. I learnt volumes about team building, project management, leadership and so on while simultaneously discovering my own shortcomings and strengths. These experiences not only added to my knowledge base but also created lifelong memories which I will carry forward into through every walk of life. I have had the enormous privilege of leading an amazingly talented team of individuals and the journey has only fueled my drive to one day achieve the success I aspire towards.",
    currentJob: "MBA",
  },
  {
    name: "Chinmay Vanahalli",
    roles: ["Member", "Chief Engineer"],
    subsystem: ["Chassis & Workshop Management", "Leads"],
    year: "2025",
    experience: "Started my journey in Ashwa with hybrid project, we developed the Proof of Concept for a series-parallel hybrid powertrain, then helped with Hyperloop team for building Ashwa's first ever hyperloop pod. There, I contributed to the manufacturing and assembly of the pod and aeroshell. Signed off as Chief Engineer for the combustion prototype RZ-XX5C, leading the team through a successful campaign that saw the vehicle reach the endurance track at Formula Bharat 2025 and won 2nd place in Cost and manufacturing.",
    social: { linkedin: "https://www.linkedin.com/in/chinmay-v-ab703620b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", github: null, gmail: "chinmayv.ashwa@gmail.com" },
    prototypes: {"Combustion": "Chief Engineer", "Hybrid": "Member / Part of team", "Hyperloop": "Member / Part of team"},
    testimony: "My journey in Ashwa is something I will cherish forever. From the late-night manufacturing and testing sessions to the chaos of assembly or inventory session, the experience transformed me into a much better engineer. Being part of this team taught me to push my limits, thrive in a fast-paced environment, and truly understand my own strengths and weaknesses. Most importantly, Ashwa connected me with like-minded, hardworking individuals who are driven to achieve a common goal.",
    currentJob: "Product Engineer, Ather Energy",
  },
  {
    name: "Amish Srivastava",
    roles: ["Member"],
    subsystem: ["Suspension & Admin"],
    year: "2026",
    experience: "Kinematics and Geometry optimization, Spring rates, Anti roll bar design, Rocker design, Car setup",
    social: { linkedin: "https://www.linkedin.com/in/amish-s?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", github: null, gmail: "amish.ashwa@gmail.com" },
    prototypes: {"Electric": "Member / Part of team"},
  },
  {
    name: "Syed Nadeem",
    roles: ["Member"],
    subsystem: ["Sponsorship", "Marketing & Public Relations"],
    year: "2026",
    experience: "Helped raise sponsorship for both cv and ev cars. Finished in podium places in static events",
    social: { linkedin: "https://www.linkedin.com/in/syed-nadeem-30ab66264?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: null, gmail: "syednadeem.ashwa@gmail.com" },
    prototypes: {"Combustion": "Member / Part of team", "Electric": "Member / Part of team"},
  },
  {
    name: "Dhruva Kashyap",
    roles: ["Subsystem Lead"],
    subsystem: ["Electrical & Testing"],
    year: "2026",
    experience: "Developed a data-centric vehicle system architecture on a modular DAQ and telemetry system. Designed DAQ, Power Unit, AMS Master, Precharge, and TSSI systems, among others. Contributed to the development of Electric Test Vehicle, Hyperloop, FS-XX6E and FS-XX6C prototypes.",
    social: { linkedin: null, github: null, gmail: "dhruva.ashwa@gmail.com" },
    prototypes: {"Electric": "Member / Part of team"},
  },
];

const grid = document.getElementById("member-profiles-grid");
const countEl = document.getElementById("member-count");
const descBox = document.getElementById("subsystem-desc");
const yearFilter = document.getElementById("year-filter");
const subFilter = document.getElementById("subsystem-filter");
const yearItems = yearFilter.children;
const subItems = subFilter.children;

const PROFILE_BASE = "assets/images/team/members/";
const DEFAULT_PROFILE_IMAGE = "assets/images/team/default.webp";

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

  const gmailLink = member.social.gmail
    ? `<a href="mailto:${member.social.gmail}" target="_blank" rel="noopener" aria-label="Gmail"><i class="fas fa-envelope"></i></a>`
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
      ${gmailLink}
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

  const scene = new THREE.Scene();
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
  if (target <= 0) target = 1;
  if (target >= last) target = last - 1;

  const el = items[target];
  const x = el.offsetLeft - wrapper.clientWidth / 2 + el.clientWidth / 2;
  wrapper.scroll({ left: x, behavior: "smooth" });
  el.querySelector(".filter-btn")?.click();
}

// ─── Arrow Buttons ────────────────────────────────────────────
document.getElementById("year-left").onclick  = () => scrollStep(-1, yearFilter, yearFilter.children);
document.getElementById("year-right").onclick = () => scrollStep(1,  yearFilter, yearFilter.children);
document.getElementById("subsystem-left").onclick  = () => scrollStep(-1, subFilter, subItems);
document.getElementById("subsystem-right").onclick = () => scrollStep(1,  subFilter, subItems);

// ─── Wheel Scroll ─────────────────────────────────────────────
yearFilter.addEventListener("wheel", e => {
  e.preventDefault();
  scrollStep(e.deltaY > 0 ? 1 : -1, yearFilter, yearFilter.children);
});
subFilter.addEventListener("wheel", e => {
  e.preventDefault();
  scrollStep(e.deltaY > 0 ? 1 : -1, subFilter, subItems);
});

// ─── Subsystem Filter Click (static buttons) ──────────────────
subFilter.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".year-item");
    const val  = item.dataset.subsystem;

    if (descBox) {
      const desc = item.dataset.desc || "Members of Ashwa Racing.";
      descBox.style.opacity = "0";
      setTimeout(() => {
        descBox.textContent = desc;
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

  // ── Dynamically build year filter from teamData ──
  const years   = [...new Set(teamData.map(m => m.year))].sort();
  const spacers = yearFilter.querySelectorAll(".spacer");

  years.forEach(year => {
    const item       = document.createElement("div");
    item.className   = "year-item";
    item.dataset.year = year;

    const btn        = document.createElement("button");
    btn.className    = "filter-btn";
    btn.textContent  = year;

    // Attach click listener right here while we have the reference
    btn.addEventListener("click", () => {
      yearFilter.querySelectorAll(".filter-btn").forEach(x => x.classList.remove("active"));
      btn.classList.add("active");
      activeYear = year;
      renderMembers(activeYear, activeSubsystem);
    });

    item.appendChild(btn);
    yearFilter.insertBefore(item, spacers[spacers.length - 1]);
  });

  // Set first year as active
  const firstYearItem = [...yearFilter.children].find(el => el.dataset.year);
  if (firstYearItem) {
    activeYear = firstYearItem.dataset.year;
    firstYearItem.querySelector(".filter-btn").classList.add("active");
  }

  renderMembers(activeYear, activeSubsystem);

  setTimeout(() => {
    if (firstYearItem) {
      yearFilter.scrollLeft = firstYearItem.offsetLeft - yearFilter.clientWidth / 2 + firstYearItem.clientWidth / 2;
    }
    const is = subItems[1];
    if (is) subFilter.scrollLeft = is.offsetLeft - subFilter.clientWidth / 2 + is.clientWidth / 2;
  }, 100);
});