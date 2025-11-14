// LOAD HEADER
fetch("components/header.html")
  .then(res => res.text())
  .then(data => {
      document.getElementById("main-header").innerHTML = data;

      // ⭐ Call sponsors initializer AFTER header is inserted
      if (typeof initializeSponsors === "function") {
          initializeSponsors();
      }
  });

// LOAD FOOTER
fetch("components/footer.html")
  .then(res => res.text())
  .then(data => {
      document.getElementById("main-footer").innerHTML = data;
  });

// LOAD SPONSOR STRIP
fetch("components/sponsor-strip.html")
  .then(res => res.text())
  .then(data => {
      document.getElementById("sponsor-strip").innerHTML = data;
  });
