// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  participants: [{ type: String }],
  eventForm: [{ type: String }],
});

module.exports = mongoose.model("Event", eventSchema);
