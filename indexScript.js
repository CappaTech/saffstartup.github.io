//
//Back to the top button function
//
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

//
// Front Page Image Slider
//
const sliderImages = document.querySelectorAll('.slider-image');
        let currentSlide = 0;

        function showSlide(n) {
            sliderImages[currentSlide].classList.remove('active');
            currentSlide = (n + sliderImages.length) % sliderImages.length;
            sliderImages[currentSlide].classList.add('active');
        }

        setInterval(() => showSlide(currentSlide + 1), 5000); // Change slide every 5 seconds

//
// MOBILE ONLY, navLinks menu 
//
var navLinks = document.getElementById("navLinks");

function showMenu(){
navLinks.style.right = "0";
}
function hideMenu(){
navLinks.style.right = "-200px";
}

//
// Vertical Smooth scroll
//
var scroll = new SmoothScroll('a[href*="#"]', {
speed: 1000,
speedAsDuration: true
});

//
//Prevent from horizontal scroll
//
function preventHorizontalScroll() {
    // Listen for the scroll event
    window.addEventListener("scroll", function() {
      // Check if the scroll position has changed horizontally
      if (window.pageXOffset !== 0) {
        // If the scroll position is not at the leftmost, reset it to 0
        window.scrollTo(0, window.pageYOffset);
      }
    });
  }