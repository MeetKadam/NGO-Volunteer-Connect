const { Schema, model } = require("mongoose");

const donationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Assuming there's a 'User' model
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

// Create the donation model
const Donation = model("Donation", donationSchema);

module.exports = Donation;
