const { User, Buku } = require("./model");

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

// Middleware untuk memeriksa autentikasi
exports.isAuthenticated = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).send({ message: "Anda harus login terlebih dahulu" });
    }
    next();
};

// Registrasi User
exports.register = (req, res) => {
    const { username, password } = req.body;

    // Check for missing fields
    if (checkMissingFields({ username, password }, res)) return;

    const newUser = new User(req.body);
    User.create(newUser, (err, userId) => {
        if (err) {
            res.status(500).send({ message: "Error saat registrasi pengguna", error: err });
        } else {
            res.status(201).send({ message: "Registrasi berhasil", userId: userId });
        }
    });
};

// Login User
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Check for missing fields
    if (checkMissingFields({ username, password }, res)) return;

    User.findByUsername(username, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error saat login", error: err });
        } else if (!user || user.password !== password) {
            res.status(401).send({ message: "Username atau password salah" });
        } else {
            req.session.user = user;  // Menyimpan informasi pengguna di session
            res.status(200).send({ message: "Login berhasil", user: user });
        }
    });
};

// Memanggil semua buku berdasarkan id_user
exports.getAllBooksByUserId = (req, res) => {
    const userId = req.params.userId;

    // Check for missing fields
    if (checkMissingFields({ userId }, res)) return;

    Buku.getAllByUserId(userId, (err, books) => {
        if (err) {
            res.status(500).send({ message: "Error saat mengambil buku", error: err });
        } else {
            res.status(200).send(books);
        }
    });
};

// Memanggil buku berdasarkan id_user dan judul
exports.getBookByUserIdAndTitle = (req, res) => {
    const userId = req.params.userId;
    const title = req.params.title;

    // Check for missing fields
    if (checkMissingFields({ userId, title }, res)) return;

    Buku.findByUserIdAndTitle(userId, title, (err, books) => {
        if (err) {
            res.status(500).send({ message: "Error saat mencari buku", error: err });
        } else {
            res.status(200).send(books);
        }
    });
};

// Menambahkan buku baru
exports.addBook = (req, res) => {
    const { id_user, judul, penulis, baca } = req.body;

    // Check for missing fields
    if (checkMissingFields({ id_user, judul, penulis }, res)) return;

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
