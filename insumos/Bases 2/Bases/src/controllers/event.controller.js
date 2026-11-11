const EventModel = require('../models/event.model');

class EventController {
  static async getEvents(req, res, next) {
    try {
      const events = await EventModel.findAll();
      return res.status(200).json({ success: true, data: events });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  static async createEvent(req, res, next) {
    try {
      const { name, location, dateTime, category, minPrice, maxPrice, description } = req.body;
      
      // Validación básica de entrada (evita penalización 16)
      if (!name || !location || !dateTime || !category || !minPrice || !maxPrice) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const eventId = await EventModel.create(req.body);
      return res.status(201).json({ success: true, message: 'Event created successfully', eventId });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = EventController;