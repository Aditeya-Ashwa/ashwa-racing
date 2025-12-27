const heroImages = [
  "assets/images/team/2021 hybrd.jpg",
  "assets/images/team/2025.jpg",
  "assets/images/team/Consulate.jpg",
  "assets/images/team/Hyperloop.jpg"
];

const heroBg = document.querySelector(".hero-bg");

let currentIndex = 0;

function changeHeroBackground() {
    heroBg.classList.remove("active");

    setTimeout(() => {
        heroBg.style.backgroundImage = `url('${heroImages[currentIndex]}')`;
        heroBg.classList.add("active");

        currentIndex = (currentIndex + 1) % heroImages.length;
    }, 600); // sync with fade-out
}

// Initial load
changeHeroBackground();

// Rotate every 6 seconds
setInterval(changeHeroBackground, 6000);
