const Contact = require("../models/eventRegis-model");

const eventRegis = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ message: "message send successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "message not delivered" });
  }
};

const getAllRegistrations = async (req, res) => {
    try {
      // Fetch all the registrations from the database
      const registrations = await Contact.find();
  
      // Count the total number of entries
      const totalEntries = await Contact.countDocuments();
  
      // Send both the list of registrations and the count as the response
      return res.status(200).json({ 
        totalEntries, 
        registrations 
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unable to fetch registrations" });
    }
  };

module.exports = {getAllRegistrations,eventRegis};