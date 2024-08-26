document.addEventListener('DOMContentLoaded', () => {
    const reviewsHeader = document.getElementById('reviews-header');
    const reviewsList = document.getElementById('reviews-list');
    const toggleArrow = document.getElementById('toggle-arrow');

    reviewsHeader.addEventListener('click', () => {
        reviewsList.classList.toggle('show');
        toggleArrow.classList.toggle('rotate');
    });

    var modal = document.getElementById("upload-modal");
    var btn = document.getElementById("upload-btn");
    var closeBtn = document.getElementById("close-modal");

    // Show the modal when the upload button is clicked
    btn.onclick = function () {
        modal.style.display = "flex";
    }

    // Hide the modal when the close button is clicked
    closeBtn.onclick = function () {
        modal.style.display = "none";
    }

    // Hide the modal when clicking outside of the modal content
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

});