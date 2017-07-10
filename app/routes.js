import React from 'react';
import { Route, IndexRoute } from 'react-router';

import asyncComponent from './utils/asyncComponent'; /* for async page, show loading component */

import Root from './containers/Root';
import Posts from './containers/Posts';
import Sites from './containers/Sites';
import Post from './containers/Post';
import About from './components/About';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={About} />
    { /* async component */}
    <Route path="/async-example" getComponent={(location, callback) =>
      __CLIENT__
        ? asyncComponent(require.ensure([], require => callback('', require('./components/AsyncExample').default), 'async-example'))
        : callback('', require('./components/AsyncExample').default)
    } />
    <Route path="/sites/:site_id" component={Posts} />
    <Route path="/sites/:site_id/posts" component={Posts} />
    <Route path="/sites/:site_id/posts/:id" component={Post} />
    <Route path="/sites" component={Sites} />
    <Route path="/about" component={About} />
  </Route>
);
