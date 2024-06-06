const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup session middleware
app.use(session({
    secret: 'your_secret_key', // Gantilah dengan kunci rahasia yang lebih kuat
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true jika menggunakan HTTPS
}));

// Routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

