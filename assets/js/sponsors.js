const sponsorData = {
  "EXECUTIVE SPONSOR": [
    {
      //   name: "Infineon",
      logo: "assets/images/sponsors/infineon.svg",
      url: "https://www.infineon.com",
      description: "Semiconductor solutions supporting power electronics and control systems."
    },
    {
      //   name: "Bosch",
      logo: "assets/images/sponsors/bosch.svg",
      url: "https://www.bosch.com",
      description: "The Bosch Group is a leading global supplier of technology and services. It employs roughly 412,000 associates worldwide (as of December 31, 2025). According to preliminary figures, the company generated sales of 91 billion euros in 2025. Its operations are divided into four business sectors: Mobility, Industrial Technology, Consumer Goods, and Energy and Building Technology."
    },
    {
      //   name: "Adani",
      logo: "assets/images/sponsors/adani.svg",
      url: "https://www.adani.com",
      description: "Over the years, Adani Group has positioned itself to be the market leader in its transport logistics and energy utility portfolio businesses focusing on large scale infrastructure development in India with O&M practices benchmarked to global standards. With four IG rated businesses, it is the only Infrastructure Investment Grade issuer in India."
    }
  ],

  "PLATINUM SPONSOR": [
    {
      //   name: "RV College of Engineering",
      logo: "assets/images/sponsors/rvce.svg",
      url: "https://rvce.edu.in",
      description: "Established in 1963 with three engineering branches (Civil, Mechanical and Electrical), RVCE now offers 13 undergraduate engineering programmes, 13 master's degree programmes and doctoral studies. Rated as one of the top ten self-financing engineering institutions in the country. The current annual student intake for UG and PG programmes is over 2,000. With a highly qualified and dedicated faculty, it utilises its expertise in various disciplines to conduct Research and Development (R&D) for industry and defence establishments in the country."
    },
    {
      logo: "assets/images/sponsors/motul.svg",
      url: "https://www.motul.com"
    },
    {
      logo: "assets/images/sponsors/skf.svg",
      url: "https://www.skf.com"
    },
    {
      logo: "assets/images/sponsors/henkel.svg",
      url: "https://www.henkel.com"
    },
    {
      logo: "assets/images/sponsors/lapp.svg",
      url: "https://lapp.com"
    },
    {
      logo: "assets/images/sponsors/delhivery.svg",
      url: "https://www.delhivery.com"
    }
  ],

  "GOLD SPONSOR": [
    {
      logo: "assets/images/sponsors/vrl.svg",
      url: "https://www.vrlgroup.in"
    },
    {
      logo: "assets/images/sponsors/aruanigrid.svg",
      url: "https://www.aruanigrid.com"
    }
  ],

  "SILVER SPONSOR": [
    {
      logo: "assets/images/sponsors/pegasyssystemspvtltd.svg",
      url: "https://www.pegasys.co.in"
    },
    {
      logo: "assets/images/sponsors/fastolex.svg",
      url: "https://www.fastolex.com"
    },
    {
      logo: "assets/images/sponsors/speedworks.svg",
      url: "https://www.speedworks.in"
    },
    {
      logo: "assets/images/sponsors/huntsman.svg",
      url: "https://www.huntsman.com"
    }
  ],

  "TECHNICAL PARTNERS": [
    {
      logo: "assets/images/sponsors/uniflex.svg",
      url: "https://www.uniflexcables.com"
    },
    {
      logo: "assets/images/sponsors/lioncircuits.svg",
      url: "https://www.lioncircuits.com"
    },
    {
      logo: "assets/images/sponsors/pcbpower.webp",
      url: "https://www.pcbpower.com"
    },
    {
      logo: "assets/images/sponsors/analogdevices.svg",
      url: "https://www.analog.com"
    },
    {
      logo: "assets/images/sponsors/dmgmori.svg",
      url: "https://www.dmgmori.com"
    }
  ]
};


const container = document.getElementById("sponsor-sections");

// Add intersection observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Stagger animation for cards
      const cards = entry.target.querySelectorAll('.sponsor-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 80);
      });
    }
  });
}, observerOptions);

Object.entries(sponsorData).forEach(([category, sponsors]) => {
  const section = document.createElement("section");
  section.className = `sponsor-section sponsor-${category
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  const heading = document.createElement("h2");
  heading.className = "sponsor-section-title";

  // Add decorative line before heading
  const decorativeLine = document.createElement("span");
  decorativeLine.className = "title-decoration";
  heading.appendChild(decorativeLine);

  const titleText = document.createTextNode(category);
  heading.appendChild(titleText);

  const grid = document.createElement("div");
  grid.className = "sponsor-grid";

  sponsors.forEach(sponsor => {
    const card = document.createElement("div");
    card.className = "sponsor-card";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "sponsor-image-wrapper";

    const img = document.createElement("img");
    img.src = sponsor.logo;
    img.alt = sponsor.name || `${category} sponsor`;
    img.loading = "lazy";

    if (sponsor.url) {
      const link = document.createElement("a");
      link.href = sponsor.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute('aria-label', `Visit ${sponsor.name || 'sponsor'} website`);
      link.appendChild(img);
      imageWrapper.appendChild(link);
    } else {
      imageWrapper.appendChild(img);
    }

    card.appendChild(imageWrapper);

    if (sponsor.name) {
      const name = document.createElement("h3");
      name.className = "sponsor-name";
      name.textContent = sponsor.name;
      card.appendChild(name);
    }

    if (sponsor.description) {
      const desc = document.createElement("p");
      desc.className = "sponsor-desc";
      desc.textContent = sponsor.description;
      card.appendChild(desc);
    }

    grid.appendChild(card);
  });

  section.appendChild(heading);
  section.appendChild(grid);
  container.appendChild(section);

  // Observe section for scroll animations
  observer.observe(section);
});