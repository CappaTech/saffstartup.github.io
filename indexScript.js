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

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 4,
  centeredSlides: true,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});



//
// Vertical Smooth scroll
//
let scroll = new SmoothScroll('a[href*="#"]', {
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
  const scrollDownPopUpMessagedocument = document.querySelector(".popup-scroll-down-message");
  const navbar = document.querySelector(".headBar");
  let section = document.querySelector("#front-page"); 


  // Get the height of the next section
  const sectionHeight = section.offsetHeight;
  // Get the current scroll position
  const scrollPosition = window.scrollY;

  // Add or remove the "scrolled" class based on the scroll position
  if (scrollPosition >= sectionHeight) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

//This function reveals elements in a section that is reached while scrolling
function reveal() {
  let reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// Call the function to toggle scrolling behavior when the button is clicked
toggleScrollOnClick();

//
//COOKIES
//
document.addEventListener("DOMContentLoaded", function () {
  const acceptAllBtn = document.querySelector(".cc_btn_accept_all");
  const closeBtn = document.querySelector(".ajs_close");
  const ccContainer = document.querySelector(".cc_container");
  const ccOverlay = document.querySelector(".cc_overlay");
  const ccMoreInfo = document.querySelector(".cc_more_info");
  const ccMoreInfo2 = document.querySelector(".cc_more_info2");

  // Function to set a cookie
  function setCookie(name, value, expires) {
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  // Function to check the value of a cookie
  function getCookieValue(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }

  // Function to hide ccContainer if the cookie value is true
  function hideContainerIfCookieTrue() {
    if (getCookieValue("myCookie") === "true") {
      ccContainer.classList.remove("active");
      ccOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }else{
      ccContainer.classList.add("active");
      ccOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  // Call the function when the page loads
  hideContainerIfCookieTrue();

  // Hide the cc_container when acceptAllBtn is clicked
  acceptAllBtn.addEventListener("click", function () {
    ccContainer.classList.remove("active");
    ccOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
    setCookie("myCookie", "true", new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString());
  });

  // Hide the cc_container when closeBtn is clicked and set session cookie
  closeBtn.addEventListener("click", function () {
    ccContainer.classList.remove("active");
    ccOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
    setCookie("myCookie", "false", "session");
  });
  // Hide the cc_container when ccMoreInfo (ahref) is clicked and set session cookie
  ccMoreInfo.addEventListener("click", function () {
    ccContainer.classList.remove("active");
    ccOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
    setCookie("myCookie", "false", "session");
  });
  // Hide the cc_container when ccMoreInfo2 (ahref) is clicked and set session cookie
  ccMoreInfo2.addEventListener("click", function () {
    ccContainer.classList.remove("active");
    ccOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
    setCookie("myCookie", "false", "session");
  });
});

