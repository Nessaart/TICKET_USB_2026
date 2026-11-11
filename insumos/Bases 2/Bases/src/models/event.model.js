const pool = require('../config/database');

class EventModel {
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM events ORDER BY date_time ASC');
    return rows;
  }

  static async create(eventData) {
    const { name, location, dateTime, category, minPrice, maxPrice, description } = eventData;
    const [result] = await pool.query(
      `INSERT INTO events (name, location, date_time, category, min_price, max_price, description) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, location, dateTime, category, minPrice, maxPrice, description]
    );
    return result.insertId;
  }
}

module.exports = EventModel;