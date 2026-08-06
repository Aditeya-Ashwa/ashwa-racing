/* ============================================================
   ASHWA RACING — projects.js  (redesigned)
   Preserves all original data structures and interaction logic.
   New additions: prog-index strips, stat counter, year badge,
   slide counter, improved fade/token system.
   ============================================================ */

"use strict";

/* ────────────────────────────────────────────────────────────
   PROGRAMME IDENTITY
──────────────────────────────────────────────────────────── */
const PROGRAMMES = {
  cv:  { code: "CV",  tag: "Combustion Vehicle",   accent: "#e8001d", cssVar: "--cv-accent"  },
  ev:  { code: "EV",  tag: "Electric Vehicle",     accent: "#00c2a8", cssVar: "--ev-accent"  },
  hyb: { code: "HYB", tag: "Hybrid Vehicle",       accent: "#f59e0b", cssVar: "--hyb-accent" },
  hyp: { code: "HYL", tag: "Hyperloop",            accent: "#7c3aed", cssVar: "--hyp-accent" },
  dv:  { code: "DRV", tag: "Driverless Vehicle",   accent: "#3b82f6", cssVar: "--dv-accent"  }
};

/* ────────────────────────────────────────────────────────────
   PROJECT DATA  (unchanged from original)
──────────────────────────────────────────────────────────── */
const projectData = {
  cv: {
    title: "Combustion Platform",
    years: {
      2005: {
        images: [
          "assets/images/prototypes/RZ-05-CV/Copy_of_Image001.jpg",
          "assets/images/prototypes/RZ-05-CV/170209_124222964312433_1281288_o.jpg",
          "assets/images/prototypes/RZ-05-CV/Copy_of_05.PNG"
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
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-06-C/event/4.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-06-C/event/6.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-06-C/event/9.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-06-C/event/11.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-06-C/event/13.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-06-C/event/14.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-06-C/event/21.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-06-C/event/22.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-06-C/postevent/2.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-06-C/postevent/3.jpg",
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
          "assets/images/prototypes/RZ-07-CV/DSC00290.JPG",
          "assets/images/prototypes/RZ-07-CV/DSC00408.JPG",
          "assets/images/prototypes/RZ-07-CV/DSC00410.JPG",
          "assets/images/prototypes/RZ-07-CV/DSC00414.JPG",
          "assets/images/prototypes/RZ-07-CV/DSC00416.JPG",
          "assets/images/prototypes/RZ-07-CV/DSC00417.JPG",
          "assets/images/prototypes/RZ-07-CV/DSC00429.JPG",
          "assets/images/prototypes/RZ-07-CV/DSC00431.JPG",
          "assets/images/prototypes/RZ-07-CV/DSC00539.JPG",
          "assets/images/prototypes/RZ-07-CV/DSC00542.JPG"
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
          "assets/images/prototypes/RZ-08-CV/IMG_1270.JPG",
          "assets/images/prototypes/RZ-08-CV/IMG_1272.JPG",
          "assets/images/prototypes/RZ-08-CV/IMG_1274.JPG",
          "assets/images/prototypes/RZ-08-CV/IMG_1277.JPG",
          "assets/images/prototypes/RZ-08-CV/IMG_1281.JPG",
          "assets/images/prototypes/RZ-08-CV/IMG_1289.JPG",
          "assets/images/prototypes/RZ-08-CV/IMG_1292.JPG",
          "assets/images/prototypes/RZ-08-CV/IMG_1297.JPG",
          "assets/images/prototypes/RZ-08-CV/IMG_1300.JPG",
          "assets/images/prototypes/RZ-08-CV/IMG_1304.JPG"
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
          "assets/images/prototypes/RZ-09-CV/1_(1).jpg",
          "assets/images/prototypes/RZ-09-CV/10.jpg",
          "assets/images/prototypes/RZ-09-CV/3_(1).jpg",
          "assets/images/prototypes/RZ-09-CV/4_(1).jpg",
          "assets/images/prototypes/RZ-09-CV/5_(1).jpg",
          "assets/images/prototypes/RZ-09-CV/6_(1).jpg",
          "assets/images/prototypes/RZ-09-CV/7_(1).jpg",
          "assets/images/prototypes/RZ-09-CV/8_(1).jpg",
          "assets/images/prototypes/RZ-09-CV/2_(1).jpg",
          "assets/images/prototypes/RZ-09-CV/9.jpg"
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
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X-C/1.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X-C/3.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X-C/4.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X-C/6.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X-C/7.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X-C/8.jpg",
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
          "assets/images/prototypes/RZ-11-CV/1_(1).jpg",
          "assets/images/prototypes/RZ-11-CV/2_(1).jpg",
          "assets/images/prototypes/RZ-11-CV/3_(1).jpg",
          "assets/images/prototypes/RZ-11-CV/4_(1).jpg",
          "assets/images/prototypes/RZ-11-CV/5_(1).jpg",
          "assets/images/prototypes/RZ-11-CV/6_(1).jpg",
          "assets/images/prototypes/RZ-11-CV/7_(1).jpg",
          "assets/images/prototypes/RZ-11-CV/8_(1).jpg",
          "assets/images/prototypes/RZ-11-CV/9_(1).jpg"
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
          "assets/images/prototypes/RZ-12-CV/1_(1).jpg",
          "assets/images/prototypes/RZ-12-CV/2_(1).jpg",
          "assets/images/prototypes/RZ-12-CV/3_(1).jpg",
          "assets/images/prototypes/RZ-12-CV/4_(1).jpg",
          "assets/images/prototypes/RZ-12-CV/5_(1).jpg",
          "assets/images/prototypes/RZ-12-CV/6_(1).jpg",
          "assets/images/prototypes/RZ-12-CV/7_(1).jpg",
          "assets/images/prototypes/RZ-12-CV/Copy_of_combustion_2012.JPG"
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
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X4-C/1.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X4-C/2.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X4-C/3.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X4-C/4.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X4-C/5.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X4-C/7.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X4-C/8.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X4-C/10.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X4-C/11.jpg",
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
          "assets/images/prototypes/RZ-15-HYB/1.JPG",
          "assets/images/prototypes/RZ-15-HYB/4.JPG",
          "assets/images/prototypes/RZ-15-HYB/Ashwa_Meets_FS_team_at_MIT_Boston.JPG",
          "assets/images/prototypes/RZ-15-HYB/Copy_of_Hybrid_2015.JPG",
          "assets/images/prototypes/RZ-15-HYB/DSC_0527.JPG",
          "assets/images/prototypes/RZ-15-HYB/RZX5H_Team.JPG",
          "assets/images/prototypes/RZ-15-HYB/RZX5H_event-_NH.jpg",
          "assets/images/prototypes/RZ-15-HYB/Tech_Inspection_rzx5h-USA.jpg",
          "assets/images/prototypes/RZ-15-HYB/10497393_750708631663860_594227355440186879_o.jpg",
          "assets/images/prototypes/RZ-15-HYB/10582973_750727941661929_4341751229555519759_o.jpg"
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
          "assets/images/prototypes/RZ-16-HYB/10.JPG",
          "assets/images/prototypes/RZ-16-HYB/12.JPG",
          "assets/images/prototypes/RZ-16-HYB/2_(1).JPG",
          "assets/images/prototypes/RZ-16-HYB/2016_prototype.jpg",
          "assets/images/prototypes/RZ-16-HYB/3_(1).JPG",
          "assets/images/prototypes/RZ-16-HYB/4_(1).JPG",
          "assets/images/prototypes/RZ-16-HYB/6_(1).JPG",
          "assets/images/prototypes/RZ-16-HYB/7_(1).JPG",
          "assets/images/prototypes/RZ-16-HYB/8_(1).JPG",
          "assets/images/prototypes/RZ-16-HYB/with_the_Indian_flag.jpg"
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
          "assets/images/prototypes/RZ-17-HYB/Acceleration_run_-_4.jpeg",
          "assets/images/prototypes/RZ-17-HYB/Car_with_trophy_-_1.jpeg",
          "assets/images/prototypes/RZ-17-HYB/DSCN3424.JPG",
          "assets/images/prototypes/RZ-17-HYB/DSCN3527.JPG",
          "assets/images/prototypes/RZ-17-HYB/DSCN3548.JPG",
          "assets/images/prototypes/RZ-17-HYB/Design_Event.JPG",
          "assets/images/prototypes/RZ-17-HYB/Endurance.JPG",
          "assets/images/prototypes/RZ-17-HYB/INSPECTION.JPG",
          "assets/images/prototypes/RZ-17-HYB/RZ-X7H.JPG",
          "assets/images/prototypes/RZ-17-HYB/TEAM_WITH_INDIAN_FLAG.JPG"
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
          "assets/images/prototypes/RZ-18-HYB/2018-08-07_10-59-11-01.jpeg",
          "assets/images/prototypes/RZ-18-HYB/IMG_0256.JPG",
          "assets/images/prototypes/RZ-18-HYB/IMG_1774.JPG",
          "assets/images/prototypes/RZ-18-HYB/IMG_1785.JPG",
          "assets/images/prototypes/RZ-18-HYB/IMG_1789.JPG",
          "assets/images/prototypes/RZ-18-HYB/IMG_1804.JPG",
          "assets/images/prototypes/RZ-18-HYB/IMG_2203.JPG",
          "assets/images/prototypes/RZ-18-HYB/IMG_2204.JPG",
          "assets/images/prototypes/RZ-18-HYB/IMG_2234.JPG",
          "assets/images/prototypes/RZ-18-HYB/IMG_2352.JPG"
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
          "assets/images/prototypes/RZ-19-HYB/IMG_7371_edit.jpg",
          "assets/images/prototypes/RZ-19-HYB/IMG_7374.jpg",
          "assets/images/prototypes/RZ-19-HYB/IMG_7376-cropped.jpg",
          "assets/images/prototypes/RZ-19-HYB/IMG_7376.jpg",
          "assets/images/prototypes/RZ-19-HYB/IMG_7378.jpg",
          "assets/images/prototypes/RZ-19-HYB/IMG_7382.jpg",
          "assets/images/prototypes/RZ-19-HYB/IMG_7383.jpg",
          "assets/images/prototypes/RZ-19-HYB/IMG_7384.jpg",
          "assets/images/prototypes/RZ-19-HYB/day_2_(1).JPG",
          "assets/images/prototypes/RZ-19-HYB/indian_consulate_in_NY_(2).JPG"
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
      },
      2020: {
        images: [
          "assets/images/prototypes/RZ-20-CV/IMG_8243compressed.jpg",
          "assets/images/prototypes/RZ-20-CV/IMG_8290compressed.jpg",
          "assets/images/prototypes/RZ-20-CV/IMG_8305compressed.jpg",
          "assets/images/prototypes/RZ-20-CV/IMG_8376compressed.jpg",
          "assets/images/prototypes/RZ-20-CV/IMG_8394compressed.jpg",
          "assets/images/prototypes/RZ-20-CV/IMG_8421compressed.jpg",
          "assets/images/prototypes/RZ-20-CV/IMG_8665compressed.jpg",
          "assets/images/prototypes/RZ-20-CV/IMG_8667compressed.jpg",
          "assets/images/prototypes/RZ-20-CV/IMG_8674compressed.jpg",
          "assets/images/prototypes/RZ-20-CV/IMG_8677compressed.jpg"
        ],
        changes: [
          "RZ-20C — Tenth generation combustion prototype",
          "Overall 14th Rank at Formula Bharat 2020 Virtual Event",
          "3rd Position in Business Presentation (73 pts)",
          "Suzuki GSX-R600 599cc powertrain integration with Yoshimura Muffler",
          "MOTEC M800 Reprogrammable ECU & light interactive dash"
        ],
        desc: "The 2020 Combustion prototype featured a Suzuki GSX-R600 powertrain, custom TIG welded spaceframe, MOTEC M800 ECU, and custom light interactive dashboard. Competing virtually at Formula Bharat 2020, the team secured 3rd in Business Presentation and 14th overall.",
        specs: { weight: "250 kg", power: "73 HP", acceleration: "3.90s", topSpeed: "120 kmph" },
        achievements: [
          "3rd Place — Business Presentation (73 pts)",
          "14th Overall — Formula Bharat 2020 (204 pts)",
          "Cost Event Score — 87.03 pts"
        ],
        badge: "BUSINESS EVENT PODIUM"
      },
      2025: {
        images: [
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX5-C/event/1.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX5-C/event/2.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX5-C/event/4.JPG",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX5-C/event/5.JPG",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX5-C/event/6.JPG",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX5-C/event/7.HEIC",
        ],
        changes: [
          "RZ-XX5-C — Ninth generation combustion prototype",
          "Second Position in Cost Presentation",
          "8th overall finish in Formula Bharat 2025",
        ],
        desc: "RZ-XX5-C focused on dynamic performance, achieving a top 10 overall rank at Formula Bharat. The platform maintained consistent powertrain architecture while refining design and cost presentation.",
        specs: { weight: "260 kg", power: "73 HP", acceleration: "3.90s", topSpeed: "100 kmph" },
        achievements: [
          "Overall Rank 8",
          "Cost Event — 2nd overall"
        ],
        badge: "ENDURANCE RUNNING CAR"
      },
      2026: {
        images: [
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX6-C/event/1.JPG",
          "https://assets.ashwaracing.org/cdn-cgi/image/width=1740,format=avif/images/prototypes/RZ-XX6-C/event/2.JPG",
          "https://assets.ashwaracing.org/cdn-cgi/image/width=1740,format=avif/images/prototypes/RZ-XX6-C/event/3.JPG",
          "https://assets.ashwaracing.org/cdn-cgi/image/width=1740,format=avif/images/prototypes/RZ-XX6-C/postevent/1.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/width=1740,format=avif/images/prototypes/RZ-XX6-C/postevent/2.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/width=1740,format=avif/images/prototypes/RZ-XX6-C/postevent/3.png",
          "https://assets.ashwaracing.org/cdn-cgi/image/width=1740,format=avif/images/prototypes/RZ-XX6-C/postevent/4.png",
          "https://assets.ashwaracing.org/cdn-cgi/image/width=1740,format=avif/images/prototypes/RZ-XX6-C/postevent/5.png",
          "https://assets.ashwaracing.org/cdn-cgi/image/width=1740,format=avif/images/prototypes/RZ-XX6-C/postevent/6.png",
        ],
        changes: [
          "RZ-XX6-C — Fourteenth generation combustion prototype",
          "Continued Ashwa's strong finishes in Static Events",
          "2nd Position in BPP",
          "5th Position in EDP",
          "Overall 6th position in Formula Bharat 2026",
        ],
        desc: "RZ-XX6-C was the first combustion prototype developed by 3rd years, focusing on experimental DAQ and Suspension setups.",
        specs: { weight: "250 kg", power: "70 HP", acceleration: "4.00s", topSpeed: "110 kmph" },
        achievements: [
          "Overall Rank 6 at Formula Bharat 2026",
        ],
        badge: "First 3rd year combustion prototype"
      },
    }
  },

  hyb: {
    title: "Hybrid Powertrain Platform",
    years: {
      2015: {
        images: [
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X5-H/event/1.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X5-H/preevent/2.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X5-H/preevent/3.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X5-H/preevent/4.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X5-H/preevent/6.jpg",
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
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X6-H/event/2.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X6-H/event/3.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X6-H/event/5.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X6-H/event/6.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X6-H/event/7.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X6-H/event/9.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X6-H/postevent/1.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X6-H/postevent/2.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X6-H/postevent/4.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X6-H/postevent/5.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X6-H/postevent/6.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X6-H/postevent/7.jpg",
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
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X7-H/event/2.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X7-H/event/3.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X7-H/event/4.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X7-H/event/5.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X7-H/event/8.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X7-H/event/9.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X7-H/event/10.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X7-H/preevent/1.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X7-H/preevent/2.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X7-H/preevent/4.jpg",
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
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/event/1.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/event/2.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/event/3.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/event/5.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/event/6.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/event/9.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/event/10.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/event/11.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/event/12.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/event/14.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/preevent/1.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/preevent/2.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/preevent/4.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/preevent/5.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/preevent/6.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/preevent/7.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/preevent/8.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X8-H/preevent/10.jpg",
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
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X9-H/event/2.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X9-H/event/5.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X9-H/event/6.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X9-H/event/8.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X9-H/event/10.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X9-H/event/11.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X9-H/preevent/1.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X9-H/preevent/3.webp",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-X9-H/preevent/5.webp",
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
      },
      2020: {
        images: [
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XXH/1.jpg"
        ],
        changes: [
          "RZ-XXH — Fifth generation hybrid prototype",
          "Overall 1st Place Champion at Formula Hybrid 2020 (USA)",
          "1st Place in Project Management (Perfect 150/150 score)",
          "3rd Place in Design Presentation (164/200 score)",
          "Modular Accumulator Container & Electronic Throttle Control"
        ],
        desc: "The RZ-XXH hybrid prototype achieved Ashwa Racing's historic 1st Place Overall victory at Formula Hybrid 2020 (held virtually in New Hampshire, USA). With a flawless 150/150 score in Project Management and 3rd in Design, RZ-XXH demonstrated world-class hybrid engineering and management excellence.",
        specs: { weight: "300 kg", power: "73 HP", acceleration: "4.0s", topSpeed: "100 kmph" },
        achievements: [
          "1st Place OVERALL CHAMPION — Formula Hybrid 2020",
          "1st Place — Project Management (150/150)",
          "3rd Place — Design Presentation (164/200)"
        ],
        badge: "1ST PLACE OVERALL CHAMPION"
      }
    }
  },

  hyp: {
    title: "Hyperloop Pod Platform",
    years: {
      2023: {
        images: [
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX3-HY/event/2.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX3-HY/event/4.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX3-HY/event/5.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX3-HY/event/6.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX3-HY/event/7.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX3-HY/event/9.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX3-HY/event/10.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX3-HY/event/11.jpg",
          "https://assets.ashwaracing.org/cdn-cgi/image/height=1740,format=avif/images/prototypes/RZ-XX3-HY/event/12.jpg",
        ],
        changes: ["First prototype — competed at ETH Zurich"],
        desc: "Ashwa's entry into the Hyperloop space — a full pod prototype developed and tested for international-level competition at ETH Zurich.",
        achievements: ["First foray into Hyperloop technology"]
      }
    }
  }
};


/* ════════════════════════════════════════════════════════════
   RUNTIME STATE
════════════════════════════════════════════════════════════ */
let activeProgKey = "cv";
let activeYear    = null;
let slideshowTimer = null;
let renderToken   = 0;
let slideIndex    = 0;
let validImages   = [];

/* ── DOM refs ─────────────────────────────────────────────── */
const viewer         = document.getElementById("prog-viewer");
const progCodeEl     = document.getElementById("prog-code");
const progCodeBgEl   = document.getElementById("prog-code-bg");
const progTagEl      = document.getElementById("prog-tag");
const progTitleEl    = document.getElementById("prog-title");
const progYears      = document.getElementById("prog-years");
const progImage      = document.getElementById("prog-image");
const progContent    = document.getElementById("prog-content");
const progImageAccent = document.getElementById("prog-image-accent");
const progYearBadge  = document.getElementById("prog-year-badge");
const slideCurrentEl = document.getElementById("slide-current");
const slideTotalEl   = document.getElementById("slide-total");
const heroStripe     = document.getElementById("proj-hero-stripe");
const heroRule       = document.querySelector(".proj-hero-rule");

progImage.style.transition = "opacity 0.28s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease";


/* ════════════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════════ */
function pad2(n) { return n < 10 ? "0" + n : String(n); }

function preloadImages(paths) {
  return Promise.all(
    paths.map(p => new Promise(resolve => {
      const img = new Image();
      img.onload  = () => resolve(p);
      img.onerror = () => resolve(null);
      img.src = p;
    }))
  ).then(r => r.filter(Boolean));
}

function updateSlideCounter(idx, total) {
  if (slideCurrentEl) slideCurrentEl.textContent = pad2(idx + 1);
  if (slideTotalEl)   slideTotalEl.textContent   = pad2(total);
}

function swapImage(src, alt, token, idx, total) {
  if (token !== renderToken) return;
  progImage.style.opacity = "0";
  setTimeout(() => {
    if (token !== renderToken) return;
    progImage.src = src;
    progImage.alt = alt;
    progImage.style.opacity = "1";
    updateSlideCounter(idx, total);
  }, 280);
}

/* Update all accent-driven elements when programme changes */
function applyAccent(accent) {
  document.documentElement.style.setProperty("--prog-accent", accent);
  if (heroStripe) heroStripe.style.background = accent;
  if (progImageAccent) progImageAccent.style.background = accent;
  if (heroRule) {
    heroRule.style.background = `linear-gradient(to right,
      transparent 0%, rgba(255,255,255,0.06) 20%,
      ${accent} 50%, rgba(255,255,255,0.06) 80%, transparent 100%)`;
  }
}


/* ════════════════════════════════════════════════════════════
   RENDER YEAR
════════════════════════════════════════════════════════════ */
function renderYear(progKey, year) {
  const data     = projectData[progKey].years[year];
  const identity = PROGRAMMES[progKey];

  renderToken += 1;
  const myToken = renderToken;
  slideIndex = 0;
  validImages = [];

  if (slideshowTimer) { clearInterval(slideshowTimer); slideshowTimer = null; }

  /* ── Update year badge ── */
  if (progYearBadge) progYearBadge.textContent = year;

  /* ── Text content (synchronous) ── */
  const spec = data.specs || {};
  const hasRealSpecs = Object.values(spec).some(
    v => v && v !== "—" && v !== "-" && v !== ""
  );

  const specHTML = hasRealSpecs ? `
    <div class="prog-specs">
      <div class="prog-spec"><span>Weight</span><strong>${spec.weight || "—"}</strong></div>
      <div class="prog-spec"><span>Power</span><strong>${spec.power || "—"}</strong></div>
      <div class="prog-spec"><span>0–100</span><strong>${spec.acceleration || "—"}</strong></div>
      <div class="prog-spec"><span>Top Speed</span><strong>${spec.topSpeed || "—"}</strong></div>
    </div>` : "";

  const badgeHTML = data.badge
    ? `<div class="prog-badge">${data.badge}</div>` : "";

  const changeItems = data.changes.map(c => `<li>${c}</li>`).join("");
  const achItems    = data.achievements.map(a => `<li>${a}</li>`).join("");

  progContent.innerHTML = `
    <div>
      <div class="prog-section-label">Updates · ${year}</div>
      <ul class="prog-changes">${changeItems}</ul>
    </div>
    <p class="prog-desc">${data.desc}</p>
    ${specHTML}
    ${badgeHTML}
    <div>
      <div class="prog-section-label">Achievements</div>
      <ul class="prog-achievements">${achItems}</ul>
    </div>`;

  /* ── Activate year button ── */
  progYears.querySelectorAll(".year-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.year === String(year));
    btn.setAttribute("aria-selected", btn.dataset.year === String(year));
  });
  window._scrollYearToActive?.();

  activeYear = year;

  /* ── Images (async, token-guarded) ── */
  const rawImages = data.images || (data.image ? [data.image] : []);
  progImage.style.opacity = "0";

  preloadImages(rawImages).then(valid => {
    if (myToken !== renderToken) return;

    validImages = valid;

    if (!valid.length) {
      progImage.src = "";
      progImage.style.opacity = "1";
      updateSlideCounter(0, 0);
      return;
    }

    slideIndex = 0;
    swapImage(valid[0], `${identity.tag} — ${year}`, myToken, 0, valid.length);

    if (valid.length > 1) {
      slideshowTimer = setInterval(() => {
        if (myToken !== renderToken) {
          clearInterval(slideshowTimer); slideshowTimer = null; return;
        }
        slideIndex = (slideIndex + 1) % valid.length;
        swapImage(valid[slideIndex], `${identity.tag} — ${year}`, myToken, slideIndex, valid.length);
      }, 3500);
    }
  });
}


/* ════════════════════════════════════════════════════════════
   SWITCH PROGRAMME
════════════════════════════════════════════════════════════ */
function switchProgramme(progKey) {
  const identity = PROGRAMMES[progKey];
  const proto    = projectData[progKey];
  const years    = Object.keys(proto.years).map(Number).sort((a, b) => b - a);

  activeProgKey = progKey;

  viewer.style.transition = "opacity 0.18s ease";
  viewer.style.opacity    = "0";

  setTimeout(() => {
    applyAccent(identity.accent);

    progCodeEl.textContent  = identity.code;
    if (progCodeBgEl) progCodeBgEl.textContent = identity.code;
    progTagEl.textContent   = identity.tag;
    progTitleEl.textContent = proto.title;

    /* Rebuild year buttons */
    progYears.innerHTML = "";
    years.forEach(year => {
      const btn = document.createElement("button");
      btn.className  = "year-btn";
      btn.textContent = year;
      btn.dataset.year = year;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", "false");
      btn.addEventListener("click", () => renderYear(progKey, year));
      progYears.appendChild(btn);
    });

    /* Update programme index active state */
    document.querySelectorAll(".prog-index-item").forEach(item => {
      item.classList.toggle("active", item.dataset.prog === progKey);
    });

    /* Update index count */
    const countEl = document.getElementById("prog-index-count");
    const keys = Object.keys(projectData);
    const idx  = keys.indexOf(progKey);
    if (countEl) countEl.textContent = `${idx + 1} / ${keys.length}`;

    renderYear(progKey, years[0]);

    viewer.style.opacity = "1";
  }, 180);
}


/* ════════════════════════════════════════════════════════════
   BUILD PROGRAMME INDEX  (horizontal strips replacing nav)
════════════════════════════════════════════════════════════ */
function buildProgIndex() {
  const list = document.getElementById("prog-index-list");
  if (!list) return;

  const keys = Object.keys(projectData);

  const countEl = document.getElementById("prog-index-count");
  if (countEl) countEl.textContent = `1 / ${keys.length}`;

  keys.forEach(key => {
    const identity = PROGRAMMES[key];
    const proto    = projectData[key];
    const years    = Object.keys(proto.years).map(Number).sort((a, b) => b - a);
    const yearRange = years.length > 1
      ? `${years[years.length - 1]} – ${years[0]}`
      : String(years[0]);

    const item = document.createElement("div");
    item.className = "prog-index-item";
    item.dataset.prog = key;
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", `${identity.tag} programme`);
    item.style.setProperty("--item-accent", identity.accent);

    item.innerHTML = `
      <div class="prog-index-item-bg-code" aria-hidden="true">${identity.code}</div>
      <div class="prog-index-item-dot" aria-hidden="true"></div>
      <div class="prog-index-item-code">${identity.code}</div>
      <div class="prog-index-item-name">${proto.title}</div>
      <div class="prog-index-item-meta">${yearRange} · ${years.length} season${years.length !== 1 ? "s" : ""}</div>`;

    function activate() {
      switchProgramme(key);
      viewer.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    item.addEventListener("click", activate);
    item.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
    });

    list.appendChild(item);
  });
}


/* ════════════════════════════════════════════════════════════
   BUILD OVERVIEW CARDS  (bottom portfolio section)
════════════════════════════════════════════════════════════ */
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
      <div class="prog-card-title">${proto.title}</div>
      <div class="prog-card-years">
        ${years.length > 1 ? `${years[years.length - 1]} – ${years[0]}` : years[0]}
        · ${years.length} season${years.length !== 1 ? "s" : ""}
      </div>
      <i class="fas fa-arrow-up-right prog-card-arrow" aria-hidden="true"></i>`;

    function activate() {
      switchProgramme(key);
      viewer.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    card.addEventListener("click", activate);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
    });
    grid.appendChild(card);
  });
}


/* ════════════════════════════════════════════════════════════
   YEAR SELECTOR — scroll / drag / keyboard
════════════════════════════════════════════════════════════ */
function initYearScroll() {
  const wrapper = document.getElementById("prog-years-wrapper");
  const track   = document.getElementById("prog-years");
  if (!wrapper || !track) return;

  const arrowL = document.createElement("button");
  const arrowR = document.createElement("button");
  const fadeL  = document.createElement("div");
  const fadeR  = document.createElement("div");

  arrowL.className = "years-arrow hidden";
  arrowL.innerHTML = "&#8249;";
  arrowL.setAttribute("aria-label", "Scroll years left");

  arrowR.className = "years-arrow hidden";
  arrowR.innerHTML = "&#8250;";
  arrowR.setAttribute("aria-label", "Scroll years right");

  fadeL.className  = "years-fade-edge left hidden";
  fadeR.className  = "years-fade-edge right hidden";

  wrapper.prepend(arrowL);
  wrapper.appendChild(arrowR);
  wrapper.appendChild(fadeR);
  wrapper.prepend(fadeL);

  function syncUI() {
    const atStart = track.scrollLeft <= 2;
    const atEnd   = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    arrowL.classList.toggle("hidden", atStart);
    arrowR.classList.toggle("hidden", atEnd);
    fadeL.classList.toggle("hidden", atStart);
    fadeR.classList.toggle("hidden", atEnd);
  }

  let rafId = null;
  function momentumScroll(delta, duration) {
    cancelAnimationFrame(rafId);
    const start  = track.scrollLeft;
    const target = Math.max(0, Math.min(start + delta, track.scrollWidth - track.clientWidth));
    const t0     = performance.now();
    const ease   = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
    function step(now) {
      const p = Math.min((now - t0) / duration, 1);
      track.scrollLeft = start + (target - start) * ease(p);
      if (p < 1) rafId = requestAnimationFrame(step);
      else { track.scrollLeft = target; syncUI(); }
    }
    rafId = requestAnimationFrame(step);
  }

  window._scrollYearToActive = function () {
    const active = track.querySelector(".year-btn.active");
    if (!active) return;
    const tr    = track.getBoundingClientRect();
    const br    = active.getBoundingClientRect();
    const delta = br.left - tr.left - tr.width / 2 + br.width / 2;
    momentumScroll(delta, 280);
  };

  arrowL.addEventListener("click", () => momentumScroll(-Math.max(track.clientWidth * 0.55, 140), 300));
  arrowR.addEventListener("click", () => momentumScroll(+Math.max(track.clientWidth * 0.55, 140), 300));
  track.addEventListener("scroll", syncUI, { passive: true });
  window.addEventListener("resize", syncUI);

  /* Drag to scroll */
  let dragging = false, startX = 0, scrollX = 0, vel = 0, lastX = 0, lastT = 0;

  track.addEventListener("mousedown", e => {
    dragging = true; startX = e.clientX; scrollX = track.scrollLeft;
    lastX = e.clientX; lastT = performance.now(); vel = 0;
    track.classList.add("grabbing");
    cancelAnimationFrame(rafId);
    e.preventDefault();
  });
  window.addEventListener("mousemove", e => {
    if (!dragging) return;
    const now = performance.now(), dt = now - lastT;
    if (dt > 0) vel = (e.clientX - lastX) / dt;
    lastX = e.clientX; lastT = now;
    track.scrollLeft = scrollX - (e.clientX - startX);
    syncUI();
  });
  window.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("grabbing");
    if (Math.abs(vel) > 0.05) launchCoast(vel);
  });

  track.addEventListener("touchstart", e => {
    dragging = true; startX = e.touches[0].clientX; scrollX = track.scrollLeft;
    lastX = startX; lastT = performance.now(); vel = 0;
    cancelAnimationFrame(rafId);
  }, { passive: true });
  track.addEventListener("touchmove", e => {
    if (!dragging) return;
    const x = e.touches[0].clientX, now = performance.now(), dt = now - lastT;
    if (dt > 0) vel = (x - lastX) / dt;
    lastX = x; lastT = now;
    track.scrollLeft = scrollX - (x - startX);
    syncUI();
  }, { passive: true });
  track.addEventListener("touchend", () => {
    dragging = false;
    if (Math.abs(vel) > 0.05) launchCoast(vel);
  });

  function launchCoast(v) {
    let m = v * 14;
    function step() {
      if (Math.abs(m) < 0.5) return;
      track.scrollLeft -= m;
      m *= 0.88;
      syncUI();
      rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);
  }

  /* Keyboard nav */
  track.setAttribute("tabindex", "0");
  track.addEventListener("keydown", e => {
    const btns = [...track.querySelectorAll(".year-btn")];
    const idx  = btns.findIndex(b => b.classList.contains("active"));
    if (e.key === "ArrowLeft"  && idx > 0)              { btns[idx - 1].click(); e.preventDefault(); }
    if (e.key === "ArrowRight" && idx < btns.length - 1){ btns[idx + 1].click(); e.preventDefault(); }
    if (e.key === "Home") { btns[0].click(); e.preventDefault(); }
    if (e.key === "End")  { btns[btns.length - 1].click(); e.preventDefault(); }
  });

  setTimeout(syncUI, 100);
}


/* ════════════════════════════════════════════════════════════
   SCROLL REVEAL — cards only
════════════════════════════════════════════════════════════ */
function initReveal() {
  const cards = document.querySelectorAll(".prog-card, .prog-index-item");
  cards.forEach((el, i) => {
    el.style.opacity   = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition =
      `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.055}s,
       transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.055}s`;
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.opacity   = "1";
      e.target.style.transform = "translateY(0)";
      obs.unobserve(e.target);
    });
  }, { threshold: 0.06 });

  cards.forEach(el => obs.observe(el));
}


/* ════════════════════════════════════════════════════════════
   STAT COUNTER ANIMATION
════════════════════════════════════════════════════════════ */
function initStatCounters() {
  const statValues = document.querySelectorAll(".proj-stat-value[data-target]");
  if (!statValues.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      /* Don't animate "2005" — it's a year, not a count */
      if (target > 1000) { el.textContent = target; obs.unobserve(el); return; }

      const duration = 900;
      const start    = performance.now();
      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => obs.observe(el));
}


/* ════════════════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════════════════ */
buildProgIndex();
switchProgramme("cv");
buildOverviewCards();
initReveal();
initYearScroll();
initStatCounters();