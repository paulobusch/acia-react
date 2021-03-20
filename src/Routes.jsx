import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './Layout';
import Home from './pages/home/Home';

export default props => (
  <Router history={ hashHistory }>
    <Route path="/" component={ Layout }>
      <IndexRoute component={ Home }/>
    </Route>
  </Router>
);
