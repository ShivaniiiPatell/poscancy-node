const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const auth = require("../middlewares/auth");

router.post("/", eventController.addEvent);
router.get("/", eventController.getEvents);
router.put("/:id", eventController.updateEvent);

module.exports = router;
