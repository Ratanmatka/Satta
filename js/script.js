document.querySelector('.install-btn').addEventListener('click', function() {
    window.location.href = 'https://ratan365.in/app/ratan365.apk';
});

let currentImageIndex = 0;
const images = document.querySelectorAll('.gallery-image');

function openPopup(index) {
    currentImageIndex = index;
    const popupImage = document.getElementById('popup-image');
    const popupOverlay = document.getElementById('popup-overlay');

    popupOverlay.style.display = 'flex';
    popupImage.src = images[currentImageIndex].src;

    // Add event listeners for touch events
    popupImage.addEventListener('touchstart', handleTouchStart, false);
    popupImage.addEventListener('touchmove', handleTouchMove, false);
}

function closePopup() {
    const popupOverlay = document.getElementById('popup-overlay');
    const popupImage = document.getElementById('popup-image');

    popupOverlay.style.display = 'none';
    popupImage.src = '';  // Clear the image source when closing

    // Remove event listeners when popup is closed
    popupImage.removeEventListener('touchstart', handleTouchStart, false);
    popupImage.removeEventListener('touchmove', handleTouchMove, false);
}

function prevImage(event) {
    event.stopPropagation(); // Prevent closing the popup
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : images.length - 1;
    document.getElementById('popup-image').src = images[currentImageIndex].src;
}

function nextImage(event) {
    event.stopPropagation(); // Prevent closing the popup
    currentImageIndex = (currentImageIndex < images.length - 1) ? currentImageIndex + 1 : 0;
    document.getElementById('popup-image').src = images[currentImageIndex].src;
}

// Variables to track touch positions
let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // Detect horizontal swipe
        if (xDiff > 0) {
            // Swipe left - show next image
            nextImage(evt);
        } else {
            // Swipe right - show previous image
            prevImage(evt);
        }
    }

    // Reset values
    xDown = null;
    yDown = null;
}
