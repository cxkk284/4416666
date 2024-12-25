// Jatxon
function create() {  
    var username = document.getElementById('username').value;  
    var password = document.getElementById('password').value;  
  
    // Simple client verification  
    if (username === '' || password === '') {  
        alert('Please fill in both username and password.');  
        return;  
    }  
  
    // Assuming successful verification, store username and password  
    localStorage.setItem('username', username);  
    localStorage.setItem('password', password);  
    // Set expiration time (only storing timestamps here, additional logic is needed to check for expiration)  
    localStorage.setItem('expiration', new Date().getTime() + 3 * 24 * 60 * 60 * 1000); // Expires in 3 days  
  
    // Prompt the user for successful registration and redirect to the login page (if necessary)  
    alert('Registration successful!');  
    window.location.href = 'login.html'; // Assuming you have a login.HTML as the login page  
}
function login() {  
    var loginUsername = document.getElementById('loginUsername').value;  
    var loginPassword = document.getElementById('loginPassword').value;  
  
    // Attempt to obtain username and password from localStorage  
    var storedUsername = localStorage.getItem('username');  
    var storedPassword = localStorage.getItem('password');  
    // Assuming that the logic of the expiration has already been processed on the server side, we will not check it again here  
  
    // If the user has not entered their username and password and has already remembered them (assuming they are always valid)  
    if (loginUsername === '' && loginPassword === '') {  
        if (storedUsername && storedPassword) {  
            // This is just a simulation of the client, and there will be server validation in practical applications  
            alert('Auto login successful!');  
            // Hide login container and display shopping cart page  
            hideLoginShowShopping();  
            return;  
        }  
    }  
  
    // The username or password is empty, or manually entered by the user  
    if (loginUsername !== '' && loginPassword !== '') {  
        // The username and password have been entered for login verification (this is only a simulation)  
        if (loginUsername === storedUsername && loginPassword === storedPassword) {  
            alert('Login successful!');  
            // Hide login container and display shopping cart page 
            hideLoginShowShopping();  
        } else {  
            alert('The username or password is incorrect!');  
        }  
    } else {  
        alert('Please provide your username and password.');  
    }  
  
    // Auxiliary function: Hide login container and display shopping cart page  
    function hideLoginShowShopping() {  
        var loginContainer = document.getElementById('loginContainer');  
        var shoppingPage = document.getElementById('shoppingPage');  
        loginContainer.style.display = 'none';  
        shoppingPage.style.display = 'block';  
    }  
}

document.addEventListener('DOMContentLoaded', function() {  
    var logoutButton = document.getElementById('logoutButton');  
  
    logoutButton.addEventListener('click', function() {  
        // Delete username variable from localStorage  
        localStorage.removeItem('username');  
          
        // You can add some additional logic here, such as prompting the user to log out  
        alert('Logged out, the username variable in localStorage has been deleted.');  
    });  
  
});



 
document.addEventListener('DOMContentLoaded', function() {  
    i18n.init({  
        lng: 'en',  
        resources: {  
            en: {  
                translation: {  
                    attachmentLabel: 'Attachment (optional):'  
                }  
            },  
            
            fr: {  
                translation: {  
                    attachmentLabel: 'Pièce jointe (facultatif):'  
                }  
            }  
        },  
        interpolation: {  
            escapeValue: false  
        }  
    }, function(err, t) {  
        if (err) {  
            console.error('i18n initialization failed:', err);  
        } else {  
            document.querySelector('#attachmentLabel').textContent = t('attachmentLabel');  
        }  
    });  
});  


  
  // script.js  
  document.addEventListener('DOMContentLoaded', () => {    
    const products = document.querySelectorAll('.product');    
    const productTotals = document.getElementById('product-totals');    
    const totalPrice = document.getElementById('total-price');    
    const purchaseButton = document.getElementById('purchase-button');    
    const clearCartButton = document.getElementById('clear-cart-button');    
    
    let cart = [];   
  
    function updateCartSummary() {  
        let total = 0;  
        productTotals.innerHTML = '';  
        cart.forEach((item, index) => {  
            const product = products[item.index];  
            const price = parseFloat(product.getAttribute('data-price'));  
            const quantity = item.quantity;  
            total += price * quantity;  
  
            const productDiv = document.createElement('div');  
            productDiv.innerHTML = `  
                <h3>${product.querySelector('h2').textContent}</h3>  
                <p>Quantity: ${quantity}</p>  
                <p>Price: $${price * quantity}</p>  
                <button class="remove-from-cart" data-cart-index="${index}">Delete</button>  
            `;  
            productTotals.appendChild(productDiv);  
  
            const removeButton = productDiv.querySelector('.remove-from-cart');  
            removeButton.addEventListener('click', () => {  
                cart.splice(index, 1);  
                updateCartSummary();  
            });  
        });  
  
        totalPrice.textContent = total.toFixed(2);  
        purchaseButton.disabled = cart.length === 0;  
    }  
  
    products.forEach((product, index) => {  
        const addToCartButton = product.querySelector('.add-to-cart');  
        const quantityInput = product.querySelector('.quantity');  
        const removeButton = product.querySelector('.remove');  
  
        addToCartButton.addEventListener('click', () => {  
            const quantity = parseInt(quantityInput.value, 10);  
            if (quantity > 0) {  
                const existingItem = cart.find(item => item.index === index);  
                if (existingItem) {  
                    existingItem.quantity += quantity;  
                } else {  
                    cart.push({ index, quantity });  
                }  
                updateCartSummary();  
                addButton.style.display = 'none';  
                removeButton.style.display = 'block';  
            }  
        });  
  
        quantityInput.addEventListener('input', () => {  
            const quantity = parseInt(quantityInput.value, 10);  
            if (quantity === 0) {  
                const existingItem = cart.find(item => item.index === index);  
                if (existingItem) {  
                    cart.splice(cart.indexOf(existingItem), 1);  
                    updateCartSummary();  
                    addToCartButton.style.display = 'block';  
                    removeButton.style.display = 'none';  
                }  
            }  
        });  



        removeButton.addEventListener('click', () => {  
            const existingItem = cart.find(item => item.index === index);  
            if (existingItem) {  
                cart.splice(cart.indexOf(existingItem), 1);  
                updateCartSummary();  
                addToCartButton.style.display = 'block';  
                removeButton.style.display = 'none';  
            }  
        });  
    });  
      // Add a click event listener for the purchase button  
      purchaseButton.addEventListener('click', () => {  
        if (cart.length > 0) {  
            // Display a successful purchase prompt box  
            alert('Purchase successful! Your items have been processed.');  
              
            // Clear shopping cart (optional, depending on business needs)  
            // cart = [];  
            // updateCartSummary(); // If the shopping cart is cleared, the summary needs to be updated  
              
            // Reset the purchase button status (if necessary, such as disabling the button after purchase)  
            // purchaseButton.disabled = true; // Determine whether to disable based on actual needs  
              
            // Other purchased logic can be added here, such as sending purchase information to the server  
            // ...  
        } else {  
            // Handling when shopping cart is empty (optional)  
            alert('Your cart is empty. Please add items to your cart before purchasing.');  
        }  
    });  
    clearCartButton.addEventListener('click', () => {  
        cart = [];  
        updateCartSummary();  
    });  
});


document.getElementById('contactForm').addEventListener('submit', function(event) {  
    event.preventDefault(); // Block the default submission behavior of forms  
    
    // Clear previous success messages (if any)  
    document.getElementById('successMessage').style.display = 'none';  
    
    // AJAX requests or other backend processing logic can be added here to send data  
    // For demonstration purposes, we will only display a success message  
    
    // Display success message  
    document.getElementById('successMessage').style.display = 'block';  
    
    // Clear form fields (optional)  
    this.reset();  
  });
