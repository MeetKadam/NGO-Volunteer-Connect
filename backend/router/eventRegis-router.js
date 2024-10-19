const express = require("express");
const router = express.Router();

// Import both controller functions
const { eventRegis, getAllRegistrations } = require("../controllers/eventRegis-controllers");

// POST route for registering a volunteer
router.route("/eventRegister").post(eventRegis);

// GET route for fetching all registrations and the count
router.route("/getAllRegistrations").get(getAllRegistrations);

module.exports = router;
