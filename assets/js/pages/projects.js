/* ============================================================
   ASHWA RACING — projects.js
   Programme viewer: CV / EV / HYB / HYP / DV
   ============================================================ */

"use strict";

// ─── Programme identity ───────────────────────────────────────
const PROGRAMMES = {
  cv:  { code: "CV",  tag: "Combustion Vehicle",  accent: "#e8001d", cssVar: "--cv-accent"  },
  ev:  { code: "EV",  tag: "Electric Vehicle",     accent: "#00c2a8", cssVar: "--ev-accent"  },
  hyb: { code: "HYB", tag: "Hybrid Vehicle",       accent: "#f59e0b", cssVar: "--hyb-accent" },
  hyp: { code: "HYL", tag: "Hyperloop",            accent: "#7c3aed", cssVar: "--hyp-accent" },
  dv:  { code: "DRV", tag: "Driverless Vehicle",   accent: "#3b82f6", cssVar: "--dv-accent"  }
};

// ─── Project data ─────────────────────────────────────────────
const projectData = {
  cv: {
    title: "High-Performance Combustion Platform",
    years: {
      2005: {
        images: [
          // "assets/images/prototypes/RZ-05-C/1.webp",
          // "assets/images/prototypes/RZ-05-C/2.webp",
          // "assets/images/prototypes/RZ-05-C/3.webp",
          // "assets/images/prototypes/RZ-05-C/4.webp",
          "assets/images/prototypes/RZ-05-C/5.webp",
          // "assets/images/prototypes/RZ-05-C/6.webp",
          // "assets/images/prototypes/RZ-05-C/7.webp",
        ],
        changes: [
          "Founding prototype — RZ05 Combustion",
          "Mild steel spaceframe chassis (TIG welded)",
          "Honda CBR600 600cc powertrain integration",
          "In-house intake, exhaust & muffler development",
          "Double wishbone push-rod suspension architecture"
        ],
        desc: "RZ05 marked Ashwa Racing's historic debut at Formula SAE Australasia, becoming the first student-built Formula Student car from Asia to compete at the event. It laid the technical and competitive foundation of the combustion programme.",
        specs: { weight: "350 kg", power: "60 HP", acceleration: "4.5s", topSpeed: "100 kmph" },
        achievements: [
          "Best Endeavour Award — Formula SAE Australasia",
          "Best Cost Award — Formula SAE Australasia",
          "First Asian entry at FSAE Australasia"
        ]
      },
      2006: {
        images: [
          // "assets/images/prototypes/RZ-06-C/event/1.webp",
          // "assets/images/prototypes/RZ-06-C/event/6.webp",
          // "assets/images/prototypes/RZ-06-C/event/9.webp",
          // "assets/images/prototypes/RZ-06-C/event/10.webp",
          // "assets/images/prototypes/RZ-06-C/event/11.webp",
          // "assets/images/prototypes/RZ-06-C/event/12.webp",
          // "assets/images/prototypes/RZ-06-C/event/13.webp",
          // "assets/images/prototypes/RZ-06-C/event/14.webp",
          // "assets/images/prototypes/RZ-06-C/event/17.webp",
          // "assets/images/prototypes/RZ-06-C/event/19.webp",
          // "assets/images/prototypes/RZ-06-C/event/20.webp",
          // "assets/images/prototypes/RZ-06-C/event/21.webp",
          "assets/images/prototypes/RZ-06-C/event/22.webp",
          // "assets/images/prototypes/RZ-06-C/postevent/1.webp",
          // "assets/images/prototypes/RZ-06-C/postevent/2.webp",
          "assets/images/prototypes/RZ-06-C/postevent/3.webp",
          // "assets/images/prototypes/RZ-06-C/postevent/6.webp",
          // "assets/images/prototypes/RZ-06-C/postevent/7.webp",
          // "assets/images/prototypes/RZ-06-C/postevent/8.webp",
          // "assets/images/prototypes/RZ-06-C/postevent/9.webp",
        ],
        changes: [
          "RZ06 Combustion — second-generation platform",
          "First student-built vehicle with carbon-fiber reinforced steel frame",
          "Major structural redesign over RZ05",
          "Improved weight reduction programme",
          "Integration of MOTEC M800 programmable ECU"
        ],
        desc: "RZ06 marked a significant technological leap over its predecessor. Featuring a carbon-fiber reinforced steel frame, it represented a major structural and design advancement for Ashwa Racing at Formula SAE Australasia.",
        specs: { weight: "300 kg", power: "70 HP", acceleration: "4.21s", topSpeed: "100 kmph" },
        achievements: [
          "Best Asian Entry Award — Formula SAE Australasia",
          "Overall Rank: 20th",
          "Cost Event: 8th"
        ]
      },
      2007: {
        images: [
          // "assets/images/prototypes/RZ-07-C/1.webp",
          // "assets/images/prototypes/RZ-07-C/2.webp",
          // "assets/images/prototypes/RZ-07-C/3.webp",
          // "assets/images/prototypes/RZ-07-C/4.webp",
          // "assets/images/prototypes/RZ-07-C/5.webp",
          // "assets/images/prototypes/RZ-07-C/6.webp",
          // "assets/images/prototypes/RZ-07-C/7.webp",
          // "assets/images/prototypes/RZ-07-C/8.webp",
          // "assets/images/prototypes/RZ-07-C/9.webp",
          // "assets/images/prototypes/RZ-07-C/10.webp",
          // "assets/images/prototypes/RZ-07-C/11.webp",
          // "assets/images/prototypes/RZ-07-C/12.webp",
          // "assets/images/prototypes/RZ-07-C/13.webp",
          "assets/images/prototypes/RZ-07-C/14.webp",
          // "assets/images/prototypes/RZ-07-C/15.webp",
          // "assets/images/prototypes/RZ-07-C/16.webp",
          // "assets/images/prototypes/RZ-07-C/17.webp",
          // "assets/images/prototypes/RZ-07-C/18.webp",
          // "assets/images/prototypes/RZ-07-C/19.webp",
          // "assets/images/prototypes/RZ-07-C/20.webp",
          // "assets/images/prototypes/RZ-07-C/21.webp",
          // "assets/images/prototypes/RZ-07-C/22.webp",
          // "assets/images/prototypes/RZ-07-C/23.webp",
          "assets/images/prototypes/RZ-07-C/24.webp",
        ],
        changes: [
          "RZ07 Combustion — first European campaign",
          "Competed at Formula Student Germany",
          "Refined structural weight reduction (280 kg total weight)",
          "Improved acceleration performance (4.05 sec)",
          "MOTEC M800 programmable ECU integration"
        ],
        desc: "RZ07 marked Ashwa Racing's first European competition appearance at Formula Student Germany. The car represented a major milestone in the team's global expansion and industry collaboration efforts.",
        specs: { weight: "280 kg", power: "73 HP", acceleration: "4.05s", topSpeed: "100 kmph" },
        achievements: [
          "Young Achiever Award — Rotary International (2007)",
          "First European competition entry — Formula Student Germany"
        ]
      },
      2008: {
        images: [
          // "assets/images/prototypes/RZ-08-C/1.webp",
          // "assets/images/prototypes/RZ-08-C/2.webp",
          // "assets/images/prototypes/RZ-08-C/3.webp",
          // "assets/images/prototypes/RZ-08-C/4.webp",
          "assets/images/prototypes/RZ-08-C/5.webp",
          // "assets/images/prototypes/RZ-08-C/6.webp",
          "assets/images/prototypes/RZ-08-C/7.webp",
          // "assets/images/prototypes/RZ-08-C/8.webp",
          // "assets/images/prototypes/RZ-08-C/9.webp",
          // "assets/images/prototypes/RZ-08-C/10.webp",
          // "assets/images/prototypes/RZ-08-C/11.webp",
          // "assets/images/prototypes/RZ-08-C/12.webp",
          // "assets/images/prototypes/RZ-08-C/13.webp",
        ],
        changes: [
          "RZ08 Combustion — evolutionary refinement of 2005–2007 platforms",
          "Precision CNC manufacturing introduced across key components",
          "Improved intake casting design for complex geometry",
          "Enhanced partner and supplier integration programme",
          "Further structural and weight optimisation"
        ],
        desc: "RZ08 represented the consolidation of three years of combustion development. Competing at Formula Student Germany, the platform focused on precision manufacturing, improved intake architecture, and deeper industry collaboration.",
        specs: { weight: "260 kg", power: "73 HP", acceleration: "3.90s", topSpeed: "100 kmph" },
        achievements: [
          "Competed at Formula Student Germany",
          "Strengthened international technical collaborations"
        ]
      },
      2009: {
        images: [
          "assets/images/prototypes/RZ-09-C/EVENT/1.webp",
          // "assets/images/prototypes/RZ-09-C/EVENT/2.webp",
          // "assets/images/prototypes/RZ-09-C/EVENT/3.webp",
          // "assets/images/prototypes/RZ-09-C/EVENT/4.webp",
          // "assets/images/prototypes/RZ-09-C/EVENT/5.webp",
          // "assets/images/prototypes/RZ-09-C/EVENT/6.webp",
          // "assets/images/prototypes/RZ-09-C/EVENT/7.webp",
          // "assets/images/prototypes/RZ-09-C/EVENT/8.webp",
          // "assets/images/prototypes/RZ-09-C/POST-EVENT/1.webp",
          // "assets/images/prototypes/RZ-09-C/PRE-EVENT/1.webp",
        ],
        changes: [
          "RZ09 Combustion — Italy & Germany campaign year",
          "Robust industry–institute partnership platform",
          "Refined intake RAM system with K&N air filter",
          "Aluminium honeycomb bulkhead integration",
          "Further weight optimisation to 255 kg"
        ],
        desc: "The 2009 prototype, RZ09, marked Ashwa Racing's strong international presence — competing at Formula Student Germany and earning recognition in Italy. The platform demonstrated engineering maturity, strong industry collaboration, and competitive dynamic performance.",
        specs: { weight: "255 kg", power: "70 HP", acceleration: "3.89s", topSpeed: "100 kmph" },
        achievements: [
          "Best Endeavor Award — Formula Student Italy",
          "Young Achiever Award — Rotary International",
          "Competed at Formula Student Germany"
        ]
      },
      2010: {
        images: [
          "assets/images/prototypes/RZ-X-C/1.webp",
          // "assets/images/prototypes/RZ-X-C/2.webp",
          // "assets/images/prototypes/RZ-X-C/3.webp",
          // "assets/images/prototypes/RZ-X-C/4.webp",
          // "assets/images/prototypes/RZ-X-C/5.webp",
          // "assets/images/prototypes/RZ-X-C/6.webp",
          // "assets/images/prototypes/RZ-X-C/7.webp",
          "assets/images/prototypes/RZ-X-C/8.webp",
          // "assets/images/prototypes/RZ-X-C/9.webp",
        ],
        changes: [
          "RZ10 — Rebranded next-generation combustion platform",
          "Chromoly 4130 TIG-welded spaceframe chassis",
          "Revamped ergonomic driver-focused cockpit",
          "Improved self-sustaining business model integration",
          "Refined intake RAM and exhaust 4-2-1 system"
        ],
        desc: "The year 2010 saw the rollout of RZ10 — a newly branded evolution of Ashwa's combustion platform. With improved ergonomics, structural refinement using Chromoly 4130, and stronger systems integration, the car marked a mature phase of development.",
        specs: { weight: "250 kg", power: "75 HP", acceleration: "8s", topSpeed: "100 kmph" },
        achievements: [
          "Continued Formula Student campaign",
          "Highest power output in combustion lineage till 2010"
        ]
      },
      2011: {
        images: [
          // "assets/images/prototypes/RZ-X1-C/1.webp",
          // "assets/images/prototypes/RZ-X1-C/2.webp",
          "assets/images/prototypes/RZ-X1-C/3.webp",
          // "assets/images/prototypes/RZ-X1-C/4.webp",
          "assets/images/prototypes/RZ-X1-C/5.webp",
          // "assets/images/prototypes/RZ-X1-C/6.webp",
          // "assets/images/prototypes/RZ-X1-C/7.webp",
          // "assets/images/prototypes/RZ-X1-C/8.webp",
          // "assets/images/prototypes/RZ-X1-C/9.webp"
        ],
        changes: [
          "RZX1 — First generation of the RZX combustion lineage",
          "Continuation of Chromoly 4130 TIG-welded spaceframe",
          "Refined intake RAM and exhaust systems",
          "Ergonomic cockpit redesign",
          "Pneumatically actuated paddle shift integration"
        ],
        desc: "In 2011, Ashwa Racing introduced RZX1 — marking the transition into the RZX combustion series. The car competed at Formula Student Italy and carried forward structural and drivetrain refinements from RZ10 while improving ergonomics and systems integration.",
        specs: { weight: "280 kg", power: "70 HP", acceleration: "—", topSpeed: "120 kmph" },
        achievements: [
          "Competed at Formula Student Italy",
          "Launch of RZX combustion generation"
        ]
      },
      2012: {
        images: [
          "assets/images/prototypes/RZ-X2-C/1.webp",
        ],
        changes: [
          "RZX2 — Second generation RZX combustion platform",
          "Competed at Formula Student Italy",
          "Completed technical inspection in 17 minutes (fastest at event)",
          "Refined ergonomics and systems integration",
          "MOTEC M800 ECU retained"
        ],
        desc: "RZX2 represented Ashwa Racing at Formula Student Italy in 2012. The car achieved 2nd place in the Cost Report and set the fastest technical inspection clearance at the event, demonstrating high design maturity and documentation precision.",
        specs: { weight: "302 kg", power: "~75 HP", acceleration: "—", topSpeed: "120 kmph" },
        achievements: [
          "2nd Place — Cost Report (Formula Student Italy)",
          "Fastest Technical Inspection Clearance (17 minutes)",
          "Competed at Formula Student Italy"
        ]
      },
      2014: {
        images: [
          // "assets/images/prototypes/RZ-X4-C/1.webp",
          // "assets/images/prototypes/RZ-X4-C/2.webp",
          "assets/images/prototypes/RZ-X4-C/3.webp",
          // "assets/images/prototypes/RZ-X4-C/4.webp",
          // "assets/images/prototypes/RZ-X4-C/5.webp",
          // "assets/images/prototypes/RZ-X4-C/6.webp",
          // "assets/images/prototypes/RZ-X4-C/7.webp",
          "assets/images/prototypes/RZ-X4-C/8.webp",
          // "assets/images/prototypes/RZ-X4-C/9.webp",
          // "assets/images/prototypes/RZ-X4-C/10.webp",
          // "assets/images/prototypes/RZ-X4-C/11.webp",
        ],
        changes: [
          "RZX4 — Fourth generation RZX combustion platform",
          "Secured Top Place in Design (2014 Combustion Prototype)",
          "Refined 4130 SAE tubular spaceframe",
          "Aluminium honeycomb bulkhead + FRP panels",
          "Enhanced intake RAM and stainless 4-2-1 exhaust",
          "Driver-focused ergonomic custom seat design"
        ],
        desc: "RZX4 marked a major achievement in Ashwa Racing's combustion lineage by securing the top place in the Design event in 2014. The platform reflected engineering maturity, documentation strength, and optimized subsystem integration across chassis, suspension, drivetrain, and electronics.",
        specs: { weight: "300 kg", power: "70 HP", acceleration: "4.21s", topSpeed: "120 kmph" },
        achievements: [
          "Top Place — Design Event (2014 Combustion Prototype)",
          "Successful Formula Student campaign"
        ],
        badge: "DESIGN WINNER"
      },
      2015: {
        images: [
          // "assets/images/prototypes/RZ-X5-C/1.webp",
          // "assets/images/prototypes/RZ-X5-C/2.webp",
          // "assets/images/prototypes/RZ-X5-C/3.webp",
          // "assets/images/prototypes/RZ-X5-C/4.webp",
          // "assets/images/prototypes/RZ-X5-C/5.webp",
          // "assets/images/prototypes/RZ-X5-C/6.webp",
          // "assets/images/prototypes/RZ-X5-C/7.webp",
          // "assets/images/prototypes/RZ-X5-C/8.webp",
          // "assets/images/prototypes/RZ-X5-C/9.webp",
          // "assets/images/prototypes/RZ-X5-C/10.webp",
          "assets/images/prototypes/RZ-X5-C/11.webp"
        ],
        changes: [
          "RZX5 — Fifth generation RZX combustion platform",
          "Top Place in Design (2015 Combustion Prototype)",
          "2nd in Endurance",
          "2nd in Fuel Efficiency",
          "4th Overall finish",
          "Refined suspension geometry and weight distribution",
          "Mature competition-ready systems integration"
        ],
        desc: "RZX5 marked one of Ashwa Racing's strongest competitive years in combustion. Securing Top Place in Design along with podium finishes in Endurance and Fuel Efficiency, the 2015 prototype demonstrated a balanced, highly integrated engineering platform.",
        specs: { weight: "310 kg", power: "~75 HP", acceleration: "—", topSpeed: "120 kmph" },
        achievements: [
          "Top Place — Design Event (2015 Combustion)",
          "2nd — Endurance",
          "2nd — Fuel Efficiency",
          "4th Overall"
        ],
        badge: "MULTI-EVENT PODIUM"
      },
      2016: {
        images: [
          // "assets/images/prototypes/RZ-X6-C/EVENT/1.webp",
          // "assets/images/prototypes/RZ-X6-C/EVENT/2.webp",
          // "assets/images/prototypes/RZ-X6-C/EVENT/3.webp",
          // "assets/images/prototypes/RZ-X6-C/EVENT/4.webp",
          // "assets/images/prototypes/RZ-X6-C/EVENT/5.webp",
          // "assets/images/prototypes/RZ-X6-C/EVENT/6.webp",
          // "assets/images/prototypes/RZ-X6-C/EVENT/7.webp",
          "assets/images/prototypes/RZ-X6-C/EVENT/8.webp",
          // "assets/images/prototypes/RZ-X6-C/PRE-EVENT/1.webp",
          // "assets/images/prototypes/RZ-X6-C/PRE-EVENT/2.webp",
          // "assets/images/prototypes/RZ-X6-C/PRE-EVENT/3.webp",
          // "assets/images/prototypes/RZ-X6-C/PRE-EVENT/4.webp",
          "assets/images/prototypes/RZ-X6-C/PRE-EVENT/5.webp",
          // "assets/images/prototypes/RZ-X6-C/PRE-EVENT/6.webp",
          // "assets/images/prototypes/RZ-X6-C/PRE-EVENT/7.webp",
          // "assets/images/prototypes/RZ-X6-C/PRE-EVENT/8.webp",
          // "assets/images/prototypes/RZ-X6-C/PRE-EVENT/9.webp",
          // "assets/images/prototypes/RZ-X6-C/PRE-EVENT/10.webp",
        ],
        changes: [
          "RZX6 — Sixth generation combustion prototype",
          "6th Place in Design Event",
          "Improved power-to-weight ratio",
          "Refined suspension and drivetrain package",
          "Enhanced cooling and ECU integration"
        ],
        desc: "RZX6 represented a major performance jump in the combustion platform. With a lighter 250 kg chassis and a strong 6th place Design finish, the 2016 prototype reflected improved systems integration and competitive engineering maturity.",
        specs: { weight: "250 kg", power: "~53 HP", acceleration: "—", topSpeed: "110 kmph" },
        achievements: [
          "6th — Design Event",
          "Total Points: 235",
          "Design Points: 100"
        ],
        badge: "DESIGN TOP 10"
      },
      2017: {
        images: [
          // "assets/images/prototypes/RZ-X7-C/EVENT/1.webp",
          // "assets/images/prototypes/RZ-X7-C/EVENT/2.webp",
          "assets/images/prototypes/RZ-X7-C/EVENT/3.webp",
          // "assets/images/prototypes/RZ-X7-C/EVENT/4.webp",
          "assets/images/prototypes/RZ-X7-C/EVENT/5.webp",
          // "assets/images/prototypes/RZ-X7-C/EVENT/6.webp",
          // "assets/images/prototypes/RZ-X7-C/EVENT/7.webp",
          // "assets/images/prototypes/RZ-X7-C/EVENT/8.webp",
          // "assets/images/prototypes/RZ-X7-C/EVENT/9.webp",
          // "assets/images/prototypes/RZ-X7-C/EVENT/10.webp",
          // "assets/images/prototypes/RZ-X7-C/POST-EVENT/1.webp",
          // "assets/images/prototypes/RZ-X7-C/POST-EVENT/2.webp",
          // "assets/images/prototypes/RZ-X7-C/POST-EVENT/3.webp",
          // "assets/images/prototypes/RZ-X7-C/POST-EVENT/4.webp",
          // "assets/images/prototypes/RZ-X7-C/POST-EVENT/5.webp",
          "assets/images/prototypes/RZ-X7-C/POST-EVENT/6.webp",
          "assets/images/prototypes/RZ-X7-C/POST-EVENT/7.webp",
          // "assets/images/prototypes/RZ-X7-C/POST-EVENT/8.webp",
          // "assets/images/prototypes/RZ-X7-C/POST-EVENT/9.webp",
        ],
        changes: [
          "RZX7 — Seventh generation combustion prototype",
          "Weight reduced to 230 kg",
          "Significant acceleration improvement (0–75 in 3.90s)",
          "Top speed increased to 120 kmph",
          "Refined intake and exhaust system"
        ],
        desc: "RZX7 marked a strong performance year for the combustion platform with improved acceleration, lighter chassis architecture and enhanced drivetrain efficiency. Competing at both Formula Italy and Formula Bharat, the team demonstrated international competitiveness.",
        specs: { weight: "230 kg", power: "73 HP", acceleration: "3.90s", topSpeed: "120 kmph" },
        achievements: [
          "Italy — Rank 11 (224.20 pts)",
          "Bharat — Rank 25 (262.09 pts)"
        ],
        badge: "PERFORMANCE UPGRADE"
      },
      2018: {
        images: [
          // "assets/images/prototypes/RZ-X8-C/EVENT/1.webp",
          "assets/images/prototypes/RZ-X8-C/EVENT/2.webp",
          // "assets/images/prototypes/RZ-X8-C/EVENT/3.webp",
          "assets/images/prototypes/RZ-X8-C/EVENT/4.webp",
          // "assets/images/prototypes/RZ-X8-C/EVENT/5.webp",
          // "assets/images/prototypes/RZ-X8-C/EVENT/6.webp",
          // "assets/images/prototypes/RZ-X8-C/EVENT/7.webp",
          // "assets/images/prototypes/RZ-X8-C/EVENT/8.webp",
          // "assets/images/prototypes/RZ-X8-C/EVENT/9.webp",
          // "assets/images/prototypes/RZ-X8-C/EVENT/10.webp",
          "assets/images/prototypes/RZ-X8-C/POST-EVENT/1.webp",
          // "assets/images/prototypes/RZ-X8-C/POST-EVENT/2.webp",
          // "assets/images/prototypes/RZ-X8-C/POST-EVENT/3.webp",
          // "assets/images/prototypes/RZ-X8-C/POST-EVENT/4.webp",
          // "assets/images/prototypes/RZ-X8-C/POST-EVENT/5.webp",
          // "assets/images/prototypes/RZ-X8-C/POST-EVENT/6.webp",
          "assets/images/prototypes/RZ-X8-C/POST-EVENT/7.webp",
          // "assets/images/prototypes/RZ-X8-C/POST-EVENT/8.webp",
          // "assets/images/prototypes/RZ-X8-C/POST-EVENT/9.webp",
          // "assets/images/prototypes/RZ-X8-C/POST-EVENT/10.webp",
        ],
        changes: [
          "RZX8C — Eighth generation combustion prototype",
          "Fastest student combustion car in India (season highlight)",
          "Improved dynamic event scoring",
          "Strong Bharat overall finish (8th)",
          "Refined chassis and powertrain integration"
        ],
        desc: "RZX8C strengthened Ashwa Racing's combustion platform with consistent power output and improved event performance. The car secured a Top 10 overall finish at Formula Bharat and was recognized as one of the fastest combustion student cars in India that season.",
        specs: { weight: "260 kg", power: "73 HP", acceleration: "3.90s", topSpeed: "120 kmph" },
        achievements: [
          "Bharat — Rank 8 (402.10 pts)",
          "Fastest Combustion Acceleration — 4.259s",
          "Italy Participation"
        ],
        badge: "TOP 10 OVERALL"
      },
      2019: {
        images: [
          // "assets/images/prototypes/RZ-X9-C/event/1.webp",
          // "assets/images/prototypes/RZ-X9-C/event/2.webp",
          // "assets/images/prototypes/RZ-X9-C/event/3.webp",
          // "assets/images/prototypes/RZ-X9-C/event/4.webp",
          // "assets/images/prototypes/RZ-X9-C/event/5.webp",
          "assets/images/prototypes/RZ-X9-C/event/6.webp",
          // "assets/images/prototypes/RZ-X9-C/event/7.webp",
          // "assets/images/prototypes/RZ-X9-C/event/8.webp",
          "assets/images/prototypes/RZ-X9-C/event/9.webp",
          // "assets/images/prototypes/RZ-X9-C/event/10.webp",
          // "assets/images/prototypes/RZ-X9-C/preevent/1.webp",
          // "assets/images/prototypes/RZ-X9-C/preevent/2.webp",
          "assets/images/prototypes/RZ-X9-C/preevent/3.webp",
          "assets/images/prototypes/RZ-X9-C/preevent/4.webp",
          // "assets/images/prototypes/RZ-X9-C/preevent/5.webp",
          // "assets/images/prototypes/RZ-X9-C/preevent/6.webp",
          // "assets/images/prototypes/RZ-X9-C/preevent/7.webp",
          // "assets/images/prototypes/RZ-X9-C/preevent/8.webp",
          // "assets/images/prototypes/RZ-X9-C/preevent/9.webp",
          // "assets/images/prototypes/RZ-X9-C/preevent/10.webp",
          // "assets/images/prototypes/RZ-X9-C/preevent/11.webp",
          // "assets/images/prototypes/RZ-X9-C/postevent/1.webp",
          // "assets/images/prototypes/RZ-X9-C/postevent/2.webp",
          // "assets/images/prototypes/RZ-X9-C/postevent/3.webp",
          // "assets/images/prototypes/RZ-X9-C/postevent/4.webp",
          // "assets/images/prototypes/RZ-X9-C/postevent/5.webp",
          // "assets/images/prototypes/RZ-X9-C/postevent/6.webp",
          "assets/images/prototypes/RZ-X9-C/postevent/7.webp",
          // "assets/images/prototypes/RZ-X9-C/postevent/8.webp",
          // "assets/images/prototypes/RZ-X9-C/postevent/9.webp",
          // "assets/images/prototypes/RZ-X9-C/postevent/10.webp",
        ],
        changes: [
          "RZX9C — Ninth generation combustion prototype",
          "Improved static event performance",
          "Top 10 static rank (9th overall static)",
          "Refined chassis & driveline integration"
        ],
        desc: "RZX9C focused on strong static performance, achieving a top 10 static rank at Formula Bharat. The platform maintained consistent powertrain architecture while refining design and cost presentation.",
        specs: { weight: "260 kg", power: "73 HP", acceleration: "3.90s", topSpeed: "100 kmph" },
        achievements: [
          "Overall Rank 13 — 249.97 pts",
          "Static Rank 9",
          "Design Event — 110 pts"
        ],
        badge: "STATIC STRENGTH"
      }
    }
  },

  hyb: {
    title: "Hybrid Powertrain Development",
    years: {
      2015: {
        images: [
          "assets/images/prototypes/RZ-X5-H/event/1.webp",
          // "assets/images/prototypes/RZ-X5-H/preevent/1.webp",
          // "assets/images/prototypes/RZ-X5-H/preevent/2.webp",
          // "assets/images/prototypes/RZ-X5-H/preevent/3.webp",
          "assets/images/prototypes/RZ-X5-H/preevent/4.webp",
          // "assets/images/prototypes/RZ-X5-H/preevent/5.webp",
          // "assets/images/prototypes/RZ-X5-H/preevent/6.webp",
          // "assets/images/prototypes/RZ-X5-H/preevent/7.webp",
          // "assets/images/prototypes/RZ-X5-H/preevent/8.webp",
          // "assets/images/prototypes/RZ-X5-H/preevent/9.webp",
          // "assets/images/prototypes/RZ-X5-H/preevent/10.webp",
        ],
        changes: [
          "First ever Hybrid prototype",
          "Transition from pure combustion to hybrid architecture",
          "Integrated lithium-ion battery pack (75 cells)",
          "International competition debut — USA"
        ],
        desc: "Ashwa Racing's first Hybrid prototype marked a major technological leap. Competing at Formula Hybrid New Hampshire, the team placed in the top ten overall, successfully integrating combustion and electric subsystems into a single competitive platform.",
        specs: { weight: "310 kg", power: "45 BHP", acceleration: "—", topSpeed: "74 kmph" },
        achievements: [
          "Top 10 Overall — Formula Hybrid New Hampshire",
          "First International Hybrid Entry",
          "Successful Hybrid System Integration"
        ],
        badge: "HYBRID DEBUT"
      },
      2016: {
        images: [
          // "assets/images/prototypes/RZ-X6-H/event/1.webp",
          // "assets/images/prototypes/RZ-X6-H/event/2.webp",
          // "assets/images/prototypes/RZ-X6-H/event/3.webp",
          // "assets/images/prototypes/RZ-X6-H/event/4.webp",
          "assets/images/prototypes/RZ-X6-H/event/5.webp",
          // "assets/images/prototypes/RZ-X6-H/event/6.webp",
          // "assets/images/prototypes/RZ-X6-H/event/7.webp",
          // "assets/images/prototypes/RZ-X6-H/event/8.webp",
          "assets/images/prototypes/RZ-X6-H/event/9.webp",
          // "assets/images/prototypes/RZ-X6-H/event/10.webp",
          // "assets/images/prototypes/RZ-X6-H/postevent/1.webp",
          "assets/images/prototypes/RZ-X6-H/postevent/2.webp",
          // "assets/images/prototypes/RZ-X6-H/postevent/3.webp",
          // "assets/images/prototypes/RZ-X6-H/postevent/4.webp",
          // "assets/images/prototypes/RZ-X6-H/postevent/5.webp",
          "assets/images/prototypes/RZ-X6-H/postevent/6.webp",
          // "assets/images/prototypes/RZ-X6-H/postevent/7.webp",
          // "assets/images/prototypes/RZ-X6-H/postevent/8.webp",
          // "assets/images/prototypes/RZ-X6-H/postevent/9.webp",
          // "assets/images/prototypes/RZ-X6-H/postevent/10.webp",
        ],
        changes: [
          "RZX6H — Refined hybrid architecture",
          "Lean manufacturing optimizations",
          "Improved static event strategy",
          "Weight reduction vs previous hybrid"
        ],
        desc: "RZX6H marked a major competitive leap in the hybrid programme. With improved production techniques and optimized manufacturing processes, the team secured 4th overall at Formula Hybrid New Hampshire.",
        specs: { weight: "280 kg", power: "70 HP", acceleration: "—", topSpeed: "—" },
        achievements: [
          "4th Overall — Formula Hybrid",
          "Design Event — 2nd Place",
          "Project Management — 2nd Place"
        ],
        badge: "HYBRID BREAKTHROUGH"
      },
      2017: {
        images: [
          // "assets/images/prototypes/RZ-X7-H/event/1.webp",
          // "assets/images/prototypes/RZ-X7-H/event/2.webp",
          // "assets/images/prototypes/RZ-X7-H/event/3.webp",
          // "assets/images/prototypes/RZ-X7-H/event/4.webp",
          // "assets/images/prototypes/RZ-X7-H/event/5.webp",
          // "assets/images/prototypes/RZ-X7-H/event/6.webp",
          // "assets/images/prototypes/RZ-X7-H/event/7.webp",
          // "assets/images/prototypes/RZ-X7-H/event/8.webp",
          "assets/images/prototypes/RZ-X7-H/event/9.webp",
          // "assets/images/prototypes/RZ-X7-H/event/10.webp",
          // "assets/images/prototypes/RZ-X7-H/preevent/1.webp",
          // "assets/images/prototypes/RZ-X7-H/preevent/2.webp",
          // "assets/images/prototypes/RZ-X7-H/preevent/3.webp",
          "assets/images/prototypes/RZ-X7-H/preevent/4.webp",
          // "assets/images/prototypes/RZ-X7-H/preevent/5.webp",
        ],
        changes: [
          "RZX7H — Performance-optimized hybrid platform",
          "Acceleration dominance in Electric class",
          "Refined endurance reliability",
          "Improved event execution strategy"
        ],
        desc: "RZX7H marked Ashwa Racing's first major hybrid podium at Formula Hybrid New Hampshire, finishing 2nd overall with strong dominance in dynamic events.",
        specs: { weight: "—", power: "—", acceleration: "4.05s", topSpeed: "100 kmph" },
        achievements: [
          "2nd Overall — Formula Hybrid",
          "1st — Acceleration (Electric)",
          "2nd — Autocross",
          "2nd — Endurance",
          "2nd — Project Management"
        ],
        badge: "FIRST HYBRID PODIUM"
      },
      2018: {
        images: [
          "assets/images/prototypes/RZ-X8-H/event/1.webp",
          // "assets/images/prototypes/RZ-X8-H/event/2.webp",
          // "assets/images/prototypes/RZ-X8-H/event/3.webp",
          // "assets/images/prototypes/RZ-X8-H/event/4.webp",
          // "assets/images/prototypes/RZ-X8-H/event/5.webp",
          // "assets/images/prototypes/RZ-X8-H/event/6.webp",
          // "assets/images/prototypes/RZ-X8-H/event/7.webp",
          // "assets/images/prototypes/RZ-X8-H/event/8.webp",
          // "assets/images/prototypes/RZ-X8-H/event/9.webp",
          // "assets/images/prototypes/RZ-X8-H/event/10.webp",
          "assets/images/prototypes/RZ-X8-H/event/11.webp",
          // "assets/images/prototypes/RZ-X8-H/event/12.webp",
          // "assets/images/prototypes/RZ-X8-H/event/13.webp",
          "assets/images/prototypes/RZ-X8-H/event/14.webp",
          "assets/images/prototypes/RZ-X8-H/preevent/1.webp",
          // "assets/images/prototypes/RZ-X8-H/preevent/2.webp",
          // "assets/images/prototypes/RZ-X8-H/preevent/3.webp",
          "assets/images/prototypes/RZ-X8-H/preevent/4.webp",
          // "assets/images/prototypes/RZ-X8-H/preevent/5.webp",
          "assets/images/prototypes/RZ-X8-H/preevent/6.webp",
          "assets/images/prototypes/RZ-X8-H/preevent/7.webp",
          // "assets/images/prototypes/RZ-X8-H/preevent/8.webp",
          // "assets/images/prototypes/RZ-X8-H/preevent/9.webp",
          // "assets/images/prototypes/RZ-X8-H/preevent/10.webp",
          // "assets/images/prototypes/RZ-X8-H/postevent/1.webp",
          // "assets/images/prototypes/RZ-X8-H/postevent/2.webp",
        ],
        changes: [
          "RZX8H — Second-generation competitive hybrid platform",
          "2nd Overall at Formula Hybrid New Hampshire",
          "Strong static + dynamic event balance",
          "Improved accumulator packaging and hybrid integration"
        ],
        desc: "RZX8H reinforced Ashwa Racing's hybrid dominance with another 2nd Overall finish at Formula Hybrid New Hampshire. The platform demonstrated improved systems integration, high static scores, and consistent dynamic performance.",
        specs: { weight: "300 kg", power: "73 HP", acceleration: "4.05s", topSpeed: "100 kmph" },
        achievements: [
          "2nd Overall — Formula Hybrid",
          "2nd — Design (183.24/200)",
          "2nd — Project Management (144.29/150)",
          "2nd — Acceleration",
          "2nd — Endurance"
        ],
        badge: "CONSISTENT PODIUM"
      },
      2019: {
        images: [
          // "assets/images/prototypes/RZ-X9-H/event/1.webp",
          "assets/images/prototypes/RZ-X9-H/event/2.webp",
          // "assets/images/prototypes/RZ-X9-H/event/3.webp",
          // "assets/images/prototypes/RZ-X9-H/event/4.webp",
          // "assets/images/prototypes/RZ-X9-H/event/5.webp",
          // "assets/images/prototypes/RZ-X9-H/event/6.webp",
          "assets/images/prototypes/RZ-X9-H/event/7.webp",
          // "assets/images/prototypes/RZ-X9-H/event/8.webp",
          // "assets/images/prototypes/RZ-X9-H/event/9.webp",
          // "assets/images/prototypes/RZ-X9-H/event/10.webp",
          "assets/images/prototypes/RZ-X9-H/event/11.webp",
          // "assets/images/prototypes/RZ-X9-H/event/12.webp",
          // "assets/images/prototypes/RZ-X9-H/preevent/1.webp",
          // "assets/images/prototypes/RZ-X9-H/preevent/2.webp",
          "assets/images/prototypes/RZ-X9-H/preevent/3.webp",
          // "assets/images/prototypes/RZ-X9-H/preevent/4.webp",
          // "assets/images/prototypes/RZ-X9-H/preevent/5.webp",
        ],
        changes: [
          "3rd Overall — Formula Hybrid 2019",
          "1st Place — Project Management (150/150)",
          "2nd Place — Design (184.62/200)",
          "Refined accumulator packaging and systems integration"
        ],
        desc: "The 2019 Hybrid secured 3rd Overall at Formula Hybrid New Hampshire. With a perfect 150/150 in Project Management and strong Design performance, the platform reflected a highly mature development process and refined hybrid integration.",
        specs: { weight: "300 kg", power: "73 HP", acceleration: "—", topSpeed: "100 kmph" },
        achievements: [
          "3rd Overall — Formula Hybrid",
          "1st — Project Management (150/150)",
          "2nd — Design (184.62/200)"
        ],
        badge: "PROJECT MANAGEMENT MASTERCLASS"
      }
    }
  },

  hyp: {
    title: "Hyperloop Pod Development",
    years: {
      2023: {
        images: ["assets/images/team/Hyperloop.webp"],
        changes: ["First prototype — competed at ETH Zurich"],
        desc: "Ashwa's entry into the Hyperloop space — a full pod prototype developed and tested for international-level competition at ETH Zurich.",
        achievements: ["First foray into Hyperloop technology"]
      }
    }
  },

  ev: {
    title: "Next-Generation Electric Prototype",
    years: {
      2026: {
        images: ["assets/images/prototypes/XX5C.jpg"],
        changes: ["Coming soon!"],
        desc: "Electric platform engineered for safety, efficiency, and energy density — designed to pass the most rigorous scrutineering.",
        achievements: ["We strive to win!"]
      }
    }
  },

  dv: {
    title: "Autonomous & Driverless Platform",
    years: {
      2027: {
        images: ["assets/images/prototypes/XX5C.jpg"],
        changes: ["Coming soon!"],
        desc: "The driverless programme builds on Ashwa's existing vehicle platforms, layering perception, planning, and control systems for autonomous competition.",
        achievements: ["We strive to win!"]
      }
    }
  }
};

/* ============================================================
   RUNTIME — fixed: render token, hoisted helpers, no viewer in reveal
   ============================================================ */

"use strict";

// ─── State ────────────────────────────────────────────────────
let activeProgKey    = "cv";
let activeYear       = null;
let slideshowTimer   = null;
let renderToken      = 0;      // incremented every renderYear call;
                               // stale async callbacks check this before acting

// ─── DOM refs ─────────────────────────────────────────────────
const viewer      = document.getElementById("prog-viewer");
const progCode    = document.getElementById("prog-code");
const progTag     = document.getElementById("prog-tag");
const progTitle   = document.getElementById("prog-title");
const progYears   = document.getElementById("prog-years");
const progImage   = document.getElementById("prog-image");
const progContent = document.getElementById("prog-content");
const stripe      = document.querySelector(".proj-hero-stripe");

// Set transition once on the element, never inside a loop/interval
progImage.style.transition = "opacity 0.25s ease";

// ─── Hoisted helpers ──────────────────────────────────────────

// Preload an array of image paths; resolve with only those that loaded
function preloadImages(paths) {
  return Promise.all(
    paths.map(p => new Promise(resolve => {
      const img   = new Image();
      img.onload  = () => resolve(p);
      img.onerror = () => resolve(null);
      img.src     = p;
    }))
  ).then(r => r.filter(Boolean));
}

// Swap the visible image with a fade, but only if the token still matches
function swapImage(src, alt, token) {
  if (token !== renderToken) return;
  progImage.style.opacity = "0";
  setTimeout(() => {
    if (token !== renderToken) return;
    progImage.src = src;
    progImage.alt = alt;
    progImage.style.opacity = "1";
  }, 260);
}

// ─── Render year ──────────────────────────────────────────────
function renderYear(progKey, year) {
  const data     = projectData[progKey].years[year];
  const identity = PROGRAMMES[progKey];

  // Invalidate all in-flight async work from previous calls
  renderToken += 1;
  const myToken = renderToken;

  // Kill previous slideshow immediately
  if (slideshowTimer) { clearInterval(slideshowTimer); slideshowTimer = null; }

  // ── Text content — render synchronously, no waiting ──
  const spec = data.specs || {};

  // Only show specs block if at least one value is a real measurement
  const hasRealSpecs = Object.values(spec).some(
    v => v && v !== "—" && v !== "-" && v !== ""
  );
  const specHTML = hasRealSpecs ? `
    <div class="prog-specs">
      <div class="prog-spec"><span>Weight</span><strong>${spec.weight  || "—"}</strong></div>
      <div class="prog-spec"><span>Power</span><strong>${spec.power   || "—"}</strong></div>
      <div class="prog-spec"><span>0–100</span><strong>${spec.acceleration || "—"}</strong></div>
      <div class="prog-spec"><span>Top Speed</span><strong>${spec.topSpeed || "—"}</strong></div>
    </div>` : "";

  const badgeHTML = data.badge
    ? `<div class="prog-badge">${data.badge}</div>` : "";

  const changeItems = data.changes.map(c => `<li>${c}</li>`).join("");
  const achItems    = data.achievements.map(a => `<li>${a}</li>`).join("");

  progContent.innerHTML = `
    <div>
      <div class="prog-changes-label">Updates for ${year}</div>
      <ul class="prog-changes">${changeItems}</ul>
    </div>
    <p class="prog-desc">${data.desc}</p>
    ${specHTML}
    ${badgeHTML}
    <div>
      <div class="prog-ach-label">Achievements</div>
      <ul class="prog-achievements">${achItems}</ul>
    </div>`;

  // Update active year button
  progYears.querySelectorAll(".year-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.year === String(year));
  });
  activeYear = year;

  // ── Images — async, guarded by token ──
  const rawImages = data.images || (data.image ? [data.image] : []);

  // Fade out current image while we wait
  progImage.style.opacity = "0";

  preloadImages(rawImages).then(valid => {
    if (myToken !== renderToken) return;  // superseded — bail out

    if (!valid.length) {
      // No valid images — just clear
      progImage.src = "";
      progImage.style.opacity = "1";
      return;
    }

    let idx = 0;
    // Show first image immediately (swapImage handles the fade-in)
    swapImage(valid[0], `${identity.tag} — ${year}`, myToken);

    // Start slideshow only if there are multiple images
    if (valid.length > 1) {
      slideshowTimer = setInterval(() => {
        if (myToken !== renderToken) {
          clearInterval(slideshowTimer);
          slideshowTimer = null;
          return;
        }
        idx = (idx + 1) % valid.length;
        swapImage(valid[idx], `${identity.tag} — ${year}`, myToken);
      }, 3500);
    }
  });
}

// ─── Switch programme ─────────────────────────────────────────
function switchProgramme(progKey) {
  const identity = PROGRAMMES[progKey];
  const proto    = projectData[progKey];
  const years    = Object.keys(proto.years).map(Number).sort((a, b) => b - a);

  activeProgKey = progKey;

  viewer.style.transition = "opacity 0.18s ease";
  viewer.style.opacity    = "0";

  setTimeout(() => {
    document.documentElement.style.setProperty("--prog-accent", identity.accent);

    progCode.textContent  = identity.code;
    progTag.textContent   = identity.tag;
    progTitle.textContent = proto.title;

    if (stripe) stripe.dataset.prog = progKey;

    // Rebuild year buttons
    progYears.innerHTML = "";
    years.forEach(year => {
      const btn       = document.createElement("button");
      btn.className   = "year-btn";
      btn.textContent = year;
      btn.dataset.year = year;
      btn.addEventListener("click", () => renderYear(progKey, year));
      progYears.appendChild(btn);
    });

    document.querySelectorAll(".prog-nav-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.prog === progKey);
    });

    renderYear(progKey, years[0]);

    viewer.style.opacity = "1";
  }, 180);
}

// ─── Programme nav ────────────────────────────────────────────
document.querySelectorAll(".prog-nav-btn").forEach(btn => {
  btn.addEventListener("click", () => switchProgramme(btn.dataset.prog));
});

// ─── Overview cards ───────────────────────────────────────────
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
        ${years.length > 1 ? `${years[years.length-1]} – ${years[0]}` : years[0]}
        · ${years.length} season${years.length !== 1 ? "s" : ""}
      </div>
      <i class="fas fa-arrow-up-right prog-card-arrow"></i>`;

    function activate() {
      switchProgramme(key);
      viewer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    card.addEventListener("click", activate);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") activate();
    });
    grid.appendChild(card);
  });
}

// ─── Scroll reveal — cards only, never the viewer ─────────────
// Targeting .prog-viewer here would set opacity:0 on it and race
// against switchProgramme's own fade, causing a flash on load.
function initReveal() {
  const cards = document.querySelectorAll(".prog-card");
  cards.forEach((el, i) => {
    el.style.opacity   = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition =
      `opacity 0.5s var(--ease-expo) ${i * 0.06}s,
       transform 0.5s var(--ease-expo) ${i * 0.06}s`;
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.opacity   = "1";
      e.target.style.transform = "translateY(0)";
      obs.unobserve(e.target);
    });
  }, { threshold: 0.08 });

  cards.forEach(el => obs.observe(el));
}

// ─── Init ─────────────────────────────────────────────────────
switchProgramme("cv");
buildOverviewCards();
initReveal();