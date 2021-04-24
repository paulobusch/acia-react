import React from 'react';
import { Provider } from 'react-redux';
import { hashHistory, IndexRoute, Redirect, Route, Router } from 'react-router';
import { applyMiddleware, createStore } from 'redux';

import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

import Home from './site/pages/home/Home';
import Reducers from './reducers/reducers';
import SiteLayout from './site/SiteLayout';
import AdminLayout from './admin/AdminLayout';
import Construction from './admin/pages/construction/Construction';
import LawSuitList from './admin/pages/law-suits/law-suit-list/index';
import lawSuitForm from './admin/pages/law-suits/law-suit-form/index';
import LawSuitSearch from './site/pages/law-suit-search/index';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
  && __REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(thunk, multi, promise)(createStore)(Reducers, devTools);
export default props => (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ SiteLayout }>
        <IndexRoute component={ Home }/>
        <Route path="law-suit-search" component={ LawSuitSearch }/>
      </Route>
      <Route exact path="/admin" component={ AdminLayout }>
        <Route path="posts" component={ Construction }/>
        <Route path="law-suit" component={ LawSuitList }/>
        <Route path="law-suit/new" component={ lawSuitForm }/>
        <Route path="law-suit/edit/:id" component={ lawSuitForm }/>
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
