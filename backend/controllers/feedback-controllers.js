const Contact = require("../models/feedback-model");

const feedbackForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ message: "message send successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "message not delivered" });
  }
};

const getallfeedback = async (req, res) => {
    try {
      // Fetch all feedback from the database
      const feedbacks = await Contact.find({});
      return res.status(200).json(feedbacks); // Return the feedbacks as a JSON response
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error retrieving feedback" });
    }
  };
  module.exports = { feedbackForm, getallfeedback };