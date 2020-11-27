const Joi = require('joi');
const mongoose = require('mongoose');

var patientRecordsSchema = new mongoose.Schema({
  patient_id:[
    {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'}
  ], 
  dateIncluded: Date,
  doctor: String,
  bloodPressure : String,  
  respiratoryRate : String, 
  bloodOxygen : String, 
  heartbeatRate : String, 
  weight : String, 
  height : String, 
  temperature : String, 
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'PatientRecords' collection in the MongoDB database
var PatientRecords = mongoose.model('PatientRecords', patientRecordsSchema);

function validateRecord(record) {
  const schema = {
    dateIncluded: Joi.date().required(),
    doctor: Joi.string().min(3).max(50).required(),
    bloodPressure : Joi.string().min(5).max(10).required(), 
    respiratoryRate : Joi.string().min(1).max(3).required(),
    bloodOxygen : Joi.string().min(2).max(4).required(),
    heartbeatRate : Joi.string().min(2).max(10).required(),
    weight : Joi.string().min(1).max(3).required(),
    height : Joi.string().min(3).max(4).required(),
    temperature : Joi.string().min(2).max(5).required(),
    
  };
  return Joi.validate(record, schema);
}

exports.PatientRecords = PatientRecords; 
exports.validate = validateRecord;