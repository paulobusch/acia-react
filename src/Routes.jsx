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
import SlideList from './admin/pages/slides/slide-list';
import SlideForm from './admin/pages/slides/slide-form';
import PostListTabs from './admin/pages/posts/post-list';
import MediaListTabs from './admin/pages/medias/media-list';
import BenefitList from './admin/pages/benefits/benefit-list';
import UserListTabs from './admin/pages/users/user-list';
import BoardTabs from './admin/pages/boards/board-list';
import PostForm from './admin/pages/posts/post-form';
import Subscribe from './site/pages/subscribe/index';
import Auth from './admin/auth/login/index';
import Logout from './admin/auth/logout/index';
import ChangePasswordForm from './admin/auth/change-password/index';
import ForgotPasswordForm from './admin/auth/forgot-password/index';
import PostDetail from './site/pages/posts/post-detail';
import PostList from './site/pages/posts/post-list';
import MediaForm from './admin/pages/medias/media-form';
import MediaList from './site/pages/medias';
import About from './site/pages/static/about';
import President from './site/pages/static/president';
import AciaCred from './site/pages/static/acia-cred';
import Certificate from './site/pages/static/digital-certificate';
import Serasa from './site/pages/static/serasa';
import AdvantagesCard from './site/pages/static/advantages-card';
import ConciliationCourt from './site/pages/static/conciliation-court';
import MeetingRoom from './site/pages/static/meeting-room';
import AciaWoman from './site/pages/static/acia-woman';
import PolicyQuality from './site/pages/static/policy-quality';
import GeographicalInformation from './site/pages/static/geographical-information';
import RelevantInformation from './site/pages/static/relevant-informations'
import CellNetwork from './site/pages/static/cell-network/index';
import BenefitForm from './admin/pages/benefits/benefit-form';
import ServiceList from './admin/pages/services/service-list/index';
import ServiceForm from './admin/pages/services/service-form';
import StandardList from './admin/pages/standards/standard-list';
import StandardForm from './admin/pages/standards/standard-form';
import Benefits from './site/pages/benefits/benefit-list';
import BenefitDetail from './site/pages/benefits/benefit-detail';
import BoardForm from './admin/pages/boards/board-form';
import BoardDetail from './site/pages/board/index';
import UserForm from './admin/pages/users/user-form';
import PageList from './admin/pages/pages/page-list/index';
import PageForm from './admin/pages/pages/page-form';
import Page from './site/pages/page/index';
import Standards from './site/pages/standards';
import Services from './site/pages/services';
import Contact from './site/pages/contact/index';
import History from './site/pages/static/history/index';
import SearchList from './site/pages/search';
import PhotoList from './site/pages/medias/photos';
import VideoList from './site/pages/medias/videos';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
  && __REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(thunk, multi, promise)(createStore)(Reducers, devTools);
export default () => (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ SiteLayout }>
        <IndexRoute component={ Home }/>
        <Route path="subscribe" component={ Subscribe }/>
        <Route path="posts/view/:id" component={ PostDetail }/>
        <Route path="posts/:type" component={ PostList }/>
        <Route path="posts" component={ PostList }/>
        <Route path="standards" component={ Standards }/>
        <Route path="benefits/view/:id" component={ BenefitDetail }/>
        <Route path="benefits/:id" component={ Benefits }/>
        <Route path="page/view/:id" component={ Page }/>
        <Route path="services" component={ Services }/>
        <Route path="multimedia" component={ MediaList }/>
        <Route path="photos" component={ PhotoList }/>
        <Route path="videos" component={ VideoList }/>
        <Route path="boards" component={ BoardDetail }/>
        <Route path="about" component={ About }/>
        <Route path="president" component={ President }/>
        <Route path="acia-cred" component={ AciaCred }/>
        <Route path="digital-certificate" component={ Certificate }/>
        <Route path="serasa" component={ Serasa }/>
        <Route path="advantages-card" component={ AdvantagesCard }/>
        <Route path="conciliation-court" component={ ConciliationCourt }/>
        <Route path="meeting-room" component={ MeetingRoom }/>
        <Route path="acia-woman" component={ AciaWoman }/>
        <Route path="policy-quality" component={ PolicyQuality }/>
        <Route path="geographical-information" component={ GeographicalInformation }/>
        <Route path="relevant-informations" component={ RelevantInformation }/>
        <Route path="cell-network" component={ CellNetwork }/>
        <Route path="history" component={ History }/>
        <Route path="contact" component={ Contact }/>
        <Route path="search" component={ SearchList }/>
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
        <Route path="multimedia/new" component={ MediaForm }/>
        <Route path="multimedia/new/:type" component={ MediaForm }/>
        <Route path="multimedia/edit/:id" component={ MediaForm }/>
        <Route path="multimedia/:tab" component={ MediaListTabs }/>
        <Route path="multimedia" component={ MediaListTabs }/>
        <Route path="benefits/new" component={ BenefitForm }/>
        <Route path="benefits/edit/:id" component={ BenefitForm }/>
        <Route path="benefits" component={ BenefitList }/>
        <Route path="services/new" component={ ServiceForm }/>
        <Route path="services/edit/:id" component={ ServiceForm }/>
        <Route path="services" component={ ServiceList }/>
        <Route path="standards/new" component={ StandardForm }/>
        <Route path="standards/edit/:id" component={ StandardForm }/>
        <Route path="standards" component={ StandardList }/>
        <Route path="pages" component={ PageList }/>
        <Route path="pages/new" component={ PageForm }/>
        <Route path="pages/edit/:id" component={ PageForm }/>
        <Route path="boards/new" component={ BoardForm }/>
        <Route path="boards/new/:type" component={ BoardForm }/>
        <Route path="boards/edit/:id" component={ BoardForm }/>
        <Route path="boards/:tab" component={ BoardTabs }/>
        <Route path="boards" component={ BoardTabs }/>
        <Route path="users/new" component={ UserForm }/>
        <Route path="users/new/:role" component={ UserForm }/>
        <Route path="users/edit/:id" component={ UserForm }/>
        <Route path="users/:tab" component={ UserListTabs }/>
        <Route path="users" component={ UserListTabs }/>
      </Route>
    </Router>
  </Provider>
);
