/* ============================================================
   LAUNCH COUNTDOWN — targets the EV + combustion reveal event.
   Target date is IST (+05:30) explicitly so the countdown reads
   the same for every visitor regardless of their local timezone.
   Remove this file (and its <script> tag in index.html, and the
   .launch-teaser* CSS block in index.css) once the event has
   passed.
   ============================================================ */
(function () {
  var TARGET = new Date("2026-08-22T00:00:00+05:30").getTime();

  var els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs")
  };
  var wrap = document.getElementById("launch-countdown");

  if (!wrap || !els.days) return;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function render() {
    var diff = TARGET - Date.now();

    if (diff <= 0) {
      wrap.innerHTML = '<p class="launch-teaser-live">We\u2019re live \u2014 the reveal has begun.</p>';
      clearInterval(timer);
      return;
    }

    var days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    var hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    var mins = Math.floor(diff / 60000);
    diff -= mins * 60000;
    var secs = Math.floor(diff / 1000);

    function updateVal(el, val) {
      if (el.textContent !== val) {
        el.textContent = val;
        el.classList.remove('tick');
        void el.offsetWidth; // trigger reflow
        el.classList.add('tick');
      }
    }

    updateVal(els.days, pad(days));
    updateVal(els.hours, pad(hours));
    updateVal(els.mins, pad(mins));
    updateVal(els.secs, pad(secs));
  }

  render();
  var timer = setInterval(render, 1000);
})();