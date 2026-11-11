const db = require('../services/mysql.service');

const userDao = {
    async create(userData) {
        const { email, password, fullName, role } = userData;
        const [result] = await db.query(
            'INSERT INTO users (correo_electronico, password, nombre_completo, rol) VALUES (?, ?, ?, ?)',
            [email, password, fullName, role || 'Cliente']
        );
        return result.insertId;
    },

    async findByEmail(email) {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE correo_electronico = ?',
            [email]
        );
        return rows[0];
    }
};

module.exports = userDao;