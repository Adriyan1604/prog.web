const menu = []; // Array kosong sebagai database sementara

// Mendapatkan semua item menu
app.get('/api/menu', (req, res) => {
    res.json(menu);
});

// Menambahkan item menu baru
app.post('/api/menu', (req, res) => {
    const newItem = req.body;
    newItem.id = menu.length + 1; // Set ID unik
    menu.push(newItem);
    res.status(201).json(newItem);
});

// Memperbarui item menu berdasarkan ID
app.put('/api/menu/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;

    const index = menu.findIndex(item => item.id === id);
    if (index !== -1) {
        menu[index] = { ...menu[index], ...updatedItem };
        res.json(menu[index]);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Menghapus item menu berdasarkan ID
app.delete('/api/menu/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = menu.findIndex(item => item.id === id);

    if (index !== -1) {
        const deletedItem = menu.splice(index, 1);
        res.json(deletedItem);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});
