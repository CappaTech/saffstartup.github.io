//
//Navigation Bar functions for mobile + Smooth scrolling function
//

var scroll = new SmoothScroll('a[href*="#"]', {
speed: 1000,
speedAsDuration: true
});
toggleScrollOnClick();

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
    const btnPlaceOrder = document.getElementById("btn-place-order");

    let selectedPaymentMethod = "";
    
    // Get all checkout step sections
    const stepBilling = document.getElementById("step-billing");
    const stepPayment = document.getElementById("form");
    const stepCardPayment = document.getElementById("step-payment");
    const stepSummary = document.getElementById("step-summary");

    //
    //loading animation script
    //
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadedContent = document.getElementById('loadedContent');

    //btnToPayment.addEventListener('click', () => {
    //  loadingOverlay.classList.remove('hidden');
    //  setTimeout(() => {
    //    loadingOverlay.classList.add('hidden');
    //    loadedContent.classList.remove('hidden');
    //  }, 3000);
    //});

    // Add click event listeners to the buttons
    btnToPayment.addEventListener("click", function (item) {
      if(cart.length > 0){
        loadingOverlay.classList.remove('hidden');
        setTimeout(() => {
          loadingOverlay.classList.add('hidden');
          stepPayment.classList.remove("hidden");
          btnToPayment.style.display="none";
          btnToSummary.style.display="none";
        }, 1500);
        
      }else{
        alert("There are no products added into the cart...");
        window.location.href = "shop.html";
      }
      
    });
  
    btnToCardPayment.addEventListener("click", function () {
      selectedPaymentMethod = 'card';
      stepCardPayment.classList.remove("hidden");
      stepBilling.classList.add("hidden");
      btnToSummary.style.display="block";
    });

    btnToDeliveryPayment.addEventListener("click", function () {
      selectedPaymentMethod = 'delivery';
      stepBilling.classList.remove("hidden");
      stepCardPayment.classList.add("hidden");
      btnToSummary.style.display="block";
    });

    function generateOrderSummary() {
      const itemsContainer = document.getElementById('summary-items');
      const customerContainer = document.getElementById('summary-customer');
      const totalContainer = document.getElementById('summary-total');

      itemsContainer.innerHTML = '';
      customerContainer.innerHTML = '';

      const itemsList = document.createElement('ul');
      cart.forEach(function (item) {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}лв.`;
        itemsList.appendChild(li);
      });
      itemsContainer.appendChild(itemsList);

      const activeForm = selectedPaymentMethod === 'card' ? document.getElementById('payment-form') : document.getElementById('billing-form');
      const firstName = activeForm.querySelector('#first-name').value;
      const lastName = activeForm.querySelector('#last-name').value;
      const phone = activeForm.querySelector('#phone-number').value;
      const email = activeForm.querySelector('#e-mail').value;
      const city = activeForm.querySelector('#city').value;
      const address = activeForm.querySelector('#address').value;
      const zip = activeForm.querySelector('#zip').value;

      let shippingMethod = '';
      if (selectedPaymentMethod === 'card') {
        if (document.getElementById('card-payment-DelToAddress').checked) {
          shippingMethod = 'Delivery to address';
        } else if (document.getElementById('card-payment-DelToOffice').checked) {
          shippingMethod = 'Delivery to office';
        }
      } else {
        if (document.getElementById('delivery-payment-DelToAddress').checked) {
          shippingMethod = 'Delivery to address';
        } else if (document.getElementById('delivery-payment-DelToOffice').checked) {
          shippingMethod = 'Delivery to office';
        }
      }

      const infoList = document.createElement('ul');
      infoList.innerHTML =
        `<li>Name: ${firstName} ${lastName}</li>` +
        `<li>Phone: ${phone}</li>` +
        `<li>Email: ${email}</li>` +
        `<li>City: ${city}</li>` +
        `<li>Address: ${address}</li>` +
        `<li>ZIP: ${zip}</li>` +
        `<li>Payment Method: ${selectedPaymentMethod === 'card' ? 'Card payment' : 'Cash on delivery'}</li>` +
        `<li>Shipping: ${shippingMethod}</li>`;
      customerContainer.appendChild(infoList);

      const total = cart.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
      }, 0);
      totalContainer.textContent = 'Total: ' + total.toFixed(2) + 'лв.';
    }
    //
    //Function to check if required fields are filled
    // 
    function checkRequiredFields() {
      const requiredFieldsBillingForm = document.querySelectorAll('#billing-form [required]');
      const requiredFieldsPaymentForm = document.querySelectorAll('#payment-form [required]');
      let isFormValid = true;
    if(stepBilling.classList.contains('hidden')){
      requiredFieldsPaymentForm.forEach(function(field) {
        if (!field.value.trim()) {
          isFormValid = false;
          field.classList.add('error'); // Add error class to the field
        } else {
          field.classList.remove('error'); // Remove error class if field is filled
        }
      });
      if (!isFormValid) {
        alert('Please fill in all required fields.');
      }else{
        loadingOverlay.classList.remove('hidden');
        setTimeout(() => {
          loadingOverlay.classList.add('hidden');
          stepSummary.classList.remove("hidden");
          stepBilling.classList.add("hidden");
          stepPayment.classList.add("hidden");
          generateOrderSummary();
        }, 3000);
      }
    }
   if (stepCardPayment.classList.contains('hidden')){
      requiredFieldsBillingForm.forEach(function(field) {
        if (!field.value.trim()) {
          isFormValid = false;
          field.classList.add('error'); // Add error class to the field
        } else {
          field.classList.remove('error'); // Remove error class if field is filled
        }
      });
      if (!isFormValid) {
        alert('Please fill in all required fields.');
      }else{
        loadingOverlay.classList.remove('hidden');
        setTimeout(() => {
          loadingOverlay.classList.add('hidden');
          stepSummary.classList.remove("hidden");
          stepBilling.classList.add("hidden");
          stepPayment.classList.add("hidden");
          generateOrderSummary();
        }, 3000);
      }
    }else{
      return 0;
    }
      return isFormValid;
    }
    // Add click event listener to the "Order Summary" button
    btnToSummary.addEventListener('click', function(event) {
      if (!checkRequiredFields()) {
        event.preventDefault(); // Prevent submitting the form
      }
    });

    btnGoBack.addEventListener('click', function () {
      stepSummary.classList.add('hidden');
      if (selectedPaymentMethod === 'card') {
        stepPayment.classList.remove('hidden');
      } else {
        stepBilling.classList.remove('hidden');
      }
    });

    btnPlaceOrder.addEventListener('click', function () {
      alert('Thank you for your order!');
      localStorage.removeItem('cart');
      window.location.href = 'index.html';
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

