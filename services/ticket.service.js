const ticketDao = require('../dao/ticket.dao');

const ticketService = {
    async getAllTickets() {
        return await ticketDao.getAll();
    },

    async getTicketById(id) {
        const ticket = await ticketDao.getById(id);
        if (!ticket) {
            throw new Error('The requested ticket does not exist.');
        }
        return ticket;
    },

    async getTicketsByUser(userId) {
        return await ticketDao.getByUserId(userId);
    },

    async createTicket(ticketData) {
        const paidPrice = ticketData.paidPrice || ticketData.precio_pagado;
        const userId = ticketData.users_id || ticketData.userId;
        const eventId = ticketData.events_id || ticketData.eventId;
        const status = ticketData.status || ticketData.estado || 'Active';

        if (!paidPrice || !userId || !eventId) {
            throw new Error('Missing mandatory fields to process ticket purchase.');
        }

        const normalizedData = {
            ...ticketData,
            paidPrice,
            users_id: userId,
            events_id: eventId,
            status
        };

        const ticketId = await ticketDao.create(normalizedData);
        return { id: ticketId, ...normalizedData };
    },

    async updateTicket(id, ticketData) {
        const existingTicket = await ticketDao.getById(id);
        if (!existingTicket) {
            throw new Error('The ticket to update does not exist.');
        }
        await ticketDao.update(id, ticketData);
        return { id, ...ticketData };
    },

    async deleteTicket(id) {
        const existingTicket = await ticketDao.getById(id);
        if (!existingTicket) {
            throw new Error('The ticket to delete does not exist.');
        }
        await ticketDao.delete(id);
        return true;
    }
};

module.exports = ticketService;