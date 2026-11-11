const ticketService = require('../services/ticket.service');

const ticketController = {
    async getAll(req, res) {
        try {
            const tickets = await ticketService.getAllTickets();
            return res.status(200).json({ message: 'Entradas obtenidas con éxito', data: tickets });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const ticket = await ticketService.getTicketById(req.params.id);
            return res.status(200).json({ message: 'Entrada encontrada', data: ticket });
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

    async getByUser(req, res) {
        try {
            const tickets = await ticketService.getTicketsByUser(req.params.userId);
            return res.status(200).json({ message: 'Entradas del usuario obtenidas con éxito', data: tickets });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const newTicket = await ticketService.createTicket(req.body);
            return res.status(201).json({ message: 'Compra de entrada registrada con éxito', data: newTicket });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updatedTicket = await ticketService.updateTicket(req.params.id, req.body);
            return res.status(200).json({ message: 'Entrada actualizada con éxito', data: updatedTicket });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async remove(req, res) {
        try {
            await ticketService.deleteTicket(req.params.id);
            return res.status(200).json({ message: 'Entrada eliminada con éxito' });
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    }
};

module.exports = ticketController;