const Event  = require('../models/eventModel');
const User = require('../models/userModel');

const createEvent = async (req , res)=>{
    const { title, date, location  ,category } = req.body; 
    try{
        const event  = new Event({
            title,
            dateTime: date,
            location,
            organizer: req.user._id, // Assuming req.user is populated with the authenticated user's data
            category,
        })
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getEventById = async (req, res) => {
    const {id} = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('organizer', 'username email').populate('students', 'username email');
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const updateEvent = async (req, res) => {
    const {id} = req.params;
    const { title, date, location, category } = req.body; 
    try {
        const event = await Event.findByIdAndUpdate(id, {
            title,
            dateTime: date,
            location,
            category
        }, { new: true });
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteEvent = async (req, res) => {
    const {id} = req.params;
    try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    // Additional functions like registerForEvent, getRegisteredEvents, getOrganizedEvents can be added here
};