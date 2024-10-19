const express = require("express");
const router = express.Router();

// Import donation controller functions
const { createDonation, getAllDonations } = require("../controllers/donation-controllers");

// POST route for donating
router.route("/donate").post(createDonation);

// GET route for fetching all donations and the total amount
router.route("/getAllDonations").get(getAllDonations);

module.exports = router;
