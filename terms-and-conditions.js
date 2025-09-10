//
//Back to the top button function
//
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

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
//Progress bar function
//

//main function
function updateProfressBar(){
  const{scrollTop, scrollHeight} = document.documentElement;
  const scrollPercent = scrollTop / (scrollHeight - window.innerHeight) * 100 + '%';
  //update progress bar width
  document.querySelector('#progress-bar').style.setProperty('--progress', scrollPercent);
}
//event listener fot the scroll
document.addEventListener('scroll', updateProfressBar);

  // Call the function to toggle scrolling behavior when the button is clicked
  toggleScrollOnClick();
