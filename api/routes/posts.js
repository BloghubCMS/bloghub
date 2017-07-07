import Express from 'express';
import wrap from 'express-async-wrap'; // can use async, await
import {gitConnect, gitLoadDir} from '../modules/gitConnect.js';

const Router = new Express.Router();
var run = require('gen-run');

export default [
  // See in /app/redux/modules/posts/posts.js
  Router.get('/api/posts', wrap(async function(req, res) {
    console.log(req.query.testParam); // example

    // res.json({
    //   posts: [
    //     {
    //       id: '1',
    //       text: 'example 1',
    //       title: 'title 1',
    //     },
    //     {
    //       id: '2',
    //       text: 'example 2',
    //       title: 'title 2',
    //     },
    //     {
    //       id: '3',
    //       text: 'example 3',
    //       title: 'title 3',
    //     },
    //   ],
    // });

    run(function*() {
      let { repo } = gitConnect();

      // We first read the commit.
      var headHash = yield repo.readRef("refs/heads/master");
      var commit = yield repo.loadAs("commit", headHash);
      // We then read the tree using `commit.tree`.
      var tree = yield repo.loadAs("tree", commit.tree);
      let posts = yield repo.loadAs("tree", tree["_posts"].hash);

      const post_list = [];
      Object.keys(posts).forEach( (k) => {
        post_list.push({
          id: posts[k].hash,
          text: 'example 1',
          title: k,
        });
      });
      res.json({
        posts: post_list,
      });

    });

  })),
];
