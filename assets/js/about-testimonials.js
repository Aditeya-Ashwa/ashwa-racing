const voices = [
  {
    name: "Arun Raj",
    role: "Founding Member (2003)",
    image: "/assets/images/team/members/2028/image.jpeg",
    quote: "Ashwa was built on the belief that Indian students can engineer world-class race cars."
  },
  {
    name: "Prof. R. S. Kulkarni",
    role: "Faculty Advisor",
    image: "/assets/images/team/members/2028/image.jpeg",
    quote: "Ashwa Racing builds engineers who are industry-ready from day one."
  },
  {
    name: "Alumni Engineer",
    role: "Class of 2020",
    image: "/assets/images/team/members/2028/image.jpeg",
    quote: "The experience at Ashwa shaped my entire engineering career."
  },
  {
    name: "Alumni Engineer",
    role: "Class of 2018",
    image: "/assets/images/team/members/2028/image.jpeg",
    quote: "From CAD to fabrication, Ashwa gave me hands-on exposure unmatched elsewhere."
  },
  {
    name: "Alumni Engineer",
    role: "Class of 2015",
    image: "/assets/images/team/members/2028/image.jpeg",
    quote: "Ashwa taught me systems thinking and real engineering discipline."
  },
  {
    name: "Alumni Engineer",
    role: "Class of 2012",
    image: "/assets/images/team/members/2028/image.jpeg",
    quote: "Competing internationally was a defining experience of my student life."
  }
];

const grid = document.getElementById("voices-grid");

let visibleCount = window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3;
let index = 0;

function renderVoices() {
  grid.innerHTML = "";

  for (let i = 0; i < visibleCount; i++) {
    const v = voices[(index + i) % voices.length];

    const card = document.createElement("div");
    card.className = "voice-card";

    card.innerHTML = `
      <img class="voice-img" src="${v.image}" alt="${v.name}">
      <div class="voice-content">
        <p>“${v.quote}”</p>
        <div class="voice-meta">
          <span>${v.name}</span><br>${v.role}
        </div>
      </div>
    `;

    grid.appendChild(card);
  }

  index = (index + visibleCount) % voices.length;
}

renderVoices();
setInterval(renderVoices, 4000);

/* Recalculate on resize */
window.addEventListener("resize", () => {
  visibleCount = window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3;
  renderVoices();
});
