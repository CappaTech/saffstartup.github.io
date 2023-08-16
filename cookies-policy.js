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


  
  
  
  