// --- 3D Menu hover logic (unchanged) ---
const centerItem = document.querySelector(".center-item");
const menu = document.querySelector(".menu");

centerItem.addEventListener("mouseover", () => {
  menu.classList.add("change");
});

menu.addEventListener("mouseleave", () => {
  menu.classList.remove("change");
});

// --- NEW: Custom Page Transition Logic ---
const transitionOverlay = document.querySelector('.transition-overlay');
const allLinks = document.querySelectorAll('.menu-item a');

allLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // 1. Prevent the link from navigating instantly
    e.preventDefault();
    const destination = link.href;

    // 2. Trigger the wipe animation
    if (transitionOverlay) {
      transitionOverlay.classList.add('wipe-active');
    }

    // 3. Wait for the animation to finish, then go to the new page
    setTimeout(() => {
      // Ensure the destination is not empty or a placeholder before navigating
      if (destination && !destination.endsWith('#')) {
        window.location.href = destination;
      }
    }, 800); // This duration should match the CSS transition (0.8s)
  });
});

