const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
  registerToEvent,
  getOrganized,
  getRegistered,
} = require("../controllers/eventController");

router.post("/create", protect, roleMiddleware("organizer"), createEvent); //create

router.get("/", protect, getAllEvents); //dashboard
router.get("/organized", protect, getOrganized);
router.get("/joined", protect, getRegistered);

router.get("/:id", protect, getEventById); //event/:id
router.delete("/:id", protect, roleMiddleware("organizer"), deleteEvent); //event/:id

router.get("/join/:id", protect, registerToEvent); //event/:id

module.exports = router;
