const navLinks = document.getElementById("navLinks");

export function showMenu() {
  navLinks.style.right = "0";
}

export function hideMenu() {
  navLinks.style.right = "-200px";
}

export function toggleScrollOnClick(extraButtons = []) {
  const preventScrollButton = document.getElementById("show-menu-button");
  const preventScrollButton1 = document.getElementById("hide-menu-button");
  const preventScrollButton4 = document.querySelector(".navbox-socials-button");
  const buttons = [preventScrollButton, preventScrollButton1, ...extraButtons];
  let isScrollingPrevented = false;

  function toggleScroll() {
    if (isScrollingPrevented) {
      document.body.style.overflow = "auto";
      isScrollingPrevented = false;
    } else {
      document.body.style.overflow = "hidden";
      isScrollingPrevented = true;
    }
  }

  buttons.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        toggleScroll();
      });
    }
  });

  if (preventScrollButton4) {
    preventScrollButton4.addEventListener("click", function (event) {
      event.preventDefault();
      function isMobileDevice() {
        return window.innerWidth <= 768;
      }
      if (isMobileDevice()) {
        toggleScroll();
        hideMenu();
        scrollToSection("contacts");
      } else {
        scrollToSection("contacts");
      }
    });
  }

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
}

window.showMenu = showMenu;
window.hideMenu = hideMenu;
