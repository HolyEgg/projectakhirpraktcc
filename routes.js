const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Rute untuk user
router.post('/register', controller.register);
router.post('/login', controller.login);

// Rute untuk buku, menggunakan middleware autentikasi
router.get('/books/:userId', controller.isAuthenticated, controller.getAllBooksByUserId);
router.get('/books/:userId/:title', controller.isAuthenticated, controller.getBookByUserIdAndTitle);
router.post('/books', controller.isAuthenticated, controller.addBook);
router.put('/books/:id', controller.isAuthenticated, controller.updateBook);
router.delete('/books/:id', controller.isAuthenticated, controller.deleteBook);

module.exports = router;

