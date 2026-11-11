-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS ticket_usb_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ticket_usb_db;

-- 1. Tabla de Usuarios (User)
-- Nota: Para este corte, el campo password se almacena en texto plano por directriz del entregable.
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo_electronico VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(150) NOT NULL,
    rol ENUM('Cliente', 'Admin') NOT NULL DEFAULT 'Cliente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla Principal de Eventos (Event)
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    lugar VARCHAR(150) NOT NULL,
    fecha_hora DATETIME NOT NULL,
    categoria ENUM('Concierto', 'Deporte', 'Teatro') NOT NULL,
    precio_minimo DECIMAL(10, 2) NOT NULL,
    precio_maximo DECIMAL(10, 2) NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tablas Especializadas (Relación 1:1 con Events)
-- Detalle para Conciertos
CREATE TABLE concert_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    lineup_artistas TEXT NOT NULL,
    CONSTRAINT fk_concert_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Detalle para Deportes
CREATE TABLE sport_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    equipo_local VARCHAR(100) NOT NULL,
    equipo_visitante VARCHAR(100) NOT NULL,
    marcador_en_vivo VARCHAR(50) DEFAULT '0 - 0',
    CONSTRAINT fk_sport_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Detalle para Teatro
CREATE TABLE theater_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    reparto_actores TEXT NOT NULL,
    duracion_intermedios VARCHAR(50) NOT NULL,
    CONSTRAINT fk_theater_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- 4. Tabla de Entradas / Transacciones (Ticket)
-- Relación N:1 con Users y N:1 con Events
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    precio_pagado DECIMAL(10, 2) NOT NULL,
    estado ENUM('Válida', 'Usada', 'Cancelada') NOT NULL DEFAULT 'Válida',
    CONSTRAINT fk_ticket_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_ticket_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE RESTRICT
);

-- 5. Tabla de Reseñas / Retroalimentación (Review)
-- Relación N:1 con Users y N:1 con Events
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    etiquetas VARCHAR(255),
    valoracion_asiento VARCHAR(50),
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_review_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);