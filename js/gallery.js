/**
 * Gallery Lightbox Modal Logic
 * Enables users to click on images to view them full-screen.
 *
 * NOTE: For this script to function correctly, your main HTML file
 * MUST include the Lightbox modal structure, which looks like this:
 *
 * <div id="lightbox-modal">
 * <button class="close-btn" onclick="closeModal()">×</button>
 * <img id="modal-image" src="" alt="Full-screen image" />
 * </div>
 */

// --- Element Selection ---
const galleryImages = document.querySelectorAll('.img');
const modal = document.getElementById('lightbox-modal');
const modalImage = document.getElementById('modal-image');

// Guard against missing modal structure
if (modal && modalImage) {
    // --- Modal Control Functions ---

    /**
     * Opens the modal with the specified image source.
     * @param {string} imageSrc - The URL of the image to display.
     */
    const openModal = (imageSrc) => {
        modalImage.src = imageSrc;
        modal.style.display = 'flex';
        // Force reflow to ensure smooth transition start
        void modal.offsetWidth; 
        modal.style.opacity = 1;
        document.body.style.overflow = 'hidden'; // Prevents background scrolling
    };

    /**
     * Closes the modal.
     */
    const closeModal = () => {
        modal.style.opacity = 0;
        document.body.style.overflow = ''; // Restores background scrolling
        
        // Use a timeout matching the CSS transition duration (e.g., 300ms)
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    };

    // Make the closeModal function globally available for use in the HTML close button
    window.closeModal = closeModal;

    // --- Event Listeners ---

    // 1. Attach listener to all gallery images
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            openModal(image.src);
        });
    });

    // 2. Close modal when clicking the dark background
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 3. Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
} else {
    console.error("Lightbox Modal elements (#lightbox-modal or #modal-image) not found in HTML. Lightbox functionality is disabled.");
}
