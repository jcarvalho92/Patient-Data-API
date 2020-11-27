const {Patient} = require('../models/patient'); 
const {validate} = require('../models/patient'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

//geting all patients and ordering by name
router.get('/', async (req, res) => {
  const patients = await Patient.find().sort('patientName');
  res.send(patients);
});

router.post('/', async (req, res) => {
  //validanting the input
  const schema = Joi.object({ 
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
   });
    
    const result = schema.validate(req.body);

    if (result.error){
      //400 bad request
      res.status(400).send(result.error.details[0].message);
      return;
    }

    let patient = new Patient({
    dateIncluded: req.body.dateIncluded,
    patientName: req.body.patientName,
    age: req.body.age,
    gender: req.body.gender,
    addr1: req.body.addr1,
    addr2: req.body.addr2,
    city: req.body.city,
    province: req.body.province,
    postcode: req.body.postcode,
    mobNumb: req.body.mobNumb,
    email: req.body.email
    });

    patient = await patient.save();

    res.send(patient);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const patient = await Patient.findByIdAndUpdate(req.params.id,
    { 
        dateIncluded: req.body.dateIncluded,
        patientName: req.body.patientName,
        age: req.body.age,
        gender: req.body.gender,
        addr1: req.body.addr1,
        addr2: req.body.addr2,
        city: req.body.city,
        province: req.body.province,
        postcode: req.body.postcode,
        mobNumb: req.body.mobNumb,
        email: req.body.email
    }, { new: true });

  if (!patient) return res.status(404).send('The patient with the given ID was not found.');
  
  res.send(patient);
});

router.delete('/:id', async (req, res) => {
  const patient = await Patient.findByIdAndRemove(req.params.id);

  if (!patient) return res.status(404).send('The patient with the given ID was not found.');

  res.send(patient);
});

router.get('/:id', async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) return res.status(404).send('The patient with the given ID was not found.');

  res.send(patient);
});

module.exports = router; 