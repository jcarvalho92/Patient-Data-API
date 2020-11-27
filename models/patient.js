const Joi = require('joi');
const mongoose = require('mongoose');

const Patient = mongoose.model('Patient', new mongoose.Schema({
  dateIncluded: {
    type: Date, 
    required: true,
    default: Date.now
  },
  patientName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  age: {
    type: Number, 
    required: true,
    min: 1
  },
  gender: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1
  },
  addr1: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  addr2: {
    type: String
  },
  city: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  province: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  postcode: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6
  },
  mobNumb: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 12
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50
  }   
}));

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