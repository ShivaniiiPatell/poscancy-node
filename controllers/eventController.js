const Event = require("../models/eventSchema");

async function addEvent(req, res) {
  try {
    const { title, description, start, end } = req.body;
    const event = new Event({ title, description, start, end });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
}
async function getEvents(req, res) {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
}
async function updateEvent(req, res) {
  try {
    const eventId = req.params.id;
    const eventData = req.body;

    console.log("id---", eventId);
    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, {
      new: true,
    });

    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Failed to update the event." });
  }
}
module.exports = {
  addEvent,
  getEvents,
  updateEvent,
};
