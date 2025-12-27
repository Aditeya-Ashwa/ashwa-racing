const voices = [
  {
    name: "Alumni !",
    role: "Designated Role",
    image: "assets/images/team/members/2028/image.jpeg",
    quote: "Testimonials coming soon!"
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
