const db = require('../services/mysql.service');

const ticketDao = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM tickets');
        return rows;
    },

    async getById(id) {
        const [rows] = await db.query('SELECT * FROM tickets WHERE id = ?', [id]);
        return rows[0];
    },

    async getByUserId(userId) {
        const [rows] = await db.query(
            'SELECT tckt.*, evnt.nombre AS evento_nombre, evnt.lugar, evnt.fecha_hora, evnt.categoria FROM tickets AS tckt JOIN events AS evnt ON tckt.events_id = evnt.id WHERE tckt.users_id = ?',
            [userId]
        );
        return rows;
    },

    async create(ticketData) {
        const { purchaseDate, paidPrice, status, users_id, events_id } = ticketData;
        const [result] = await db.query(
            'INSERT INTO tickets (fecha_compra, precio_pagado, estado, users_id, events_id) VALUES (?, ?, ?, ?, ?)',
            [purchaseDate || new Date(), paidPrice, status || 'Valida', users_id, events_id]
        );
        return result.insertId;
    },

    async update(id, ticketData) {
        const { status, paidPrice } = ticketData;
        const [result] = await db.query(
            'UPDATE tickets SET estado = ?, precio_pagado = ? WHERE id = ?',
            [status, paidPrice, id]
        );
        return result.affectedRows;
    },

    async delete(id) {
        const [result] = await db.query('DELETE FROM tickets WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = ticketDao;