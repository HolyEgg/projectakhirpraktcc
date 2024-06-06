var db = require("./db");

var User = function (user) {
    this.username = user.username;
    this.password = user.password;
};

var Buku = function (buku) {
    this.judul = buku.judul;
    this.penulis = buku.penulis;
    this.baca = buku.baca ? buku.baca : 0;
};

// Registrasi User
User.create = function (newUser, result) {
    db.query("INSERT INTO user SET ?", newUser, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

// Login User
User.findByUsername = function (username, result) {
    db.query("SELECT * FROM user WHERE username = ?", [username], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res[0]);
        }
    });
};

// Memanggil semua buku berdasarkan id_user
Buku.getAllByUserId = function (userId, result) {
    db.query("SELECT * FROM buku WHERE id_user = ?", [userId], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// Memanggil buku berdasarkan id_user dan judul
Buku.findByUserIdAndTitle = function (userId, title, result) {
    db.query("SELECT * FROM buku WHERE id_user = ? AND judul = ?", [userId, title], function (err, res) {
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

module.exports = { User, Buku };
