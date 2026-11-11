const db = require('../services/mysql.service');

const reviewDao = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM reviews');
        return rows;
    },

    async getById(id) {
        const [rows] = await db.query('SELECT * FROM reviews WHERE id = ?', [id]);
        return rows[0];
    },

    async getByEventId(eventId) {
        const [rows] = await db.query(
            'SELECT rev.*, usr.nombre_completo AS usuario_nombre FROM reviews AS rev JOIN users AS usr ON rev.users_id = usr.id WHERE rev.events_id = ?',
            [eventId]
        );
        return rows;
    },

    async create(reviewData) {
        const { rating, comment, tags, seatRating, users_id, events_id } = reviewData;
        const [result] = await db.query(
            'INSERT INTO reviews (calificacion, comentario, etiquetas, valoracion_asiento, users_id, events_id) VALUES (?, ?, ?, ?, ?, ?)',
            [rating, comment, tags, seatRating, users_id, events_id]
        );
        return result.insertId;
    },

    async update(id, reviewData) {
        const { rating, comment, tags, seatRating } = reviewData;
        const [result] = await db.query(
            'UPDATE reviews SET calificacion = ?, comentario = ?, etiquetas = ?, valoracion_asiento = ? WHERE id = ?',
            [rating, comment, tags, seatRating, id]
        );
        return result.affectedRows;
    },

    async delete(id) {
        const [result] = await db.query('DELETE FROM reviews WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = reviewDao;