const {Record, validate} = require('../models/record'); 
const {Patient} = require('../models/patient'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//getting patient's record by patient id
router.get('/', async (req, res) => {
  const records = await Record.find({ patient_id: req.params.id });
  res.send(records);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const patient = await Patient.findById(req.params.id );
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