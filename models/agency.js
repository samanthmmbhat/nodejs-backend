// models/agency.js
const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Address1: { type: String, required: true },
  Address2: String,
  State: { type: String, required: true },
  City: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
});

module.exports = mongoose.model('Agency', agencySchema);
