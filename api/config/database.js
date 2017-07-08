const Sequelize = require('sequelize');
var colors = require('colors');

export const db = new Sequelize('postgresql-orm', 'student', 'ilovetesting', {
  host: 'localhost',
  dialect: 'postgres'
});

// Set references to all the models here:
const Site = require('../models/sites.js');

const syncEvent = (data) => {
  db.sync({ logging: console.log }).then(() => {
  const Event = db.define('events', {
    _id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id: {
      type: Sequelize.STRING
    },
    summary: {
      type: Sequelize.STRING
    },
    htmlLink: {
      type: Sequelize.STRING
    },
    sequence: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    start: {
      type: Sequelize.DATE
    },
    end: {
      type: Sequelize.DATE
    }
  });

  // force: true will drop the table if it already exists
  Event.sync({force: true}).then(() => {
    Object.keys(data).forEach(date => {
    data[date].forEach(event => {
      insert(Event, event);
    });
    
  });

}); 
});
} 


function insert(Event, event) {
     Event.create({
           id: event.id,
      summary: event.summary,
     htmlLink: event.htmlLink,
     sequence: event.sequence,
    createdAt: event.created,
    updatedAt: event.updated,
        start: event.start.dateTime,
          end: event.end.dateTime
    });
}

