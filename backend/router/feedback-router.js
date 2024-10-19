const express = require("express");
const router = express.Router();
const { feedbackForm, getallfeedback } = require("../controllers/feedback-controllers"); // Import both functions

// Route to submit feedback
router.route("/").post(feedbackForm); // POST request to submit feedback

// Route to get all feedback
router.route("/getallfeedback").get(getallfeedback); // GET request to retrieve all feedback

module.exports = router;
