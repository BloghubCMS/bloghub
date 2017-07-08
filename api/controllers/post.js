import Express from 'express';
import wrap from 'express-async-wrap'; // can use async, await
import {gitConnect, gitLoadDir} from '../modules/gitUtils.js';
var modes = require('js-git/lib/modes');

const Router = new Express.Router();
var run = require('gen-run');

export default [
  // See in /app/redux/modules/posts/posts.js
  Router.get('/api/post/:hash', wrap(async function(req, res) {
    console.log(req.query.testParam); // example

    // res.json({
    //   post:
    //     {
    //       id: '1',
    //       text: 'We are super awesome.',
    //       title: 'Super Awesome Post',
    //     },
    // });
    // 

    run(function*() {
      let { repo, commitHash } = gitConnect();

      var headHash = yield repo.readRef("refs/heads/master");
      var commit = yield repo.loadAs("commit", headHash);
      // We then read the tree using `commit.tree`.

      var file = yield repo.loadAs("blob", req.params.hash);

      let f = file.toString();
      let fileText = f.split('---')[2];
      const meta = f.split('---')[1].split('\n');
      console.log(meta[2].split('"'));
      const title = meta[2].split('"')[1];

      res.json({
        post: {
          id: req.params.hash,
          text: fileText,
          title: title,
        },
      });

    });

  })),
  Router.post('/api/post/:filename', wrap(async function(req, res) {
    console.log('input:',req.body, req.params.hash); // example

    const filename = '2017-07-04-garret-is-a-cool-guy.markdown';

    run(function*() {
      let { repo } = gitConnect();

      var headHash = yield repo.readRef("refs/heads/master");
      var commit = yield repo.loadAs("commit", headHash);
      var tree = yield repo.loadAs("tree", commit.tree);
      let posts = yield repo.loadAs("tree", tree["_posts"].hash);
      var entry = posts[filename];
      var readme = yield repo.loadAs("text", entry.hash);

      // Build the updates array
      var updates = [
        {
          path: "_posts/" + filename, // Update the existing entry
          mode: entry.mode,  // Preserve the mode (it might have been executible)
          content: req.body.text // Write the new content
        }
      ];
      // Based on the existing tree, we only want to update, not replace.
      updates.base = commit.tree;

      // Create the new file and the updated tree.
      var treeHash = yield repo.createTree(updates);

console.log(Math.round(new Date().getTime() / 1000));
      var commitHash2 = yield repo.saveAs("commit", {
        tree: treeHash,
        author: {
          name: "BlogHub",
          email: "robot@bloghub.center",
          date: {
            seconds: Math.round(new Date().getTime() / 1000),
            offset: 7 * 60
          }
        },
        parent: headHash,
        message: "Updates Post"
      });

      // Now we can browse to this commit by hash, but it's still not in master.
      // We need to update the ref to point to this new commit.

      yield repo.updateRef("refs/heads/master", commitHash2);

      res.json({
        // post: {
        //   id: fileHash,
        //   text: fileText,
        //   title: title,
        // },
      });

    });

  })),
];
