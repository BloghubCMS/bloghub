import Express from 'express';
import wrap from 'express-async-wrap'; // can use async, await

const Router = new Express.Router();

export default [
  // See in /app/redux/modules/posts/posts.js
  Router.get('/api/sites', wrap(async function(req, res) {
    console.log(req.query.testParam); // example

    res.json({
      sites: [
        {
          id: '1',
          title: 'codingbros.br4incandy.com',
        },
        {
          id: '2',
          title: 'iamgrumpy.com',
        },
        {
          id: '3',
          title: 'blog.yahoo.com',
        },
        {
          id: '4',
          title: 'weeklyrambling.com',
        },
      ],
    });
  })),
];
