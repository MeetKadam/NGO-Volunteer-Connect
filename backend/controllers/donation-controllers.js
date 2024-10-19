const Donation = require("../models/donation-model");

// Controller for handling a new donation
const createDonation = async (req, res) => {
  try {
    const { userId, name, amount } = req.body; // Expect userId, name, and amount from the request

    // Create a new donation
    const newDonation = await Donation.create({ userId, name, amount });

    return res.status(201).json({ message: "Donation successful", donation: newDonation });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to process the donation" });
  }
};

// Controller for getting all donations and the total amount
const getAllDonations = async (req, res) => {
  try {
    // Fetch all the donations
    const donations = await Donation.find();

    // Calculate the total amount donated
    const totalDonations = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    const totalAmount = totalDonations[0]?.totalAmount || 0; // Fallback to 0 if no donations

    // Send the donations and total amount in the response
    return res.status(200).json({ totalAmount, donations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to fetch donations" });
  }
};

module.exports = {
  createDonation,
  getAllDonations
};
