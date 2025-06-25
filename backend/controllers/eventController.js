const Event = require("../models/Event");



const getLastEventID = async () => {
    try {
      const lastEvent = await Event.findOne()
        .sort({ event_id: -1 }) 
        .select('event_id');
  
      return lastEvent ? lastEvent.event_id : 0;
    } catch (error) {
      console.error("Error fetching last event ID:", error);
      throw new Error("Could not fetch last event ID");
    }
  };
  
const createEvent = async (req, res) => {
    const last_event  = await getLastEventID();
    const new_event  = last_event+1;
  const { title, description , dateTime , location, category  ,paid , notes , budget  } = req.body;
  try {
    const event = new Event({
        event_id: new_event, // Increment the last event ID
        title,
        description,
        dateTime,
        location,
        category,
        organizer: req.user._id, 
        students: [], 
        paid,
        notes,
        budget,
    });
    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getEventById = async (req, res) => {
    const { id } = req.params;
    const numericId = parseInt(id);
  
    if (isNaN(numericId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
  
    try {
      const event = await Event.findOne({ event_id: numericId })
        .populate("organizer", "username")
        .populate("students", "username");
  
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json(event);
    } catch (error) {
      console.error("Error fetching event by ID:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "username")
      .populate("students", "username");
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findOneAndDelete({event_id : parseInt(id) , organizer: req.user._id});
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const registerToEvent = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
  
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
  
    try {
      const event = await Event.findOne({ event_id: numericId });
  
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      if (event.organizer.toString() === userId.toString()) {
        return res.status(403).json({ message: "Organizers cannot register for their own events." });
      } 
      const alreadyRegistered = event.students.includes(userId);
      if (alreadyRegistered) {
        return res.status(409).json({ message: "User already registered." });
      }
  
      
      event.students.push(userId);
      await event.save();
  
      res.status(200).json({ message: "Successfully registered for the event.", event });
    } catch (error) {
      console.error("Error registering for event:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
const getOrganized = async (req , res )=>{
    const userId = req.user._id;
    try {
        const events = await Event.find({organizer : userId})
            .populate("organizer" , "username");
        if(events.length ===0){
            return res.status(404).json({
                message : "No events are organized by you",
            })
        }
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching organized events:", error);
        res.status(500).json({ message: "Server error" });
    }
}




module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
  registerToEvent,
  getOrganized,
  // Additional functions like getRegisteredEvents, getOrganizedEvents can be added here
};
