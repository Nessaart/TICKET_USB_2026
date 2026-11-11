const eventService = require('../services/event.service');

const eventController = {
    async getAll(req, res) {
        try {
            const events = await eventService.getAllEvents();
            return res.status(200).json({ message: 'Eventos obtenidos con éxito', data: events });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const event = await eventService.getEventById(req.params.id);
            return res.status(200).json({ message: 'Evento encontrado', data: event });
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const newEvent = await eventService.createEvent(req.body);
            return res.status(201).json({ message: 'Evento creado con éxito', data: newEvent });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updatedEvent = await eventService.updateEvent(req.params.id, req.body);
            return res.status(200).json({ message: 'Evento actualizado con éxito', data: updatedEvent });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async remove(req, res) {
        try {
            await eventService.deleteEvent(req.params.id);
            return res.status(200).json({ message: 'Evento eliminado con éxito' });
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    }
};

module.exports = eventController;