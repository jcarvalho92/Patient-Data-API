const request = require('supertest');
const {Patient} = require('../../models/patient');
const mongoose = require('mongoose');

//to get the server from index.js
let server;

describe('/api/patients', () => {
  beforeEach(() => { //call this function before each test
    server = require('../../index');//initialization
   })
  afterEach(async () => { 
    server.close(); //closing (we should close after each test)
    await Patient.remove({});//cleaning the database after each test
  });

  describe('GET /', () => {
    it('should return all patients', async () => {
      const patients = [
        { patientName: 'patient1' },
        { patientName: 'patient2' },
      ];
      //insertMany = it can add multiple documents to mongoDB in one go
      await Patient.collection.insertMany(patients);
      //get request
      const res = await request(server).get('/api/patients');
      
      expect(res.status).toBe(200);
      //validating that it has a patient with this name "patient1" in the body
      expect(res.body.some(g => g.patientName === 'patient1')).toBeTruthy();
      //validating that it has a patient with this name "patient2" in the body
      expect(res.body.some(g => g.patientName === 'patient2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a patient if valid id is passed', async () => {
      const patient = new Patient({ 
        patientName: "patient1",
        dateIncluded: "2020-11-26",
        age: "1",
        gender: "F",
        addr1: "1 street",
        city: "Toronto",
        province: "Ontario",
        postcode: "a1a1a1",
        mobNumb: "4370001111",
        email: "test@gmail.com"
      });
      await patient.save();
      //get request
      const res = await request(server).get('/api/patients/' + patient._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('patientName', patient.patientName);   
      expect(res.body).toHaveProperty('age', patient.age);   
      expect(res.body).toHaveProperty('gender', patient.gender);   
      expect(res.body).toHaveProperty('addr1', patient.addr1);   
      expect(res.body).toHaveProperty('city', patient.city);   
      expect(res.body).toHaveProperty('province', patient.province);   
      expect(res.body).toHaveProperty('postcode', patient.postcode);   
      expect(res.body).toHaveProperty('mobNumb', patient.mobNumb);   
      expect(res.body).toHaveProperty('email', patient.email);     
    });

    it('should return 404 if invalid id is passed', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/patients/'+id);

      expect(res.status).toBe(404);
    });

    it('should return 404 if no patient with the given id exists', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/patients/' + id);

      expect(res.status).toBe(404);
    });
  });

});