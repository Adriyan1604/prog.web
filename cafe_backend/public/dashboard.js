const apiUrl = 'http://localhost:3000/api/menu';

// Memuat data dari server
async function loadMenu() {
    const response = await fetch(apiUrl + '/minuman'); // Ganti kategori sesuai kebutuhan
    const data = await response.json();

    const tableBody = document.querySelector('#menuTable tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>Minuman</td> <!-- Sesuaikan kategori -->
            <td class="actions">
                <button onclick="editItem(${item.id}, '${item.name}', ${item.price})">Edit</button>
                <button onclick="deleteItem(${item.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Tambah item baru
document.getElementById('addItemForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;

    const newItem = { name, price };

    const response = await fetch(`${apiUrl}/${category}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
    });

    if (response.ok) {
        loadMenu();
        document.getElementById('addItemForm').reset();
    } else {
        alert("Failed to add item.");
    }
});

// Hapus item
async function deleteItem(id) {
    const response = await fetch(`${apiUrl}/minuman/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        loadMenu();
    } else {
        alert("Failed to delete item.");
    }
}

// Edit item
function editItem(id, name, price) {
    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('category').value = 'minuman';

    // Tambahkan logika untuk memperbarui item setelah diedit
}

// Panggil loadMenu saat halaman dimuat
loadMenu();
