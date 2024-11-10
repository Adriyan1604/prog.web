document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Kirim data ke server untuk verifikasi
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        const { token, role } = data;

        // Simpan token ke localStorage untuk digunakan nanti
        localStorage.setItem('token', token);

        // Arahkan ke dashboard yang sesuai berdasarkan peran
        if (role === 'admin') {
            window.location.href = '/admin';
        } else {
            window.location.href = '/user';
        }
    } else {
        alert("Login failed. Please check your credentials.");
    }
});
