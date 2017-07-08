import Express from 'express';
import wrap from 'express-async-wrap'; // can use async, await
import {gitConnect, gitLoadDir} from '../modules/gitUtils.js';

const Router = new Express.Router();
var run = require('gen-run');

export default [
  // See in /app/redux/modules/posts/posts.js
  Router.get('/api/posts', wrap(async function(req, res) {
    if (req.query.testParam) console.log('test mode active');

    run(function* () {
      const { repo } = gitConnect();
      const tree = yield* gitLoadDir(repo);
      const postsDir = yield repo.loadAs('tree', tree._posts.hash);

      const post_list = [];
      Object.keys(postsDir).forEach((k) => {
        post_list.push({
          id: postsDir[k].hash,
        // #TODO: somehow get a text excerpt from
          text: 'stub',
          title: k,
        });
      });
      res.json({
        posts: post_list,
      });
    });

  })),
];
