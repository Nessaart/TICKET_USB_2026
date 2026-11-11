const reviewDao = require('../dao/review.dao');

const reviewService = {
    async getAllReviews() {
        return await reviewDao.getAll();
    },

    async getReviewById(id) {
        const review = await reviewDao.getById(id);
        if (!review) {
            throw new Error('The requested review does not exist.');
        }
        return review;
    },

    async getReviewsByEvent(eventId) {
        return await reviewDao.getByEventId(eventId);
    },

    async createReview(reviewData) {
        const rating = reviewData.rating || reviewData.calificacion;
        const userId = reviewData.users_id || reviewData.userId;
        const eventId = reviewData.events_id || reviewData.eventId;
        const comment = reviewData.comment || reviewData.comentario;
        const tags = reviewData.tags || reviewData.etiquetas;
        const seatRating = reviewData.seatRating || reviewData.valoracion_asiento;

        if (!rating || !userId || !eventId) {
            throw new Error('Missing mandatory fields to register the review.');
        }

        if (rating < 1 || rating > 5) {
            throw new Error('The rating must be between 1 and 5 stars.');
        }

        const normalizedData = {
            ...reviewData,
            rating,
            users_id: userId,
            events_id: eventId,
            comment,
            tags,
            seatRating
        };

        const reviewId = await reviewDao.create(normalizedData);
        return { id: reviewId, ...normalizedData };
    },

    async updateReview(id, reviewData) {
        const existingReview = await reviewDao.getById(id);
        if (!existingReview) {
            throw new Error('The review to update does not exist.');
        }
        await reviewDao.update(id, reviewData);
        return { id, ...reviewData };
    },

    async deleteReview(id) {
        const existingReview = await reviewDao.getById(id);
        if (!existingReview) {
            throw new Error('The review to delete does not exist.');
        }
        await reviewDao.delete(id);
        return true;
    }
};

module.exports = reviewService;