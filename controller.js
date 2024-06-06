const Buku = require("./model");

// Helper function to check for missing fields
function checkMissingFields(fields, res) {
    for (const field in fields) {
        if (!fields[field]) {
            res.status(400).send({ message: `${field} is required` });
            return true;
        }
    }
    return false;
}

// Memanggil semua buku
exports.getAllBooks = (req, res) => {
    Buku.getAll((err, books) => {
        if (err) {
            res.status(500).send({ message: "Error saat mengambil buku", error: err });
        } else {
            res.status(200).send(books);
        }
    });
};

// Memanggil buku berdasarkan judul
exports.getBookByTitle = (req, res) => {
    const title = req.params.title;

    // Check for missing fields
    if (checkMissingFields({ title }, res)) return;

    Buku.findByTitle(title, (err, books) => {
        if (err) {
            res.status(500).send({ message: "Error saat mencari buku", error: err });
        } else {
            res.status(200).send(books);
        }
    });
};

// Menambahkan buku baru
exports.addBook = (req, res) => {
    const { judul, penulis, baca } = req.body;

    // Check for missing fields
    if (checkMissingFields({ judul, penulis }, res)) return;

    const newBook = new Buku(req.body);
    Buku.create(newBook, (err, bookId) => {
        if (err) {
            res.status(500).send({ message: "Error saat menambahkan buku", error: err });
        } else {
            res.status(201).send({ message: "Buku berhasil ditambahkan", bookId: bookId });
        }
    });
};

// Memperbarui buku berdasarkan id
exports.updateBook = (req, res) => {
    const bookId = req.params.id;
    const { judul, penulis, baca } = req.body;

    // Check for missing fields
    if (checkMissingFields({ judul, penulis }, res)) return;

    const updatedBook = new Buku(req.body);
    Buku.updateById(bookId, updatedBook, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error saat memperbarui buku", error: err });
        } else {
            res.status(200).send({ message: "Buku berhasil diperbarui" });
        }
    });
};

// Menghapus buku berdasarkan id
exports.deleteBook = (req, res) => {
    const bookId = req.params.id;

    // Check for missing fields
    if (checkMissingFields({ bookId }, res)) return;

    Buku.remove(bookId, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error saat menghapus buku", error: err });
        } else {
            res.status(200).send({ message: "Buku berhasil dihapus" });
        }
    });
};
