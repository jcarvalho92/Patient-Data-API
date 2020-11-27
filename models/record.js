const Joi = require('joi');
const mongoose = require('mongoose');

const Record = mongoose.model('Record', new mongoose.Schema({
  Patient: { 
    type: new mongoose.Schema({
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
    }),  
    required: true
  },

  dateIncluded: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  doctor: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }     ,
  bloodPressure: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 10
  },   
  respiratoryRate: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 3
  },  
  bloodOxygen: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 4
  },  
  heartbeatRate: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  },  
  weight: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 3
  },  
  height: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 4
  },  
  temperature: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 5
  },    
}));

function validateRecord(record) {
  const schema = {
    patientId: Joi.objectId().required(),
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

exports.Record = Record; 
exports.validate = validateRecord;