import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory
} from 'react-router';

import App from './App';
import ExploreRoute from './ExploreRoute';
import UserIndexRoute from './UserIndexRoute';

let NoMatch = () => <h1>404</h1>

export default () =>
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ExploreRoute} />
      <Route path="users">
        <IndexRoute component={ExploreRoute} />
        <Route path=":id" component={UserIndexRoute} />
      </Route>
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>

