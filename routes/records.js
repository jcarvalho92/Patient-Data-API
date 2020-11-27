const {Record, validate} = require('../models/record'); 
const {Patient} = require('../models/patient'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');


//getting patient's record by patient id
router.get('/', async (req, res) => {
  const records = await Record.find({ patient_id: req.params.id });
  res.send(records);
});

router.post('/', async (req, res) => {
 
  //validanting the input
  const schema = Joi.object({ 
    dateIncluded: Joi.date().required(),
    doctor: Joi.string().min(3).max(50).required(),
    bloodPressure : Joi.string().min(5).max(10).required(), 
    respiratoryRate : Joi.string().min(1).max(3).required(),
    bloodOxygen : Joi.string().min(2).max(4).required(),
    heartbeatRate : Joi.string().min(2).max(10).required(),
    weight : Joi.string().min(1).max(3).required(),
    height : Joi.string().min(3).max(4).required(),
    temperature : Joi.string().min(2).max(5).required()
   });
    
    const result = schema.validate(req.body);

    if (result.error){
      //400 bad request
      res.status(400).send(result.error.details[0].message);
      return;
    }

    const patient = await Patient.find({ patient_id: req.params.id });
   if (!patient) return res.status(400).send('Invalid patient Id.');

    let record = new Record({ 
      patient: {
          _id: patient._id,
          dateIncluded: patient.dateIncluded,
          patientName: patient.patientName,
          age: patient.age,
          gender: patient.gender,
          addr1: patient.addr1,
          addr2: patient.addr2,
          city: patient.city,
          province: patient.province,
          postcode: patient.postcode,
          mobNumb: patient.mobNumb,
          email: patient.email
      },
      dateIncluded: req.body.dateIncluded,
      doctor: req.body.doctor,
      bloodPressure : req.body.bloodPressure,  
      respiratoryRate : req.body.respiratoryRate, 
      bloodOxygen : req.body.bloodOxygen, 
      heartbeatRate : req.body.heartbeatRate, 
      weight : req.body.weight, 
      height : req.body.height, 
      temperature : req.body.temperature 
  
    });

    record = await record.save();

    res.send(record);
  
});

module.exports = router; 