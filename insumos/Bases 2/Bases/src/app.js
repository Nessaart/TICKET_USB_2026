const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const eventRoutes = require('./routes/event.routes');

const app = express();
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ticket Platform API',
      version: '1.0.0',
      description: 'API REST para la gestión de boletería - Base de Datos'
    },
    servers: [{ url: 'http://localhost:3000/api/v1' }]
  },
  apis: []
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de la API
app.use('/api/v1/events', eventRoutes);

module.exports = app;