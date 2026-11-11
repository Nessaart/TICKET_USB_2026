const { Router } = require('express');
const EventController = require('../controllers/event.controller');

const router = Router();

router.get('/', EventController.getEvents);
router.post('/', EventController.createEvent);

module.exports = router;