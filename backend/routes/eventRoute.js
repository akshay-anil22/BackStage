const express = require('express');
const router  = express.Router();

const protect  = require ('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const {
    createEvent,
    getAllEvents,
    getEventById,
    deleteEvent,
    registerForEvent,
} = require('../controllers/eventController');


router.post('/create' , protect  , roleMiddleware('organizer') , createEvent);      //create


router.get('/', protect , getAllEvents);                                            //dashboard
router.get('/:id', protect , getEventById);                                         //event/:id
router.delete('/:id', protect  , roleMiddleware('organizer'), deleteEvent);         //event/:id

router.get('/join/:id' , protect , registerForEvent);                               //event/:id

module.exports = router;
