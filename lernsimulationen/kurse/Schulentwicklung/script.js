const revealItems = document.querySelectorAll(".hero-copy, .hero-panel, .section-heading, .leit-card, .graveyard-copy, .graveyard-image-frame, .rebirth-visual, .rebirth-steps article");

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => observer.observe(item));
