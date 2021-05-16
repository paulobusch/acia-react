import React from 'react';
import { Provider } from 'react-redux';
import { hashHistory, IndexRoute, Redirect, Route, Router } from 'react-router';
import { applyMiddleware, createStore } from 'redux';

import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

import Home from './site/pages/home';
import Reducers from './reducers/reducers';
import SiteLayout from './site/SiteLayout';
import AdminLayout from './admin/AdminLayout';
import Construction from './admin/pages/construction/Construction';
import LawSuitList from './admin/pages/law-suits/law-suit-list';
import lawSuitForm from './admin/pages/law-suits/law-suit-form';
import LawSuitSearch from './site/pages/law-suit/law-suit-search';
import LawSuitDetail from './site/pages/law-suit/law-suit-detail';
import SlideList from './admin/pages/slides/slide-list';
import SlideForm from './admin/pages/slides/slide-form';
import PostListTabs from './admin/pages/posts/post-list';
import PostForm from './admin/pages/posts/post-form';
import Subscribe from './site/pages/subscribe/index';
import Auth from './admin/auth/login/index';
import Logout from './admin/auth/logout/index';
import ChangePasswordForm from './admin/auth/change-password/index';
import ForgotPasswordForm from './admin/auth/forgot-password/index';
import PostDetail from './site/pages/post';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
  && __REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(thunk, multi, promise)(createStore)(Reducers, devTools);
export default props => (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ SiteLayout }>
        <IndexRoute component={ Home }/>
        <Route path="subscribe" component={ Subscribe }/>
        <Route path="law-suit/search" component={ LawSuitSearch }/>
        <Route path="law-suit/view/:id" component={ LawSuitDetail }/>
        <Route path="posts/view/:id" component={ PostDetail }/>
      </Route>
      <Route exact path="/login" component={ Auth } />
      <Route exact path="/logout" component={ Logout } />
      <Route exact path="/change-password" component={ ChangePasswordForm } />
      <Route exact path="/forgot-password" component={ ForgotPasswordForm } />
      <Route exact path="/forgot-password/:email" component={ ForgotPasswordForm } />
      <Route exact path="/admin" component={ AdminLayout }>
        <Route path="slides" component={ SlideList }/>
        <Route path="slides/new" component={ SlideForm }/>
        <Route path="slides/edit/:id" component={ SlideForm }/>
        <Route path="posts/new" component={ PostForm }/>
        <Route path="posts/new/:type" component={ PostForm }/>
        <Route path="posts/edit/:id" component={ PostForm }/>
        <Route path="posts/:tab" component={ PostListTabs }/>
        <Route path="posts" component={ PostListTabs }/>
        <Route path="law-suit" component={ LawSuitList }/>
        <Route path="law-suit/new" component={ lawSuitForm }/>
        <Route path="law-suit/edit/:id" component={ lawSuitForm }/>
        <Route path="standards" component={ Construction }/>
        <Route path="benefits" component={ Construction }/>
        <Route path="products" component={ Construction }/>
        <Route path="directors" component={ Construction }/>
        <Route path="covenants" component={ Construction }/>
      </Route>
    </Router>
  </Provider>
);
