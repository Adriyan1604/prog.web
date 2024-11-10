const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken, isAdmin, SECRET_KEY } = require('./auth');
const app = express();
const port = 3000;

// Dummy user data
const users = [
    {
        username: 'admin',
        password: '$2b$10$QZPp.n6j/8nHpFMo2FUVX.iPmU8e6TjWXLrWTbZzIjsX6mVD0cH5W', // bcrypt hash untuk 'password123'
        role: 'admin'
    }
];

app.use(express.static(path.join(__dirname, 'public')));
// Middleware untuk parsing JSON
app.use(express.json());

// Data menu dengan kategori
let menu = {
    minuman: [
        { id: 1, name: "Latte", price: 30000 },
        { id: 2, name: "Cappuccino", price: 35000 }
    ],
    makanan: [
        { id: 3, name: "Nasi Goreng", price: 45000 },
        { id: 4, name: "Mie Goreng", price: 40000 }
    ],
    snack: [
        { id: 5, name: "Roti Bakar", price: 20000 },
        { id: 6, name: "Kentang Goreng", price: 25000 }
    ]
};

// Endpoint login untuk menghasilkan JWT
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(403).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Endpoint utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../home.html'));
});

// Rute untuk halaman menu
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '../menu.html'));
});

// Rute untuk halaman order
app.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, '../order.html'));
});

// CRUD Operations for Menu with Categories

// 1. GET: Mendapatkan semua item menu dalam kategori tertentu
app.get('/api/menu/:category', (req, res) => {
    const category = req.params.category;
    if (menu[category]) {
        res.json(menu[category]);
    } else {
        res.status(404).json({ message: "Category not found" });
    }
});

// 2. GET by ID: Mendapatkan satu item menu berdasarkan ID dan kategori
app.get('/api/menu/:category/:id', (req, res) => {
    const category = req.params.category;
    const id = parseInt(req.params.id);
    if (menu[category]) {
        const item = menu[category].find(item => item.id === id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: "Item not found in category" });
        }
    } else {
        res.status(404).json({ message: "Category not found" });
    }
});

// 3. POST: Menambahkan item menu baru ke kategori tertentu (autentikasi dan otorisasi diperlukan)
app.post('/api/menu/:category', authenticateToken, isAdmin, (req, res) => {
    const category = req.params.category;
    if (!menu[category]) {
        menu[category] = []; // Buat kategori baru jika belum ada
    }
    const newItem = req.body;
    newItem.id = menu[category].length > 0 ? menu[category][menu[category].length - 1].id + 1 : 1;
    menu[category].push(newItem);
    res.status(201).json(newItem);
});

// 4. PUT: Memperbarui item menu berdasarkan ID dan kategori
app.put('/api/menu/:category/:id', authenticateToken, isAdmin, (req, res) => {
    const category = req.params.category;
    const id = parseInt(req.params.id);
    if (menu[category]) {
        const index = menu[category].findIndex(item => item.id === id);
        if (index !== -1) {
            menu[category][index] = { ...menu[category][index], ...req.body };
            res.json(menu[category][index]);
        } else {
            res.status(404).json({ message: "Item not found in category" });
        }
    } else {
        res.status(404).json({ message: "Category not found" });
    }
});

// 5. DELETE: Menghapus item menu berdasarkan ID dan kategori (autentikasi dan otorisasi diperlukan)
app.delete('/api/menu/:category/:id', authenticateToken, isAdmin, (req, res) => {
    const category = req.params.category;
    const id = parseInt(req.params.id);
    if (menu[category]) {
        const index = menu[category].findIndex(item => item.id === id);
        if (index !== -1) {
            const deletedItem = menu[category].splice(index, 1);
            res.json(deletedItem[0]);
        } else {
            res.status(404).json({ message: "Item not found in category" });
        }
    } else {
        res.status(404).json({ message: "Category not found" });
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
