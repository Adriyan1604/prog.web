const jwt = require('jsonwebtoken');
const SECRET_KEY = 'admin12345'; // Ganti dengan secret key yang aman

// Middleware untuk verifikasi token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Middleware untuk memastikan role Admin
function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access forbidden: Admins only." });
    }
}

module.exports = { authenticateToken, isAdmin, SECRET_KEY };
