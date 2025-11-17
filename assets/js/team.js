const teamData = [
  {
    name: "Rahul Sharma",
    role: "Project Manager (PM)",
    subsystem: "Leads",
    year: "2028",
    experience: "Led the 2028 team through Formula Bharat competition, securing 3rd place in Cost Analysis. Focused on budget management and strategic planning.",
    social: {
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Priya Varma",
    role: "Chassis Subsystem Lead",
    subsystem: "Chassis",
    year: "2028",
    experience: "Designed the lightweight steel space-frame chassis and managed fabrication, achieving a 15% weight reduction over the previous prototype.",
    social: {
      linkedin: "#",
      github: null
    }
  },
  {
    name: "Arjun Reddy",
    role: "Engine & Powertrain Specialist",
    subsystem: "Engine",
    year: "2027",
    experience: "Specialized in dyno tuning the CBR600RR engine and developing custom intake restrictor geometries for peak power output.",
    social: {
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Sneha Patel",
    role: "Electrical & Testing Lead",
    subsystem: "Electrical",
    year: "2028",
    experience: "Implemented the new high-speed CAN bus communication system and designed the custom ECU harness for improved reliability.",
    social: {
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Vikram S.",
    role: "Suspension Member",
    subsystem: "Suspension",
    year: "2028",
    experience: "Conducted suspension geometry analysis and optimized the double-wishbone setup for dynamic track performance.",
    social: {
      linkedin: "#",
      github: null
    }
  }
];

const PROFILE_IMAGE_URL = 'assets/images/prototypes/car-preview.png'; // Demo image as profile pic

function createMemberCard(member) {
  const card = document.createElement('div');
  card.classList.add('member-card');
  card.dataset.year = member.year;
  card.dataset.subsystem = member.subsystem;

  const githubIcon = member.social.github
    ? `<a href="${member.social.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>`
    : '';

  card.innerHTML = `
            <div class="profile-header">
                <div class="profile-img-container">
                    <!-- Using the demo image as the profile picture -->
                    <img src="${PROFILE_IMAGE_URL}" alt="${member.name} Profile">
                </div>
                <h3 class="member-name">${member.name}</h3>
                <p class="member-role">${member.role}</p>
            </div>
            <div class="member-experience">
                <h3>Experience & Contribution</h3>
                <p>${member.experience}</p>
            </div>
            <div class="member-social">
                <!-- LinkedIn is required -->
                <a href="${member.social.linkedin}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                ${githubIcon}
            </div>
        `;
  return card;
}

function renderMembers(year = '2028', subsystem = 'All') {
  const grid = document.getElementById('member-profiles-grid');
  grid.innerHTML = ''; // Clear existing profiles

  // Filtering logic (Currently only filters by year 2028 for demonstration)
  const filteredMembers = teamData.filter(member =>
    member.year === year && (subsystem === 'All' || member.subsystem === subsystem)
  );

  if (filteredMembers.length === 0) {
    grid.innerHTML = `<p style="color: #ccc; text-align: center; grid-column: 1 / -1;">No team members found for ${subsystem} in ${year}.</p>`;
    return;
  }

  filteredMembers.forEach(member => {
    grid.appendChild(createMemberCard(member));
  });
}


/* ==========================================================
   1. FILTER LOGIC & INITIAL RENDER
========================================================== */

let activeYear = '2028';
let activeSubsystem = 'All';

// Function to handle filter changes and re-render the grid
function handleFilterChange(type, value) {
  if (type === 'year') {
    activeYear = value;
  } else if (type === 'subsystem') {
    activeSubsystem = value;
  }
  renderMembers(activeYear, activeSubsystem);
}

// Initial render
renderMembers(activeYear, activeSubsystem);

