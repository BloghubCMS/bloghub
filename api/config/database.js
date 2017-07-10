const Sequelize = require('sequelize');
var colors = require('colors');

export const db = new Sequelize('postgresql-orm', 'student', 'ilovetesting', {
  host: 'localhost',
  dialect: 'postgres',
});

// Set references to all the models here:
const Site = require('../models/sites.js');
// import { Site } from '../models/sites.js';