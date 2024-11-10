function filterMenu(category) {
  const items = document.querySelectorAll('.menu-item');
  items.forEach(item => {
      if (category === 'all' || item.classList.contains(category)) {
          item.style.display = 'block';
      } else {
          item.style.display = 'none';
      }
  });
  document.querySelectorAll('.menu-button').forEach(button => {
      button.classList.remove('active');
  });
  document.querySelector(`[onclick="filterMenu('${category}')"]`).classList.add('active');
}

function orderItem(itemName) {
  // Encode item name to safely include it in the URL
  const encodedItemName = encodeURIComponent(itemName);
  // Navigate to order page with the item name as a query parameter
  window.location.href = `order.html?item=${encodedItemName}`;
}
