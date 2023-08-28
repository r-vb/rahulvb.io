// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 } // 30 minutes in milliseconds
}));

// Serve static files (your HTML, CSS, and JavaScript)
app.use(express.static('public'));

// Simulated user database (replace with your actual user database)
const users = [
    { username: 'r-v-b', password: '3fg67@qwerty' },
    { username: 'user2', password: 'password2' }
];

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simulated authentication logic (replace with your actual authentication logic)
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Store the username in the session
        req.session.username = username;

        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Logout endpoint
app.get('/logout', (req, res) => {
    // Destroy the session to log out the user
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/');
    });
});

// Protected route (example)
app.get('/dashboard', (req, res) => {
    // Check if the user is authenticated (session contains username)
    if (req.session.username) {
        res.send(`Welcome, ${req.session.username}! This is your dashboard.`);
    } else {
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});