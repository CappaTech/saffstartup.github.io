   // Get the "Add to Cart" buttons, cart items container, and cart button
const cartMain = document.getElementById("cart");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.getElementById("cart-item");
const cartButton = document.getElementById("cart-button");
const cartCount = document.querySelector(".cart-count");
const cartTotalPrice = document.querySelector(".cart-total-price");
const cartOverlay = document.getElementById("cart-overlay");

// Retrieve the cart data and total price from localStorage or initialize empty values
var cart = JSON.parse(localStorage.getItem("cart")) || [];
var totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;




// Bind event listeners to each "Add to Cart" button
addToCartButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    // Get the product details
    var productContainer = event.target.parentNode;
    var productName = productContainer.querySelector("h2").textContent;
    var productPrice = parseFloat(productContainer.querySelector(".price").textContent.replace("Price: $", ""));
    var productImage = productContainer.querySelector("img").src;

    // Create a new product object
    var product = {
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    };

    // Check if the product already exists in the cart
    var existingProduct = cart.find(function (item) {
      return item.name === productName;
    });

    if (existingProduct) {
      // If the product already exists, increase the quantity
      existingProduct.quantity++;
    } else {
      // Otherwise, add the product to the cart
      cart.push(product);
    }

    // Update the cart items display
    updateCartItems();

    // Update the cart count
    updateCartCount();

    // Save the cart data and total price to localStorage
    saveCartData();
    saveTotalPrice();

    // Calculate and display the total price
    calculateTotalPrice();
  });
});

// Bind event listener to the cart button
cartButton.addEventListener("click", function () {
  // Check if the cart is empty
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "";
    var emptyCartDiv = document.createElement("div");
    emptyCartDiv.classList.add("empty-Cart-Message");
    emptyCartDiv.textContent = "Your cart is empty";
    cartItemsContainer.appendChild(emptyCartDiv);
    cartItemsContainer.classList.toggle("show");
    cartMain.classList.toggle("show");
    cartOverlay.classList.toggle("show")
  } else {
    // Toggle the display of cart items container
    cartItemsContainer.classList.toggle("show");
    cartMain.classList.toggle("show");
    cartOverlay.classList.toggle("show")
    
  }
});

    // Function to update the cart items display
    function updateCartItems() {
        // Clear the existing cart items
        cartItemsContainer.innerHTML = "";
      
        // Check if the cart is empty
        if (cart.length === 0) {
          var emptyCartDiv = document.createElement("div");
          emptyCartDiv.classList.add("empty-Cart-Message");
          emptyCartDiv.textContent = "Your cart is empty";
          cartItemsContainer.appendChild(emptyCartDiv);
      
          // Hide the cart items container
          cartItemsContainer.classList.remove("show");
          cartMain.classList.remove("show");
          cartOverlay.classList.remove("show");
        } else {
          // Iterate over the cart array and display each item
          cart.forEach(function (item, index) {
            
            var itemElement = document.createElement("div");
            itemElement.classList.add("cart-item-container");

            var imageElement = document.createElement("img");
            imageElement.src = item.image; // Set the image source
            imageElement.alt = "Product Image";
            imageElement.classList.add("cart-item-image");

            var itemElement2 = document.createElement("div");
            itemElement2.classList.add("cart-item-details");

            var cartItemName = document.createElement("h4");
            cartItemName.classList.add("cart-item-name");
            cartItemName.textContent = item.name;

            var cartItemPrice  = document.createElement("span");
            cartItemPrice.classList.add("cart-item-price");
            cartItemPrice.textContent = " - $" + item.price.toFixed(2);

            var quantityContainer = document.createElement("div");
            quantityContainer.classList.add("cart-item-quantity");
      
            var decreaseButton = document.createElement("button");
            decreaseButton.textContent = "-";
            decreaseButton.classList.add("quantity-decrease");
            decreaseButton.addEventListener("click", function () {
              // Decrease the quantity
              if (item.quantity > 1) {
                item.quantity--;
                updateCartItems();
                updateCartCount();
                saveCartData();
                calculateTotalPrice();
              }
            });
      
            var quantityValue = document.createElement("span");
            quantityValue.textContent = item.quantity;
      
            var increaseButton = document.createElement("button");
            increaseButton.textContent = "+";
            increaseButton.classList.add("quantity-increase");
            
            increaseButton.addEventListener("click", function () {
              // Increase the quantity
              if (!isNaN(item.quantity)) {
                item.quantity = parseInt(item.quantity, 10) + 1;
              } else {
                item.quantity = 1;
              }
              updateCartItems();
              updateCartCount();
              saveCartData();
              calculateTotalPrice();
            });
            cartItemsContainer.appendChild(itemElement);
            itemElement.appendChild(imageElement);
            itemElement.appendChild(itemElement2)
            itemElement2.appendChild(cartItemName);
            itemElement2.appendChild(cartItemPrice);
            itemElement2.appendChild(quantityContainer);
            quantityContainer.appendChild(decreaseButton);
            quantityContainer.appendChild(quantityValue);
            quantityContainer.appendChild(increaseButton);
            
            

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Remove";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", function () {
              // Remove the item from the cart array
              cart.splice(index, 1);
      
              // Update the cart items display
              updateCartItems();
              // Check if the cart is empty
              if (cart.length === 0) {
                cartItemsContainer.innerHTML = "";
                var emptyCartDiv = document.createElement("div");
                emptyCartDiv.classList.add("empty-Cart-Message");
                emptyCartDiv.textContent = "Your cart is empty";
                cartItemsContainer.appendChild(emptyCartDiv);
                cartItemsContainer.classList.toggle("show");
                cartMain.classList.toggle("show");
                cartOverlay.classList.toggle("show")
              }
              // Update the cart count
              updateCartCount();
      
              // Save the cart data and total price to localStorage
              saveCartData();
              saveTotalPrice();
      
              // Calculate and display the total price
              calculateTotalPrice();
              quantityValue.textContent = "0";

              

            });
      
            itemElement2.appendChild(deleteButton);
            cartItemsContainer.appendChild(itemElement);
            
            
          });
      
        }
      
      // Calculate and display the total price
      calculateTotalPrice();
      // Check if cart is empty and display checkout button or empty message
      // Attach event listener to the checkout button
      var checkoutButton = document.querySelector(".checkout-button");
      if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
          if (cart.length > 0) {
            // Perform checkout functionality
            window.location.href = "checkout.html";
          } else {
            // Display alert if cart is empty
            alert("There are no products added in the cart...");
          }
        });
}

      
      
}
  

// Function to update the cart count
function updateCartCount() {
  var totalCount = cart.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);

  cartCount.textContent = totalCount;
}

// Function to save the cart data to localStorage
function saveCartData() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to save the total price to localStorage
function saveTotalPrice() {
  localStorage.setItem("totalPrice", totalPrice.toFixed(2));
}

// Function to calculate the total price
function calculateTotalPrice() {
  totalPrice = cart.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  // Save the total price to localStorage
  saveTotalPrice();

  // Display the total price
  cartTotalPrice.textContent = "$" + totalPrice.toFixed(2);
}

// On page load, update the cart items and count
updateCartItems();
updateCartCount();
    


//
//Price range slide bar
//

document.addEventListener("DOMContentLoaded", function() {
// Get the price range input and price value element
var priceRange = document.getElementById("price");
var priceValue = document.getElementById("price-value");

// Update the price value when the price range input value changes
priceRange.addEventListener("input", function() {
    var minPrice = 10; // Minimum price value
    var maxPrice = 100; // Maximum price value
    var selectedPrice = parseInt(priceRange.value);

    // Calculate the actual price range based on the input value
    var actualMinPrice = minPrice + Math.floor((selectedPrice / 100) * (maxPrice - minPrice));
     var actualMaxPrice = maxPrice;

    // Update the price value element with the selected price range
     priceValue.textContent = "$" + actualMinPrice + " - $" + actualMaxPrice;
 });
});

//
// Sector Filters
//

document.addEventListener("DOMContentLoaded", function() {
    // Get the form and apply filters button
    var form = document.querySelector("form");
    var applyFiltersButton = document.querySelector("#apply-filters");

    // Add event listener to the "Apply Filters" button
    applyFiltersButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get the selected category and price range values
        var selectedCategory = document.querySelector("#category").value;
        var selectedPriceRange = document.querySelector("#price").value;

        // Perform filtering logic based on the selected values
        // ...
        // Replace this code with your own filtering logic
        // For example, you can hide/show products based on category and price range

        // Display filtered results or update the page accordingly
        // ...
        // Replace this code with your own code to display filtered results
    });
});

//
//Scroll to the top function
//

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

//
//Navigation Bar functions for mobile + Smooth scrolling function
//

var navLinks = document.getElementById("navLinks");
		function showMenu(){
		navLinks.style.right = "0";
		}
		function hideMenu(){
		navLinks.style.right = "-200px";
		}
		var scroll = new SmoothScroll('a[href*="#"]', {
		speed: 1000,
		speedAsDuration: true
		});

//
//Checkout Page
//

//
//next button function
//
// Get the "Next" button elements
var nextButtons = document.querySelectorAll(".next-button");

// Add event listeners to each "Next" button
  nextButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Find the current active step
      var currentStep = button.closest(".step");
        
      // Find the next step
      var nextStep = currentStep.nextElementSibling;
        
      // Validate the current step (if needed)
      var isValid = validateStep(currentStep);
        
      // If the current step is valid, move to the next step
      if (isValid) {
        // Hide the current step
        currentStep.classList.remove("active");
          
        // Show the next step
        nextStep.classList.add("active");
      }
    });
  });

  // Function to validate the current step (placeholder, replace with your validation logic)
  function validateStep(step) {
    // Add your validation logic here
    return true; // Return true if the step is valid, or false if it's not
  }
  
//
// JavaScript function to toggle scrolling behavior when the button is clicked
//

function toggleScrollOnClick() {
  const preventScrollButton = document.getElementById("cart-button");
  const preventScrollButton2 = document.getElementById("show-menu-button");
  const preventScrollButton3 = document.getElementById("hide-menu-button");
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
  preventScrollButton2.addEventListener("click", function (event) {
    event.preventDefault();

    if (isScrollingPrevented) {
      document.body.style.overflow = "auto"; // Enable scrolling by setting overflow to 'auto'
      isScrollingPrevented = false;
    } else {
      document.body.style.overflow = "hidden"; // Prevent scrolling by hiding the overflow
      isScrollingPrevented = true;
    }
  });
  preventScrollButton3.addEventListener("click", function (event) {
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
