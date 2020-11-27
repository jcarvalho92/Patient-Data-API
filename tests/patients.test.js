const request = require('supertest');
const {Patient} = require('../models/patient');
const mongoose = require('mongoose');

let server;

describe('/api/patients', () => {
  beforeEach(() => { //call this function before each test
    server = require('../index');//initialization
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

  });

  describe('POST /', () => {


    let patient = {}; 
    let patientName;
    let dateIncluded;
    let age;
    let gender;
    let addr1;
    let city;
    let province;
    let postcode;
    let mobNumb;
    let email;

    beforeEach(() => {  
      patient =  {
        "patientName": patientName,
        "dateIncluded": dateIncluded,
        "age": age,
        "gender": gender,
        "addr1": addr1,
        "city": city,
        "province": province,
        "postcode": postcode,
        "mobNumb": mobNumb,
        "email": email
    }
    })

    const exec = async () => {
      return await request(server)
        .post('/api/patients')
        .send(patient);
    }

    it('should return 400 if any field has less than the minimum required or more than the maximum required', async () => {
          patientName = "123",
          dateIncluded = Date.now,
          age = "1",
          gender = "1",
          addr1 = "12345",
          city = "123",
          province = "123",
          postcode = "123456",
          mobNumb = "12345",
          email = "1234567890"

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should save the patient if it is valid', async () => {
      await exec();
      const patient = await Patient.find({ patientName: 'patient1' });
      expect(patient).not.toBeNull();// we expect patient not to be null as it exist in the database
    });

  });

  describe('DELETE /:id', () => {
    let patient; 
    let id; 

    const exec = async () => {
      return await request(server)
        .delete('/api/patients/' + id)
        .send();
    }

    beforeEach(async () => {
      // Before each test we need to create a patient and 
      // put it in the database.      
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
      
      id = patient._id; 
    })

    it('should return 404 if id is invalid', async () => {
      id = mongoose.Types.ObjectId();
      
      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if no patient with the given id was found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should delete the patient if input is valid', async () => {
      await exec();

      const patientInDb = await Patient.findById(id);

      expect(patientInDb).toBeNull();
    });
  });  

});