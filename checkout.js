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

// Retrieve cart data from local storage
var cart = JSON.parse(localStorage.getItem("cart")) || [];

// Get the cart items container and total price element
var cartItemsContainer = document.getElementById("cart-items");
var checkoutTotal = document.getElementById("checkout-total");

// Function to update the cart items on the checkout page
function updateCheckoutItems() {
  cartItemsContainer.innerHTML = "";

  cart.forEach(function (item, index) {
    var cartItemElement = document.createElement("div");
    cartItemElement.classList.add("checkout-item");

    var itemImage = document.createElement("img");
    itemImage.src = item.image; // Set the image source
    itemImage.alt = "Product Image";
    itemImage.classList.add("checkout-item-image");

    var itemName = document.createElement("p");
    itemName.classList.add("checkout-item-name-p");
    itemName.textContent = item.name;
    
    var itemPrice = document.createElement("p");
    itemPrice.classList.add("checkout-item-price-p");
    itemPrice.textContent = (item.price * item.quantity).toFixed(2) + "лв.";

    var itemQuantity = document.createElement("input");
    itemQuantity.type = "number";
    itemQuantity.value = item.quantity;
    itemQuantity.id = "quantity";
    itemQuantity.name = "quantity";
    itemQuantity.min = 1;
    itemQuantity.max = 10;
    itemQuantity.step = 1;

   
    itemQuantity.addEventListener("change", function () {
      if (isNaN(itemQuantity.value) || itemQuantity.value < 1) {
        itemQuantity.value = 1;
      }else if (itemQuantity.value > 10){
        itemQuantity.value = 10;
      }
      

    });

itemQuantity.addEventListener("change", function () {
  item.quantity = parseInt(itemQuantity.value);
  itemPrice.textContent = (item.price * item.quantity).toFixed(2) + "лв.";
  saveCartData();
  calculateTotalPrice();
  updateCartCount();
});


    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("checkout-item-button");
    removeButton.addEventListener("click", function () {
      cart.splice(index, 1);
      saveCartData();
      updateCheckoutItems();
      calculateTotalPrice();
      updateCartCount();
    });

    cartItemElement.appendChild(itemImage); // Add the image
    cartItemElement.appendChild(itemName);
    cartItemElement.appendChild(itemPrice);
    cartItemElement.appendChild(itemQuantity);
    cartItemElement.appendChild(removeButton);

    cartItemsContainer.appendChild(cartItemElement);
  });

  calculateTotalPrice();
}

// Function to update the cart count
const cartCount = document.querySelector(".cart-count");
function updateCartCount() {
  var totalCount = cart.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);

  cartCount.textContent = totalCount;
}
// Function to calculate and display the total price
function calculateTotalPrice() {
  var total = cart.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  checkoutTotal.textContent = total.toFixed(2) + "лв.";
}

// Function to save cart data to local storage
function saveCartData() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Call the functions on page load
updateCheckoutItems();
updateCartCount();

//
//Multi-step navigation
//

// Get step elements and buttons
document.addEventListener("DOMContentLoaded", function () {
    // Get all step buttons
    const btnToPayment = document.getElementById("btn-to-payment");
    const btnToCardPayment = document.getElementById("card-payment");
    const btnToDeliveryPayment = document.getElementById("delivery-payment");
    const btnToSummary = document.getElementById("btn-to-summary");
    const btnGoBack = document.getElementById("btn-back");
    
    // Get all checkout step sections
    const stepBilling = document.getElementById("step-billing");
    const stepPayment = document.getElementById("step-payment");
    const stepCardPayment = document.getElementById("payment-with-card");
    const stepSummary = document.getElementById("step-summary");
  
    // Add click event listeners to the buttons
    btnToPayment.addEventListener("click", function (item) {
      if(cart.length > 0){
        stepPayment.classList.remove("hidden");
        btnToPayment.style.display="none";
        btnToSummary.style.display="none";
      }else{
        alert("There are no products added into the cart...");
        window.location.href = "shop.html";
      }
      
    });
  
    btnToCardPayment.addEventListener("click", function () {
      stepCardPayment.classList.remove("hidden");
      stepBilling.classList.add("hidden");
      btnToSummary.style.display="block";
    });

    btnToDeliveryPayment.addEventListener("click", function () {
      stepBilling.classList.remove("hidden");
      stepCardPayment.classList.add("hidden");
      btnToSummary.style.display="block";
    });
    
    btnToSummary.addEventListener("click", function () {
      stepSummary.classList.remove("hidden");
      stepBilling.classList.add("hidden");
      stepPayment.classList.add("hidden");
    });

  });
  
  //
  //Card payment checkboxes script
  //

  // Get the checkboxes and error message element
  const cardAddress2 = document.getElementById("card-payment-DelToAddress");
  const cardOffice2 = document.getElementById("card-payment-DelToOffice");
  const errorMessage = document.getElementById("card-payment-error-message");

  // Add event listeners to checkboxes
  cardAddress2.addEventListener("change", checkCheckboxState);
  cardOffice2.addEventListener("change", checkCheckboxState);

  // Function to check the checkbox state and handle exclusivity
function checkCheckboxState() {
  if (cardAddress2.checked && cardOffice2.checked) {
    cardAddress2.checked = false;
    cardOffice2.checked = false;
  }

  if (cardAddress2.checked || cardOffice2.checked) {
    errorMessage.style.color = "white";
  } else {
    errorMessage.style.color = "red";
  }
}

//
//Delivery payment checkboxes script
//

  // Get the checkboxes and error message element
  const deliveryAddress2 = document.getElementById("delivery-payment-DelToAddress");
  const deliveryOffice2 = document.getElementById("delivery-payment-DelToOffice");
  const errorMessage2 = document.getElementById("delivery-payment-error-message");

  // Add event listeners to checkboxes
  deliveryAddress2.addEventListener("change", checkCheckboxState2);
  deliveryOffice2.addEventListener("change", checkCheckboxState2);

  // Function to check the checkbox state and handle exclusivity
function checkCheckboxState2() {
  if (deliveryAddress2.checked && deliveryOffice2.checked) {
    deliveryAddress2.checked = false;
    deliveryOffice2.checked = false;
  }

  if (deliveryAddress2.checked || deliveryOffice2.checked) {
    errorMessage2.style.color = "white";
  } else {
    errorMessage2.style.color = "red";
  }
}

  //
  //
  //PAYMENT DATA
  //
  //

  const expiryDateInput = document.getElementById("expiry-date");

  expiryDateInput.addEventListener("input", function () {
    const inputValue = this.value;
    if (inputValue.length === 2 && !inputValue.includes("/")) {
      this.value = inputValue + "/";
    }
  });

  document.getElementById("submit-payment").addEventListener("click", function () {
    // Get the credit card data from the form
    const cardNumber = document.getElementById("card-number").value;
    const expirationDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;
  
    // Create a payment token or use a payment gateway library
    // Here's a simplified example using Stripe
    stripe.createToken(cardNumber, expirationDate, cvv).then(function(result) {
      if (result.error) {
        // Handle errors, show error message to the user
        console.error(result.error.message);
      } else {
        // Send the payment token to your server for processing
        const paymentToken = result.token.id;
        // Make an API request to your server with the payment token
        // Your server will then process the payment through the payment gateway
        // and handle the authorization and transaction
      }
    });
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
