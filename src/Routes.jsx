import React from 'react';
import { Provider } from 'react-redux';
import { hashHistory, IndexRoute, Redirect, Route, Router } from 'react-router';
import { applyMiddleware, createStore } from 'redux';

import promise from 'redux-promise';
import thunk from 'redux-thunk';

import Home from './site/pages/home/Home';
import Reducers from './reducers/reducers';
import SiteLayout from './site/SiteLayout';
import AdminLayout from './admin/AdminLayout';
import Construction from './admin/pages/construction/Construction';

const store = applyMiddleware(thunk, promise)(createStore)(Reducers);
export default props => (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ SiteLayout }>
        <IndexRoute component={ Home }/>
      </Route>
      <Route exact path="/admin" component={ AdminLayout }>
        <Route path="posts" component={ Construction }/>
        <Route path="banners" component={ Construction }/>
        <Route path="standards" component={ Construction }/>
        <Route path="news" component={ Construction }/>
        <Route path="benefits" component={ Construction }/>
        <Route path="products" component={ Construction }/>
        <Route path="directors" component={ Construction }/>
        <Route path="covenants" component={ Construction }/>
      </Route>
    </Router>
  </Provider>
);
