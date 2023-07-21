const menuOverlay = document.getElementById("menu-overlay");

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
//const sliderImages = document.querySelectorAll('.slider-image');
//        let currentSlide = 0;
//
//        function showSlide(n) {
//            sliderImages[currentSlide].classList.remove('active');
//            currentSlide = (n + sliderImages.length) % sliderImages.length;
//            sliderImages[currentSlide].classList.add('active');
//        }
//
//        setInterval(() => showSlide(currentSlide + 1), 5000); // Change slide every 5 seconds
//
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

//
//Switching background when they are scrolled to a section "in this case #front-page"
//
window.addEventListener("scroll", function () {
  const scrollDownPopUpMessagedocument=document.querySelector(".popup-scroll-down-message");
  const navbar = document.querySelector(".headBar");
  const section = document.querySelector("#front-page"); // Replace "next-section" with the ID of the section you want to scroll to

  // Get the height of the next section
  const sectionHeight = section.offsetHeight;
  // Get the current scroll position
  const scrollPosition = window.scrollY;

  // Add or remove the "scrolled" class based on the scroll position
  if (scrollPosition >= sectionHeight) {
    navbar.classList.add("scrolled");
    scrollDownPopUpMessagedocument.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
    scrollDownPopUpMessagedocument.remove("scrolled");
  }
});

//
// JavaScript function to toggle scrolling behavior when the button is clicked
//

function toggleScrollOnClick() {
  const preventScrollButton = document.getElementById("show-menu-button");
  const preventScrollButton1 = document.getElementById("hide-menu-button");
  let isScrollingPrevented = false;

  preventScrollButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (isScrollingPrevented) {
      document.body.style.overflow = "auto"; // Enable scrolling by setting overflow to 'auto'
      isScrollingPrevented = false;
    } else {
      document.body.style.overflow = "hidden"; // Prevent scrolling by hiding the overflow
      isScrollingPrevented = true;
    }
  });
  preventScrollButton1.addEventListener("click", function (event) {
    event.preventDefault();

    if (isScrollingPrevented) {
      document.body.style.overflow = "auto"; // Enable scrolling by setting overflow to 'auto'
      isScrollingPrevented = false;
    } else {
      document.body.style.overflow = "hidden"; // Prevent scrolling by hiding the overflow
      isScrollingPrevented = true;
    }
  });
}

// Call the function to toggle scrolling behavior when the button is clicked
toggleScrollOnClick();
