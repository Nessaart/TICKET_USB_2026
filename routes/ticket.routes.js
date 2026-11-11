const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Obtener todas las entradas registradas
 *     responses:
 *       200:
 *         description: Lista de entradas obtenida con éxito
 *       500:
 *         description: Error del servidor
 */
router.get('/', ticketController.getAll);

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Obtener una entrada por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrada encontrada
 *       404:
 *         description: Entrada no encontrada
 */
router.get('/:id', ticketController.getById);

/**
 * @swagger
 * /api/tickets/user/{userId}:
 *   get:
 *     summary: Obtener las entradas de un usuario específico (Mis Entradas)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de entradas del usuario obtenida con éxito
 *       500:
 *         description: Error del servidor
 */
router.get('/user/:userId', ticketController.getByUser);

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Comprar y registrar una nueva entrada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purchaseDate:
 *                 type: string
 *                 format: date-time
 *               paidPrice:
 *                 type: number
 *               status:
 *                 type: string
 *               users_id:
 *                 type: integer
 *               events_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Compra registrada con éxito
 *       400:
 *         description: Faltan campos obligatorios
 */
router.post('/', ticketController.create);

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     summary: Actualizar estado o datos de una entrada
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
 *               status:
 *                 type: string
 *               paidPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Entrada actualizada con éxito
 *       400:
 *         description: Error en los datos
 */
router.put('/:id', ticketController.update);

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Eliminar una entrada
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrada eliminada con éxito
 *       404:
 *         description: Entrada no encontrada
 */
router.delete('/:id', ticketController.remove);

module.exports = router;