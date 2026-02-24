/**
 * We Travelled - 3D Carousel Logic
 * Vanilla JS port of "Animated Testimonials" React component
 */

document.addEventListener('DOMContentLoaded', () => {
  const testimonials = [
    {
      name: "New Hampshire, USA",
      designation: "Formula Hybrid + Electric",
      quote: "Global Dominance: Secured 1st Place Overall globally for two consecutive years (2020 & 2021) with hybrid prototypes. Achieved Overall Runners Up titles in 2017 & 2018.",
      src: "assets/images/team/2021 hybrd.jpg"
    },
    {
      name: "ETH Zurich & Valencia",
      designation: "European Hyperloop Week",
      quote: "Diversifying into high-speed transit technology. Unveiled our first physical Hyperloop prototype in Switzerland (2024) and qualified for finals in Spain (2021).",
      src: "assets/images/team/Hyperloop.jpg"
    },
    {
      name: "Australia",
      designation: "FSAE Australasia",
      quote: "First Indian team to compete (2005), winning Best Team Endeavour. Returned in 2006 to win the Best Asian Entry award.",
      src: "assets/images/team/Costwin.jpg"
    },
    {
      name: "Italy & Germany",
      designation: "Formula Student Europe",
      quote: "Winner of Best Endeavour at Formula Student Italy (2009). Received the Young Achiever Award at Formula Student Germany.",
      src: "assets/images/team/2012.jpg"
    },
    {
      name: "Spain (Aragón)",
      designation: "MotoStudent",
      quote: "Developing a sports bike prototype for competition at the MotorLand Aragón circuit, marking our expansion into two-wheeler racing.",
      src: "assets/images/prototypes/XX5C.jpg"
    },
  ];

  let activeIndex = 0;
  const autoplay = false;
  let intervalId;

  // DOM Elements
  const imageContainer = document.querySelector('.carousel-image-container');
  const titleEl = document.querySelector('.carousel-title');
  const designationEl = document.querySelector('.carousel-designation');
  const quoteEl = document.querySelector('.carousel-quote');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');
  const textWrapper = document.querySelector('.carousel-text-wrapper');

  // Pre-calculate random rotations for static nature of index
  // Note: In React code, it calculated random on render, but fixed per item would be better for consistency
  const rotations = testimonials.map(() => Math.floor(Math.random() * 21) - 10);

  function init() {
    renderImages();
    updateContent(true); // true = initial render
    attachListeners();
    if (autoplay) startAutoplay();
  }

  function renderImages() {
    imageContainer.innerHTML = '';
    testimonials.forEach((item, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'carousel-image-wrapper';
      wrapper.dataset.index = index;

      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.name;
      img.className = 'carousel-image';
      img.draggable = false;

      wrapper.appendChild(img);
      imageContainer.appendChild(wrapper);
    });
    updateImageStyles();
  }

  function updateImageStyles() {
    const wrappers = document.querySelectorAll('.carousel-image-wrapper');

    wrappers.forEach((wrapper, index) => {
      const isActive = index === activeIndex;
      // Calculate offset from active index to create a stack order
      // We want the active card on top, and others behind it
      const offset = (index - activeIndex + testimonials.length) % testimonials.length;

      // Z-Index: Active is highest (50). The further away in the stack, the lower.
      // If offset is 0 (active), z=50. 
      // If offset is 1 (next), z=49, etc.
      // We handle wrap-around by using the relative distance

      let zIndex = testimonials.length + 2 - offset;
      if (isActive) zIndex = 50;

      // Opacity and Scale
      // Active: 1, 1
      // Others: Fade out and shrink slightly as they go back
      const scale = isActive ? 1 : 0.9 + (0.02 * (testimonials.length - offset));
      const opacity = isActive ? 1 : 0.6 + (0.05 * (testimonials.length - offset));

      // 3D Transforms
      // We want a "fanned out" look.
      // Active: Center, 0 rotation
      // Others: Random-ish rotation but structured to look like a messy stack

      // Use the pre-calculated rotations but dampen them for the active card
      // Actually, let's make the stack visible behind the active one.
      // We'll rotate them slightly to the right/left based on their "random" value

      const rotate = isActive ? 0 : rotations[index];

      // Stack depth translateZ
      // Active: 0
      // Back cards: -20px * offset steps back
      const z = isActive ? 0 : -30;

      wrapper.style.zIndex = zIndex;
      wrapper.style.opacity = opacity;

      // If it's the active card, standard view.
      // If it's a background card, we rotate it and maybe translate it slightly to show the stack

      if (isActive) {
        wrapper.style.transform = `perspective(1000px) scale(1) translateZ(0) rotateY(0deg)`;
      } else {
        // Improved stack effect:
        // Rotate Z for the fan functionality
        // Translate X slightly to make them peek out behind
        const xOffset = isActive ? 0 : (offset * 10) - 20; // Slight horizontal shift
        wrapper.style.transform = `perspective(1000px) scale(${scale}) translateZ(${z}px) rotateZ(${rotate}deg) translateX(${xOffset}px)`;
      }
    });
  }

  function updateContent(isInitial = false) {
    const current = testimonials[activeIndex];

    // Animate Text Out (except initial)
    if (!isInitial) {
      textWrapper.classList.remove('fade-in');
      textWrapper.classList.add('fade-out');

      setTimeout(() => {
        setContentDOM(current);
        startWordAnimation();
        textWrapper.classList.remove('fade-out');
        textWrapper.classList.add('fade-in');
      }, 200);
    } else {
      setContentDOM(current);
      startWordAnimation();
    }
  }

  function setContentDOM(item) {
    titleEl.textContent = item.name;
    designationEl.textContent = item.designation;

    // Fix for "jointed text": Use explicit text nodes for spaces
    const words = item.quote.split(' ');
    quoteEl.innerHTML = '';
    words.forEach((word, idx) => {
      const span = document.createElement('span');
      span.className = 'word-span';
      span.textContent = word;
      span.style.transitionDelay = `${idx * 0.02}s`;
      quoteEl.appendChild(span);

      // Add a real space after the span
      quoteEl.appendChild(document.createTextNode(' '));
    });
  }

  function startWordAnimation() {
    // Trigger reflow or small delay to allow transition to work
    requestAnimationFrame(() => {
      const spans = quoteEl.querySelectorAll('.word-span');
      spans.forEach(span => {
        span.classList.add('visible');
      });
    });
  }

  function handleNext() {
    activeIndex = (activeIndex + 1) % testimonials.length;
    updateImageStyles();
    updateContent();
  }

  function handlePrev() {
    activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    updateImageStyles();
    updateContent();
  }

  function attachListeners() {
    btnNext.addEventListener('click', () => {
      handleNext();
      resetAutoplay();
    });
    btnPrev.addEventListener('click', () => {
      handlePrev();
      resetAutoplay();
    });
  }

  function startAutoplay() {
    intervalId = setInterval(handleNext, 5000);
  }

  function resetAutoplay() {
    if (autoplay) {
      clearInterval(intervalId);
      startAutoplay();
    }
  }

  // Run
  init();
});  
