const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Rute untuk buku, tidak menggunakan middleware autentikasi
router.get('/books', controller.getAllBooks);
router.get('/books/:title', controller.getBookByTitle);
router.post('/books', controller.addBook);
router.put('/books/:id', controller.updateBook);
router.delete('/books/:id', controller.deleteBook);

module.exports = router;
