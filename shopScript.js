   // Get the "Add to Cart" buttons, cart items container, and cart button
const cartMain = document.getElementById("cart");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.getElementById("cart-item");
const cartButton = document.getElementById("cart-button");
const cartCount = document.querySelector(".cart-count");
const cartTotalPrice = document.querySelector(".cart-total-price");
const cartOverlay = document.getElementById("cart-overlay");
const emptyCartDivEffect = document.querySelector(".emptyCartEffect");


// Retrieve the cart data and total price from localStorage or initialize empty values
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;




// Bind event listeners to each "Add to Cart" button
addToCartButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    // Get the product details
    let productContainer = event.target.parentNode;
    let productName = productContainer.querySelector("h2").textContent;
    let productPrice = parseFloat(productContainer.querySelector(".price").textContent.replace("Price: $", ""));
    let productImage = productContainer.querySelector("img").src;

    // Create a new product object
    let product = {
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    };

    // Check if the product already exists in the cart
    let existingProduct = cart.find(function (item) {
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
    let emptyCartDiv = document.createElement("div");
    emptyCartDiv.classList.add("empty-Cart-Message");
    emptyCartDiv.textContent = "Your cart is empty";
    cartItemsContainer.appendChild(emptyCartDiv);
     // Toggle the display of the div
  if (cartMain.style.display === "none") {
    cartMain.style.display = "block";
    cartItemsContainer.style.display = "block";
    cartOverlay.style.display = "block"; // Show the div
  } else {
    cartMain.style.display = "none";
    cartItemsContainer.style.display = "none";
    cartOverlay.style.display = "none"; // Hide the div
  }
  } else {
    // Toggle the display of cart items container
    if (cartMain.style.display === "none" || cartMain.style.display === "") {
      cartMain.style.display = "block";
      cartItemsContainer.style.display = "block";
      cartOverlay.style.display = "block"; // Show the div
    } else {
      cartMain.style.display = "none";
      cartItemsContainer.style.display = "none";
      cartOverlay.style.display = "none"; // Hide the div
    }
  }
});

    // Function to update the cart items display
    function updateCartItems() {
        // Clear the existing cart items
        cartItemsContainer.innerHTML = "";
      
        // Check if the cart is empty
        if (cart.length === 0) {
          let emptyCartDiv = document.createElement("div");
          emptyCartDiv.classList.add("empty-Cart-Message");
          emptyCartDiv.textContent = "Your cart is empty";
          cartItemsContainer.appendChild(emptyCartDiv);
      
          // Hide the cart items container
          if (cartMain.style.display === "none") {
            cartMain.style.display = "block";
            cartItemsContainer.style.display = "block";
            cartOverlay.style.display = "block"; // Show the div
          } else {
            cartMain.style.display = "none";
            cartItemsContainer.style.display = "none";
            cartOverlay.style.display = "none"; // Hide the div
          }
        } else {
          // Iterate over the cart array and display each item
          cart.forEach(function (item, index) {
            
            let itemElement = document.createElement("div");
            itemElement.classList.add("cart-item-container");

            let imageElement = document.createElement("img");
            imageElement.src = item.image; // Set the image source
            imageElement.alt = "Product Image";
            imageElement.classList.add("cart-item-image");

            let itemElement2 = document.createElement("div");
            itemElement2.classList.add("cart-item-details");

            let cartItemName = document.createElement("h4");
            cartItemName.classList.add("cart-item-name");
            cartItemName.textContent = item.name;

            let cartItemPrice  = document.createElement("span");
            cartItemPrice.classList.add("cart-item-price");
            cartItemPrice.textContent = " - $" + item.price.toFixed(2);

            let quantityContainer = document.createElement("div");
            quantityContainer.classList.add("cart-item-quantity");
      
            let decreaseButton = document.createElement("button");
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
      
            let quantityValue = document.createElement("span");
            quantityValue.textContent = item.quantity;
      
            let increaseButton = document.createElement("button");
            increaseButton.textContent = "+";
            increaseButton.classList.add("quantity-increase");
            
            increaseButton.addEventListener("click", function () {
              // Increase the quantity
              item.quantity++;
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
            
            

            let deleteButton = document.createElement("button");
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
                let emptyCartDiv = document.createElement("div");
                emptyCartDiv.classList.add("empty-Cart-Message");
                emptyCartDiv.textContent = "Your cart is empty";
                cartItemsContainer.appendChild(emptyCartDiv);
                if (cartMain.style.display === "none") {
                  cartMain.style.display = "block";
                  cartItemsContainer.style.display = "block";
                  cartOverlay.style.display = "block"; // Show the div
                } else {
                  cartMain.style.display = "none";
                  cartItemsContainer.style.display = "none";
                  cartOverlay.style.display = "none"; // Hide the div
                }
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
      let checkoutButton = document.querySelector(".checkout-button");
      
      if (checkoutButton) {
        
        checkoutButton.addEventListener("click", function () {
          
          if (cart.length > 0) {
            // Perform checkout functionality
            window.location.href = "checkout.html";
          } else {
            emptyCartDivEffect.display = "block";
            emptyCartDivEffect.style.animation = "shake 1.5s";
            cartItemsContainer.appendChild(emptyCartDivEffect);
            setTimeout ( function(){emptyCartDivEffect.display = "none";}, 3000);
            }
        });
}
}
      
// Function to update the cart count
function updateCartCount() {
  let totalCount = cart.reduce(function (sum, item) {
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

		let scroll = new SmoothScroll('a[href*="#"]', {
		speed: 1000,
		speedAsDuration: true
		});

//
//Prevent from scrolling function
//
toggleScrollOnClick([document.getElementById("cart-button")]);



//
//
//CHECKOUT PAGE
//
//



//
// Retrieve the cart data and total price from localStorage or initialize empty values
let cashoutItems = JSON.parse(localStorage.getItem("cart")) || [];
let cashoutTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

