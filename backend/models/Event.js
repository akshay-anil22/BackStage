const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    event_id: {
      type: Number,
      unique: true,
      required: true,
      
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    category: {
      type: String,
      enum: ["Workshop", "Seminar", "Conference", "Webinar"],
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      trim: true,
      select: false,
      default: "",
    },
    budget: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
