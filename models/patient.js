const Joi = require('joi');
const mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
  dateIncluded: Date,
  patientName: String, 
  age: String, 
  gender: String,  
  addr1: String, 
  addr2: String, 
  city: String, 
  province: String, 
  postcode: String,  
  mobNumb: String,  
  email: String, 
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Patient' collection in the MongoDB database
var Patient = mongoose.model('Patient', patientSchema);


function validatePatient(patient) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    dateIncluded: Joi.date().required(),
    patientName: Joi.string().min(5).max(50).required(),
    age: Joi.number().min(1).required(),
    gender: Joi.string().min(1).max(1).required(),
    addr1: Joi.string().min(5).max(255).required(),
    addr2: Joi.string() ,
    city: Joi.string().min(3).max(30).required(),
    province: Joi.string().min(3).max(30).required(),
    postcode: Joi.string().min(6).max(6).required(),
    mobNumb: Joi.string().min(5).max(12).required(),
    email: Joi.string().min(10).max(50).required()
  };

  return Joi.validate(patient, schema);
}

exports.Patient = Patient; 
exports.validate = validatePatient;