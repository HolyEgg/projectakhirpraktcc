CREATE DATABASE perpus;

USE perpus;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE buku (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    judul VARCHAR(255) NOT NULL,
    penulis VARCHAR(255) NOT NULL,
    baca INT,
    FOREIGN KEY (id_user) REFERENCES user(id)
);
