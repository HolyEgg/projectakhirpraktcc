var db = require("./db");

var Buku = function (buku) {
    this.judul = buku.judul;
    this.penulis = buku.penulis;
    this.baca = buku.baca ? buku.baca : 0;
};

// Memanggil semua buku
Buku.getAll = function (result) {
    db.query("SELECT * FROM buku", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// Memanggil buku berdasarkan judul
Buku.findByTitle = function (title, result) {
    db.query("SELECT * FROM buku WHERE judul = ?", [title], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// Menambahkan buku baru
Buku.create = function (newBuku, result) {
    db.query("INSERT INTO buku SET ?", newBuku, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

// Memperbarui buku berdasarkan id
Buku.updateById = function (id, updatedBuku, result) {
    db.query("UPDATE buku SET judul = ?, penulis = ?, baca = ? WHERE id = ?", 
    [updatedBuku.judul, updatedBuku.penulis, updatedBuku.baca, id], 
    function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// Menghapus buku berdasarkan id
Buku.remove = function (id, result) {
    db.query("DELETE FROM buku WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Buku;
