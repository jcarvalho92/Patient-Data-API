const express = require('express');
const patients = require('../routes/patients');
const records = require('../routes/records');
const users = require('../routes/users');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/patients', patients);
  app.use('/api/patients/:id/records', records);
  app.use('/api/users', users);
}