const { Schema, model } = require("mongoose");
const contactSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
});
// create a new collections(Model)
const Feedback = new model("Feedback", contactSchema);
module.exports = Feedback;
