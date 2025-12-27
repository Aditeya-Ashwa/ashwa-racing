// assets/js/projects.js

const projectData = {
  cv: {
    title: "High-Performance Combustion Platform",
    years: {
      2024: {
        image: "assets/images/prototypes/XX5C.jpg",
        changes: `
          • Revised intake & exhaust system<br>
          • Suspension geometry refinement<br>
          • Weight reduction program
        `,
        desc: "Focused on maximizing reliability and endurance performance with mechanical optimization.",
        achievements: [
          "National endurance top scores",
          "Multiple podium finishes"
        ]
      },
      2023: {
        image: "assets/images/prototypes/cv_2023.jpg",
        changes: `
          • ECU remapping<br>
          • Cooling system redesign
        `,
        desc: "Improved thermal stability and engine efficiency for longer stints.",
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
        changes: `
          • New accumulator architecture<br>
          • In-house BMS v2
        `,
        desc: "Electric platform optimized for safety, efficiency, and energy density.",
        achievements: [
          "Passed accumulator inspection",
          "Improved energy efficiency"
        ]
      }
    }
  }
  // hybrid, hyperloop, driverless follow same structure
};

function initPrototype(prototypeKey) {
  const proto = projectData[prototypeKey];
  const yearContainer = document.getElementById(`${prototypeKey}-years`);

  // Populate year buttons
  Object.keys(proto.years).forEach((year, index) => {
    const btn = document.createElement("button");
    btn.className = "year-btn";
    btn.textContent = year;

    if (index === 0) btn.classList.add("active");

    btn.onclick = () => selectYear(prototypeKey, year);
    yearContainer.appendChild(btn);
  });

  // Load first year by default
  selectYear(prototypeKey, Object.keys(proto.years)[0]);
}

function selectYear(prototypeKey, year) {
  const proto = projectData[prototypeKey];
  const data = proto.years[year];

  document.getElementById(`${prototypeKey}-title`).textContent = proto.title;
  document.getElementById(`${prototypeKey}-image`).src = data.image;
  document.getElementById(`${prototypeKey}-changes`).innerHTML = data.changes;
  document.getElementById(`${prototypeKey}-desc`).textContent = data.desc;

  const achList = document.getElementById(`${prototypeKey}-achievements`);
  achList.innerHTML = "";
  data.achievements.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    achList.appendChild(li);
  });

  // Update active state
  document.querySelectorAll(`#${prototypeKey}-years .year-btn`)
    .forEach(btn => {
      btn.classList.toggle("active", btn.textContent === year);
    });
}

// INIT ALL PROTOTYPES
["cv", "ev", "hybrid", "hyperloop", "driverless"].forEach(initPrototype);
