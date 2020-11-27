const express = require('express');
const patients = require('../routes/patients');
const records = require('../routes/records');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/patients', patients);
  app.use('/api/patients', records);
}