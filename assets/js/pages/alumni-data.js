/* ============================================================
   ASHWA RACING — alumni-data.js
   ──────────────────────────────────────────────────────────
   THIS IS THE ONLY FILE YOU NEED TO EDIT.
   
   ORG_STRUCTURE — the org chart tree.
   Add members[] to any node that should show member chips.
   Leave members[] empty (or omit) for nodes that are header-only.
   
   ALUMNI — notable alumni cards + testimonials.
   ============================================================ */

// ─── Org chart ────────────────────────────────────────────────
// node fields:
//   id        — unique string (no spaces)
//   label     — display text
//   sublabel  — optional small text below label
//   type      — "root" | "mgmt" | "programme" | "subsystem" | "leaf"
//   members   — array of { name, photo? } — omit or [] = no member list
//   children  — nested nodes

const ORG_STRUCTURE = {
  id: "root",
  label: "Ashwa Racing",
  sublabel: "Steering Committee",
  type: "root",
  members: [],          // steering committee — no member chips (header only)
  sideLeft: [
    {
      id: "advisors",
      label: "Advisors",
      type: "leaf",
      members: [
        {
          name:"Arunraj Subbaraj (Founder)",
          designation:"Director, Quality HDPE Packaging Industry",
          photo:"assets/images/alumni-management/advisor/arunraj.webp"
        }
      ]       // no member list per spec
    },
    {
      id: "alumni-node",
      label: "Alumni",
      type: "leaf",
      members: [
        {
          name:"Bhuvan Doreswamy (Electrical Advisor)",
          designation:"Student, Masters of ECE, University of Minnesota. Former PD at Microchip",
          photo:"assets/images/team/default.webp"
        },
        {
          name:"Darren Nishan Patrao (Mechanical Advisor)",
          designation:"Mechanical Engineer, Applied Materials.",
          photo:"assets/images/team/default.webp"
        },
        {
          name:"Goutham SG (Advisor)",
          designation:"Designation",
          photo:"assets/images/team/default.webp"
        }
      ]       // no member list per spec
    },
    {
      id: "industry",
      label: "Industry Leaders",
      type: "leaf",
      members: [
        {
          name:"Hubert Reilard",
          designation:"Managing Partner, COMANO Advisory LLP. Former Managing Director, EFD Induction Group",
          photo:"assets/images/alumni-management/industryleads/herbert.webp"
        },
        {
          name:"Harish Kukreja",
          designation:"CEO at Aquarius Estates & Properties",
          photo:"assets/images/alumni-management/"
        },
      ]       // no member list per spec
    }
  ],
  sideRight: [
    {
      id: "rsst",
      label: "RSST Management",
      type: "leaf",
      members: [
        {
          name: "Dr. M.P. Shyam",
          designation: "President, RSST",
          photo: "assets/images/alumni-management/RSST/mpshyam.webp"
        },
        {
          name: "Dr. C. Vinod Hayagriv",
          designation: "Vice President, RSST",
          photo: "assets/images/alumni-management/RSST/cvinod.webp"
        },
        {
          name: "Mr. A.C. Chandrashekar Raju",
          designation: "Vice President, RSST",
          photo: "assets/images/alumni-management/RSST/acchandrashekar.webp"
        },
        {
          name: "Mr. P.S. Venkatesh Babu",
          designation: "Treasurer, RSST",
          photo: "assets/images/alumni-management/RSST/psvenkatesh.webp"
        },
        {
          name: "Dr. (h.c.) A.V.S. Murthy",
          designation: "Honorary Secretary, RSST",
          photo: "assets/images/alumni-management/RSST/avsmurthy.webp"
        },
        {
          name: "Mr. D.P. Nagaraj",
          designation: "Honorary Joint Secretary, RSST",
          photo: "assets/images/alumni-management/RSST/dpnagaraj.webp"
        },
        {
          name: "Mr. Nikhil A Murthy",
          designation: "Assistant Secretary, RSST",
          photo: "assets/images/alumni-management/RSST/nikhilamurthy.webp"
        }
      ]
    },
    {
      id: "rvce",
      label: "RVCE Management",
      type: "leaf",
      members: [
        { 
          name: "Dr. K.N. Subramanya",
          designation:"Principal, R.V. College of Engineering",
          photo: "assets/images/alumni-management/RVCE/knsubramanya.webp" 
        },
        {
          name: "Dr. Ranvindra S. Kulkarni (Faculty Advisor)",
          designation:"Professor, Department of Aerospace Engineering, R.V. College of Engineering",
          photo: "assets/images/alumni-management/RVCE/ravindraskulkarni.webp" 
        },
      ]
    }
  ],
  children: [
    // ── Combustion (left) ──
    {
      id: "cv",
      label: "Combustion",
      type: "programme",
      members: [],
      children: [
        {
          id: "cv-leads",
          label: "Team Leaders",
          type: "subsystem",
          members: [
            { name: "Shravan CS (Team Captain)", photo: "assets/images/team/members/2027/Shravan CS.webp" },
            { name: "N Akshay Urs (Project Manager)", photo: "assets/images/team/members/2027/N Akshay Urs.webp" },
            { name: "Sathvik S Naik (Chief Engineer)", photo: "assets/images/team/members/2027/Sathvik S Naik.webp" },
          ],
          children: []
        }
      ]
    },

    // ── Centre column ──
    {
      id: "centre",
      label: "",          // invisible grouping node
      type: "centre-col",
      members: [],
      children: [
        {
          id: "design",
          label: "Design Phase",
          type: "mgmt",
          members: []     // no members per spec
        },
        {
          id: "validation",
          label: "Validation Phase",
          type: "mgmt",
          members: []     // no members per spec
        },
        {
          id: "manufacturing",
          label: "Manufacturing Phase",
          type: "mgmt",
          members: []     // no members per spec
        },
        {
          id: "testing",
          label: "Testing Phase",
          type: "mgmt",
          members: []     // no members per spec
        }
      ]
    },

    // ── Hybrid (right) ──
    {
      id: "hyb",
      label: "Hybrid",
      type: "programme",
      members: [],
      children: [
        {
          id: "hyb-leads",
          label: "Team Leaders",
          type: "subsystem",
          members: [
            { name: "Team Captain", photo: "assets/images/team/default.webp" },
            { name: "Project Manager", photo: "assets/images/team/default.webp" },
            { name: "Chief Engineer", photo: "assets/images/team/default.webp" },
          ],
          children: []
        }
        // "Team" node removed per spec — only team leaders shown
      ]
    },
    {
      id: "ev",
      label: "Electric",
      type: "programme",
      members: [],
      children: [
        {
          id: "ev-leads",
          label: "Team Leaders",
          type: "subsystem",
          members: [
            { name: "Amitha A V (Team Captain)", photo: "assets/images/team/default.webp" },
            { name: "Kritik Modawel (Project Manager)", photo: "assets/images/team/default.webp" },
            { name: "Gaurav Raju (Chief Engineer)", photo: "assets/images/team/default.webp" },
          ],
          children: []
        }
        // "Team" node removed per spec — only team leaders shown
      ]
    },
    {
      id: "dv",
      label: "Driverless",
      type: "programme",
      members: [],
      children: [
        {
          id: "dv-leads",   // IMPORTANT: unique id
          label: "Team Leaders",
          type: "subsystem",
          members: [
            { name: "Team Captain", photo: "assets/images/team/default.webp" },
            { name: "Project Manager", photo: "assets/images/team/default.webp" },
            { name: "Chief Engineer", photo: "assets/images/team/default.webp" },
          ],
          children: []
        }
      ]
    },
    {
      id: "hyperloop",
      label: "Hyperloop",
      type: "programme",
      members: [],
      children: [
        {
          id: "hyperloop-leads",  // unique id
          label: "Team Leaders",
          type: "subsystem",
          members: [
            { name: "Team Captain", photo: "assets/images/team/default.webp" },
            { name: "Project Manager", photo: "assets/images/team/default.webp" },
            { name: "Chief Engineer", photo: "assets/images/team/default.webp" },
          ],
          children: []
        }
      ]
    }
  ],

  // ── Bottom subsystem columns ──
  subsystems: {
    left: [
    ],
    right: [
      {
        id: "aero",
        label: "Aerodynamics",
        type: "subsystem",
        members: []       // no members per spec
      },
      {
        id: "brakes",
        label: "Brakes & Logistics",
        type: "subsystem",
        members: []       // no members per spec
      },
      {
        id: "chassis",
        label: "Chassis & Workshop Management",
        type: "subsystem",
        members: []       // no members per spec
      },
      {
        id: "drivetrain",
        label: "Drivetrain & Human Resources",
        type: "subsystem",
        members: []       // no members per spec
      },
      {
        id: "engine",
        label: "Engine",
        type: "subsystem",
        members: []       // no members per spec
      },
      {
        id: "electrical",
        label: "Electrical & Testing",
        type: "subsystem",
        members: []       // no members per spec
      },
      {
        id: "finance",
        label: "Finance",
        type: "subsystem",
        members: []       // no members per spec
      },
      {
        id: "it",
        label: "IT",
        type: "subsystem",
        members: []       // no members per spec
      },
      {
        id: "smp",
        label: "Sponsorship, Marketing & Public Relations",
        type: "subsystem",
        members: []       // no members per spec
      },
      {
        id: "suspension",
        label: "Suspension & Admin",
        type: "subsystem",
        members: []       // no members per spec
      },
    ]
  }
};

// ─── Notable alumni cards ─────────────────────────────────────
const ALUMNI = [
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
];