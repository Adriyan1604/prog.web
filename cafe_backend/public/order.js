        // Sample data for menu items
        const menuItems = {
            "Es kopi kodya": {
                description: "Rich and creamy cold coffee with a smooth finish.",
                price: "$5.00",
                image: "assets/coffee-frappe1.png"
            },
            "Coffee Vanilla": {
                description: "Smooth coffee with a touch of vanilla.",
                price: "$4.50",
                image: "assets/coffee-vanilla.png"
            },
            "Coffee Mocha": {
                description: "Chocolate blended coffee with a hint of sweetness.",
                price: "$4.75",
                image: "assets/coffee-mocha.png"
            }
        };

        // Function to retrieve query parameter
        function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        // Display order details based on selected item
        function displayOrderDetails() {
            const itemName = getQueryParam('item');
            const item = menuItems[itemName];
            if (item) {
                document.getElementById('item-name').textContent = itemName;
                document.getElementById('item-image').src = item.image;
                document.getElementById('item-description').textContent = item.description;
                document.getElementById('item-price').textContent = `Price: ${item.price}`;
            } else {
                document.getElementById('order-details').innerHTML = '<p>Item not found.</p>';
            }
        }

        // Function to handle order confirmation
        function confirmOrder() {
            alert("Your order has been placed!");
        }

        // Display details on page load
        document.addEventListener('DOMContentLoaded', displayOrderDetails);