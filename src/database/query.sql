CREATE DATABASE restvolucion;

use restvolucion;

CREATE TABLE platos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100),
    precio DECIMAL(10, 2) NOT NULL,
    imagen VARCHAR(255)
);

SELECT * FROM platos;