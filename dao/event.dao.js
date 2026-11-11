const db = require('../services/mysql.service');

const eventDao = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM events');
        return rows;
    },

    async getById(id) {
        const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        
        const event = rows[0];
        
        // Consultar el detalle especializado según la categoría del evento
        if (event.categoria === 'Concierto') {
            const [detailRows] = await db.query('SELECT * FROM concert_details WHERE events_id = ?', [id]);
            event.detalle = detailRows[0] || null;
        } else if (event.categoria === 'Deporte') {
            const [detailRows] = await db.query('SELECT * FROM sport_details WHERE events_id = ?', [id]);
            event.detalle = detailRows[0] || null;
        } else if (event.categoria === 'Teatro') {
            const [detailRows] = await db.query('SELECT * FROM theater_details WHERE events_id = ?', [id]);
            event.detalle = detailRows[0] || null;
        }

        return event;
    },

    async create(eventData) {
        const { name, location, dateTime, category, minPrice, maxPrice, description, detail } = eventData;
        
        // Insertar evento principal
        const [result] = await db.query(
            'INSERT INTO events (nombre, lugar, fecha_hora, categoria, precio_minimo, precio_maximo, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, location, dateTime, category, minPrice, maxPrice, description]
        );
        
        const eventId = result.insertId;

        // Insertar el detalle correspondiente si viene incluido
        if (detail) {
            if (category === 'Concierto') {
                await db.query(
                    'INSERT INTO concert_details (lineup_artistas, events_id) VALUES (?, ?)',
                    [detail.lineup_artistas, eventId]
                );
            } else if (category === 'Deporte') {
                await db.query(
                    'INSERT INTO sport_details (equipo_local, equipo_visitante, marcador_en_vivo, events_id) VALUES (?, ?, ?, ?)',
                    [detail.equipo_local, detail.equipo_visitante, detail.marcador_en_vivo, eventId]
                );
            } else if (category === 'Teatro') {
                await db.query(
                    'INSERT INTO theater_details (reparto_actores, duracion_intermedios, events_id) VALUES (?, ?, ?)',
                    [detail.reparto_actores, detail.duracion_intermedios, eventId]
                );
            }
        }

        return eventId;
    },

    async update(id, eventData) {
        const { name, location, dateTime, category, minPrice, maxPrice, description } = eventData;
        const [result] = await db.query(
            'UPDATE events SET nombre = ?, lugar = ?, fecha_hora = ?, categoria = ?, precio_minimo = ?, precio_maximo = ?, descripcion = ? WHERE id = ?',
            [name, location, dateTime, category, minPrice, maxPrice, description, id]
        );
        return result.affectedRows;
    },

    async delete(id) {
        // Eliminar primero los detalles dependientes por integridad referencial
        await db.query('DELETE FROM concert_details WHERE events_id = ?', [id]);
        await db.query('DELETE FROM sport_details WHERE events_id = ?', [id]);
        await db.query('DELETE FROM theater_details WHERE events_id = ?', [id]);
        
        const [result] = await db.query('DELETE FROM events WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = eventDao;