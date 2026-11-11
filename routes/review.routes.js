const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Obtener todas las reseñas del sistema
 *     responses:
 *       200:
 *         description: Lista de reseñas obtenida con éxito
 *       500:
 *         description: Error del servidor
 */
router.get('/', reviewController.getAll);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Obtener una reseña por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reseña encontrada
 *       404:
 *         description: Reseña no encontrada
 */
router.get('/:id', reviewController.getById);

/**
 * @swagger
 * /api/reviews/event/{eventId}:
 *   get:
 *     summary: Obtener todas las reseñas asociadas a un evento específico
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reseñas del evento obtenidas con éxito
 *       500:
 *         description: Error del servidor
 */
router.get('/event/:eventId', reviewController.getByEvent);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Publicar una nueva reseña (Calificación y comentario)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *               tags:
 *                 type: string
 *               seatRating:
 *                 type: string
 *               users_id:
 *                 type: integer
 *               events_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Reseña publicada con éxito
 *       400:
 *         description: Faltan campos o calificación inválida
 */
router.post('/', reviewController.create);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Actualizar una reseña existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *               tags:
 *                 type: string
 *               seatRating:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reseña actualizada con éxito
 *       400:
 *         description: Error en los datos
 */
router.put('/:id', reviewController.update);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Eliminar una reseña
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reseña eliminada con éxito
 *       404:
 *         description: Reseña no encontrada
 */
router.delete('/:id', reviewController.remove);

module.exports = router;