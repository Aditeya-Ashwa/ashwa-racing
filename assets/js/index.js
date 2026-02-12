const heroImages = [
  "assets/images/team/2021 hybrd.webp",
  "assets/images/team/2025.webp",
  "assets/images/team/Consulate.webp",
  "assets/images/team/Hyperloop.webp"
];

const heroBg = document.querySelector(".hero-bg");

let currentIndex = 0;

// Preload images
function preloadImages(images) {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

preloadImages(heroImages);

function changeHeroBackground() {
  heroBg.classList.remove("active");

  setTimeout(() => {
    heroBg.style.backgroundImage = `url('${heroImages[currentIndex]}')`;
    heroBg.classList.add("active");

    currentIndex = (currentIndex + 1) % heroImages.length;
  }, 1500); // slightly faster fade
}
changeHeroBackground();

setInterval(changeHeroBackground, 7500);
