const eventDao = require('../dao/event.dao');

const eventService = {
    async getAllEvents() {
        return await eventDao.getAll();
    },

    async getEventById(id) {
        const event = await eventDao.getById(id);
        if (!event) {
            throw new Error('Requested event does not exist.');
        }
        return event;
    },

    async createEvent(eventData) {
        const name = eventData.name || eventData.nombre;
        const dateTime = eventData.dateTime || eventData.fecha_hora;
        const location = eventData.location || eventData.lugar;
        const category = eventData.category || eventData.categoria;

        if (!name || !dateTime || !location || !category) {
            throw new Error('Missing mandatory fields to register the event.');
        }

        const normalizedData = {
            ...eventData,
            name,
            dateTime,
            location,
            category
        };

        const eventId = await eventDao.create(normalizedData);
        return { id: eventId, ...normalizedData };
    },

    async updateEvent(id, eventData) {
        const existingEvent = await eventDao.getById(id);
        if (!existingEvent) {
            throw new Error('The event to update does not exist.');
        }
        await eventDao.update(id, eventData);
        return { id, ...eventData };
    },

    async deleteEvent(id) {
        const existingEvent = await eventDao.getById(id);
        if (!existingEvent) {
            throw new Error('The event to delete does not exist.');
        }
        await eventDao.delete(id);
        return true;
    }
};

module.exports = eventService;