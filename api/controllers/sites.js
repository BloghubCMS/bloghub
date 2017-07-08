import Express from 'express';
import wrap from 'express-async-wrap'; // can use async, await

const Router = new Express.Router();
import { Site } from '../models/sites.js';

export default [
  // See in /app/redux/modules/posts/posts.js
  Router.get('/api/sites', wrap(async function(req, res) {
    console.log(req.query.testParam); // example
    console.log('GET FROM api/sites'); // example

    Site.findAll().then(sites => {
      res.json({
        sites: sites
      });
    });

  })),

  Router.post('/api/sites', wrap(async function(req, res) {
    console.log('POST TO api/sites'); // example

    // force: true will drop the table if it already exists
    Site.sync({force: true}).then(() => {
      // Table created
      return Site.create({
        siteName: 'blogSiteName',
             url: 'blog.com.something',
       authToken: '81f249a7e76a14f66ab50cc85c170aaa803a2356',
      });
    });

    console.log(Site);

//   function insert(Event, event) {
//      Event.create({
//            id: event.id,
//       summary: event.summary,
//      htmlLink: event.htmlLink,
//      sequence: event.sequence,
//     createdAt: event.created,
//     updatedAt: event.updated,
//         start: event.start.dateTime,
//           end: event.end.dateTime
//     });
// }



// const syncEvent = (data) => {
//   db.sync({ logging: console.log }).then(() => {
//   const Event = db.define('events', {
//     _id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     id: {
//       type: Sequelize.STRING
//     },
//     summary: {
//       type: Sequelize.STRING
//     },
//     htmlLink: {
//       type: Sequelize.STRING
//     },
//     sequence: {
//       type: Sequelize.INTEGER
//     },
//     createdAt: {
//       type: Sequelize.DATE
//     },
//     updatedAt: {
//       type: Sequelize.DATE
//     },
//     start: {
//       type: Sequelize.DATE
//     },
//     end: {
//       type: Sequelize.DATE
//     }
//   });

//   // force: true will drop the table if it already exists
//   Event.sync({force: true}).then(() => {
//     Object.keys(data).forEach(date => {
//     data[date].forEach(event => {
//       insert(Event, event);
//     });
    
//   });

// }); 
// });
// }



  })),
];
