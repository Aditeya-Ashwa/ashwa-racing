function initializeSponsors() {

    // CONFIG
    const SPONSOR_COUNT = 7;
    const SPONSOR_PATH = "assets/images/sponsors/";
    const ROTATE_INTERVAL = 4000;

    // === ROTATING SPONSOR (Top Right) ===
    let currentSponsor = 1;
    const rotatingImg = document.getElementById("top-rotating-sponsor");

    function rotateSponsor() {
        currentSponsor++;
        if (currentSponsor > SPONSOR_COUNT) currentSponsor = 1;

        if (rotatingImg) {
            rotatingImg.src = `${SPONSOR_PATH}s${currentSponsor}.png`;
        }
    }

    if (rotatingImg) {
        setInterval(rotateSponsor, ROTATE_INTERVAL);
    }

    // === INFINITE SCROLL SPONSOR STRIP ===
    const track = document.getElementById("sponsor-track");

    function loadAllSponsors() {
        if (!track) return;

        for (let i = 1; i <= SPONSOR_COUNT; i++) {
            const img = document.createElement("img");
            img.src = `${SPONSOR_PATH}s${i}.png`;
            img.className = "sponsor-logo";
            track.appendChild(img);
        }
    }

    if (track) {
        loadAllSponsors();
        loadAllSponsors(); // duplicate for infinite loop
    }

    // === INLINE FADE-IN/OUT SPONSOR ===
    let inlineIndex = 1;
    const inlineImg = document.getElementById("inline-sponsor");

    if (inlineImg) {
        // First image
        inlineImg.src = `${SPONSOR_PATH}s1.png`;
        inlineImg.style.opacity = 1;

        function rotateInlineSponsor() {
            // Fade out
            inlineImg.style.opacity = 0;

            // After fade-out, change image
            setTimeout(() => {
                inlineIndex++;
                if (inlineIndex > SPONSOR_COUNT) inlineIndex = 1;

                inlineImg.src = `${SPONSOR_PATH}s${inlineIndex}.png`;

                // Fade in
                inlineImg.style.opacity = 1;
            }, 500); // match CSS fade time
        }

        setInterval(rotateInlineSponsor, ROTATE_INTERVAL);
    }
}
