import { db } from '../config/database.js';
const Sequelize = require('sequelize');

export const Site = db.define('site', {
  siteName: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING,
  },
  authToken: {
    type: Sequelize.STRING,
  },
});