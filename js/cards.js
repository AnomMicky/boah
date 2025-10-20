// --- All transition-related code has been REMOVED ---
// This script is now simple, clean, and only controls this page.

const memorySections = document.querySelectorAll(".memory-section");

memorySections.forEach(section => {
  const color1 = section.querySelector(".color-1");
  const color2 = section.querySelector(".color-2");

  if (color1 && color2) {
    color2.addEventListener("click", () => section.classList.add("change"));
    color1.addEventListener("click", () => section.classList.remove("change"));
  }
});

function revealOneSection() {
  const triggerPoint = window.innerHeight / 2;

  memorySections.forEach(section => {
    const sectionBounds = section.getBoundingClientRect();
    const sectionTop = sectionBounds.top;
    const sectionBottom = sectionBounds.bottom;

    if (sectionTop < triggerPoint && sectionBottom > triggerPoint) {
      section.classList.add("show");
    } else {
      section.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", revealOneSection);
revealOneSection();

