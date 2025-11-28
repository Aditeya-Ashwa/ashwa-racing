/* ===============================
   HEADER.JS (CLEAN + MERGED)
   - Loads header + footer
   - Initializes sponsor system safely ONCE
   - Prevents marquee double-start bug
   - Fixes mobile close button
================================ */

/* ------ REAL FIX: detect path AFTER 'ashwa-racing' ------ */
const fullPath = window.location.pathname;
const base = "/ashwa-racing/";

// everything after /ashwa-racing/
const afterBase = fullPath.replace(base, "");

// count folders after project root
const depth = afterBase === "" ? 0 : afterBase.split("/").length - 1;

// build prefix
let prefix = "";
for (let i = 0; i < depth; i++) prefix += "../";

/* ---------- LOAD HEADER ---------- */
fetch(prefix + "components/header.html")
  .then(res => res.text())
  .then(data => {
      document.getElementById("main-header").innerHTML = data;

      // Initialize all sponsor animations safely
      initializeSponsors();

      // Mobile X close button logic
      const closeBtn = document.getElementById("mobileClose");
      const navToggle = document.getElementById("nav-toggle");
      if (closeBtn && navToggle) {
          closeBtn.addEventListener("click", () => {
              navToggle.checked = false;
          });
      }
  });

/* ---------- LOAD FOOTER ---------- */
fetch(prefix + "components/footer.html")
  .then(res => res.text())
  .then(data => {
      document.getElementById("main-footer").innerHTML = data;
  });

let sponsorsInitialized = false;

async function initializeSponsors() {
    if (sponsorsInitialized) return;
    sponsorsInitialized = true;

    const SPONSOR_PATH = prefix + "assets/images/sponsors/";
    const ROTATE_INTERVAL = 2500;
    const SCROLL_SPEED = 0.55;

    // Load manifest
    const manifest = await fetch(SPONSOR_PATH + "manifest.json").then(res => res.json());
    const sponsorList = manifest.sponsors;
    const SPONSOR_COUNT = sponsorList.length;

    /* 1) TOP-RIGHT ROTATING SPONSOR */
    let currentSponsor = 0;
    const rotatingImg = document.getElementById("top-rotating-sponsor");

    function rotateTopSponsor() {
        currentSponsor = (currentSponsor + 1) % SPONSOR_COUNT;
        if (rotatingImg) rotatingImg.src = SPONSOR_PATH + sponsorList[currentSponsor];
    }

    if (rotatingImg) {
        rotateTopSponsor();
        setInterval(rotateTopSponsor, ROTATE_INTERVAL);
    }

    /* 2) INLINE CROSSFADE SPONSOR */
    const inlineImg = document.getElementById("inline-sponsor");
    let inlineIndex = 0;

    if (inlineImg) {
        inlineImg.src = SPONSOR_PATH + sponsorList[0];
        inlineImg.style.opacity = 1;

        function rotateInlineSponsor() {
            inlineImg.style.opacity = 0;
            setTimeout(() => {
                inlineIndex = (inlineIndex + 1) % SPONSOR_COUNT;
                inlineImg.src = SPONSOR_PATH + sponsorList[inlineIndex];
                inlineImg.style.opacity = 1;
            }, 500);
        }

        setInterval(rotateInlineSponsor, ROTATE_INTERVAL);
    }

    /* 3) CIRCULAR MARQUEE */
    const track = document.getElementById("sponsor-track");

    if (track) {
        if (track.children.length === 0) {
            sponsorList.forEach(name => {
                const img = document.createElement("img");
                img.src = SPONSOR_PATH + name;
                img.className = "sponsor-logo";
                track.appendChild(img);
            });
        }

        let pos = 0;

        function scrollLoop() {
            pos -= SCROLL_SPEED;
            track.style.transform = `translateX(${pos}px)`;

            const first = track.children[0];
            const firstWidth = first.offsetWidth + 32;

            if (-pos >= firstWidth) {
                track.appendChild(first);
                pos += firstWidth;
            }

            requestAnimationFrame(scrollLoop);
        }

        const images = track.querySelectorAll("img");
        Promise.all(
            [...images].map(img => img.complete ? Promise.resolve() : new Promise(res => img.onload = res))
        ).then(() => {
            if (!track.classList.contains("scroll-start")) {
                track.classList.add("scroll-start");
                scrollLoop();
            }
        });
    }
}
