const reviewService = require('../services/review.service');

const reviewController = {
    async getAll(req, res) {
        try {
            const reviews = await reviewService.getAllReviews();
            return res.status(200).json({ message: 'Reseñas obtenidas con éxito', data: reviews });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const review = await reviewService.getReviewById(req.params.id);
            return res.status(200).json({ message: 'Reseña encontrada', data: review });
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

    async getByEvent(req, res) {
        try {
            const reviews = await reviewService.getReviewsByEvent(req.params.eventId);
            return res.status(200).json({ message: 'Reseñas del evento obtenidas con éxito', data: reviews });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const newReview = await reviewService.createReview(req.body);
            return res.status(201).json({ message: 'Reseña publicada con éxito', data: newReview });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updatedReview = await reviewService.updateReview(req.params.id, req.body);
            return res.status(200).json({ message: 'Reseña actualizada con éxito', data: updatedReview });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async remove(req, res) {
        try {
            await reviewService.deleteReview(req.params.id);
            return res.status(200).json({ message: 'Reseña eliminada con éxito' });
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    }
};

module.exports = reviewController;