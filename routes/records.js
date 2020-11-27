const {PatientRecords} = require('../models/record'); 
const {Patient} = require('../models/patient'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');


//getting patient's record by patient id
router.get('/:id/records', async (req, res) => {
  const records = await PatientRecords.find({ patient_id: req.params.id });

  if (!records) return res.status(404).send('No record with the given patient id was found');

  res.send(records);
});

router.post('/:id/records', async (req, res) => {
 
  //validanting the input
  const schema = Joi.object({ 
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

    const patient =  Patient.findById(req.params.id);
   if (!patient) 
      return res.status(400).send('Invalid patient Id.');

    let record = new PatientRecords({ 
      patient_id: req.params.id,
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

    record =  await record.save();
    res.send(record);
  
});

router.get('/:id/records', async (req, res) => {
  const records = await PatientRecords.find({ patient_id: req.params.id });

  if (!records) return res.status(404).send('No record with the given patient id was found');

  res.send(records);
});

router.get('/name/:name/records', async (req, res) => {
  
  const patient = await Patient.findOne({patientName: req.params.name})
  const records = await PatientRecords.find({ patient_id: patient._id });

  if (!records) return res.status(404).send('No record with the given patient name was found');

  res.send(records);
});

module.exports = router; 