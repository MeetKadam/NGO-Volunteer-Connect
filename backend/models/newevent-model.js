const { Schema, model } = require("mongoose");
const contactSchema = new Schema({
  eventname: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  skills: { type: String, required: true },
  time: { type: String, required: true },
  filename: { type: String },
  path: { type: String },







});
// create a new collections(Model)
const NewEvent = new model("NewEvent", contactSchema);
module.exports = NewEvent;
//name,description,city,skills,time req,image