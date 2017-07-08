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

// force: true will drop the table if it already exists
// Site.sync({force: true}).then(() => {
//   // Table created
//   return Site.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });
// console.log(Site);
