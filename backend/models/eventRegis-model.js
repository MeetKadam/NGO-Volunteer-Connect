const { Schema, model } = require("mongoose");
const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },

});
// create a new collections(Model)
const EventRegis = new model("EventRegis", contactSchema);
module.exports = EventRegis;
