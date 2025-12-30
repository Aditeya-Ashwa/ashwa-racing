const sponsorData = {
    "EXECUTIVE SPONSOR": [
        "assets/images/sponsors/infineon.svg"
    ],

    "PLATINUM SPONSOR": [
        "assets/images/sponsors/rvce.svg"
    ],

    "GOLD SPONSOR":[
        "assets/images/sponsors/vrl.svg",
    ],

    "SILVER SPONSOR":[
        "assets/images/sponsors/pegasyssystemspvtltd.svg"
    ],

    "TECHNICAL PARTNERS": [
        
    ],

    "TECHNICAL PARTNERS": [
        "assets/images/sponsors/skf.svg",
        "assets/images/sponsors/uniflex.svg",
        "assets/images/sponsors/lapp.svg",
        "assets/images/sponsors/lioncircuits.svg",
        "assets/images/sponsors/pcbpower.webp",
        "assets/images/sponsors/delhivery.svg",
        "assets/images/sponsors/motul.svg",
        "assets/images/sponsors/analogdevices.svg",
        "assets/images/sponsors/dmgmori.svg",
        "assets/images/sponsors/huntsman.svg",
    ]
};

const container = document.getElementById("sponsor-sections");

Object.entries(sponsorData).forEach(([category, logos]) => {

    // Wrapper section
    const section = document.createElement("div");
    section.className = "sponsor-section";

    // Title
    const heading = document.createElement("h2");
    heading.className = "sponsor-section-title";
    heading.textContent = category;

    // Grid for logos
    const grid = document.createElement("div");
    grid.className = "sponsor-grid";

    logos.forEach(src => {
        const card = document.createElement("div");
        card.className = "sponsor-card";

        const img = document.createElement("img");
        img.src = src;
        img.alt = category + " sponsor";

        card.appendChild(img);
        grid.appendChild(card);
    });

    // Build section
    section.appendChild(heading);
    section.appendChild(grid);

    // Add to page
    container.appendChild(section);
});
