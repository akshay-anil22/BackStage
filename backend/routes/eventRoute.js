const express = require('express');
const router  = express.Router();

const protect  = require ('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController');


router.post('/create' , protect  , roleMiddleware('organizer') , createEvent);      //create
router.get('/all', protect , roleMiddleware('organizer'), getAllEvents);            //dashboard
router.get('/:id', protect , roleMiddleware('organizer'), getEventById);            //event/:id
router.put('/:id', protect  , roleMiddleware('organizer'), updateEvent);            //event/:id
router.delete('/:id', protect  , roleMiddleware('organizer'), deleteEvent);         //event/:id

module.exports= router;
