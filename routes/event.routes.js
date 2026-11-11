const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Obtener todos los eventos del catalogo
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida con éxito
 *       500:
 *         description: Error del servidor
 */
router.get('/', eventController.getAll);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Obtener un evento por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento no encontrado
 */
router.get('/:id', eventController.getById);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Crear un nuevo evento (Administrador)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               dateTime:
 *                 type: string
 *               category:
 *                 type: string
 *               minPrice:
 *                 type: number
 *               maxPrice:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Evento creado con éxito
 *       400:
 *         description: Faltan campos obligatorios
 */
router.post('/', eventController.create);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Actualizar un evento existente
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
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               dateTime:
 *                 type: string
 *               category:
 *                 type: string
 *               minPrice:
 *                 type: number
 *               maxPrice:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evento actualizado con éxito
 *       400:
 *         description: Error en los datos o evento no existe
 */
router.put('/:id', eventController.update);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Eliminar un evento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento eliminado con éxito
 *       404:
 *         description: Evento no encontrado
 */
router.delete('/:id', eventController.remove);

module.exports = router;