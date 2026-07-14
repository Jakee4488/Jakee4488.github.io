/* The page behaves like a pipeline run: scrolling advances the stages. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var railLinks = Array.prototype.slice.call(document.querySelectorAll(".rail-nodes a"));
  var railFill = document.getElementById("rail-fill");
  var runbarFill = document.getElementById("runbar-fill");
  var sections = railLinks
    .map(function (link) { return document.getElementById(link.dataset.node); })
    .filter(Boolean);

  /* ---- run progress ---- */

  function updateProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    if (railFill) railFill.style.height = pct + "%";
    if (runbarFill) runbarFill.style.width = pct + "%";
  }

  /* ---- active stage ---- */

  function updateStages() {
    var marker = window.scrollY + window.innerHeight * 0.35;
    var currentIndex = 0;

    sections.forEach(function (section, i) {
      if (section.offsetTop <= marker) currentIndex = i;
    });

    railLinks.forEach(function (link, i) {
      link.classList.toggle("active", i === currentIndex);
      link.classList.toggle("passed", i < currentIndex);
      if (i === currentIndex) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateProgress();
      updateStages();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---- scroll reveals ---- */

  if (!reduceMotion && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".band > .stage, .band-title, .band-sub, .profile, .roles > .role, .artifact, .stack, .edu > *, .contact, .run-complete"
    );

    targets.forEach(function (el) { el.classList.add("reveal"); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("shown");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---- footer year ---- */

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
