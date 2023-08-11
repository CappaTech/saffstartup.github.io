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
//Function for poping up the scroll-to-top button
//
window.addEventListener("scroll", function () {
  const toTheTop = document.getElementById("to-the-top");
  let section = document.getElementById("front-page"); 

  // Get the height of the next section
  const sectionHeight = section.offsetHeight;
  // Get the current scroll position
  const scrollPosition = window.scrollY;

  // Add or remove the "scrolled" class based on the scroll position
  if (scrollPosition >= sectionHeight) {
    toTheTop.style.display = "block";
  } else {
    toTheTop.style.display = "none";
  }
});


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

//
//Switching background when they are scrolled to a section "in this case #front-page"
//
window.addEventListener("scroll", function () {
  const scrollDownPopUpMessagedocument=document.querySelector(".popup-scroll-down-message");
  const navbar = document.querySelector(".headBar");
  let section = document.querySelector("#front-page"); 


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
  const preventScrollButton4 = document.querySelector(".navbox-socials-button");
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
  //The following code is for navilinks socials button which triggers this function
  preventScrollButton4.addEventListener("click", function (event) {
    event.preventDefault();
    function isMobileDevice() {
      return window.innerWidth <= 768; // You can adjust the width threshold for your use case
    }
    if (isMobileDevice()) {
      if (isScrollingPrevented) {
        document.body.style.overflow = "auto"; // Enable scrolling by setting overflow to 'auto'
        isScrollingPrevented = false;
      } else {
        document.body.style.overflow = "hidden"; // Prevent scrolling by hiding the overflow
        isScrollingPrevented = true;
      }
      hideMenu();
      function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
      scrollToSection('contacts');
    }else{
      function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
      scrollToSection('contacts');
    }
  });
}

// Call the function to toggle scrolling behavior when the button is clicked
toggleScrollOnClick();
