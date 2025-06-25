const express = require('express');
const router  = express.Router();

const protect  = require ('../middleware/authMiddleware');
/*const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    registerForEvent,
    getRegisteredEvents,
    getOrganizedEvents
} = require('../controllers/eventController');*/


router.post('/create' , protect  , createEvent);
router.get('/all', protect, getAllEvents);
router.get('/:id', protect, getEventById);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);
router.post('/:id/register', protect, registerForEvent);
router.get('/registered', protect, getRegisteredEvents);
router.get('/organized', protect, getOrganizedEvents);