import './AdminLayout.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './partials/header/Header';
import Sidenav from './partials/sidenav/Sidenav';
import Content from './partials/content/Content';
import Toastr from '../common/messages/toastr';
import { listenSessionChanged, redirectToLogin } from './../reducers/auth/auth-actions';

class AdminLayout extends Component {
  componentWillMount() {
    this.props.listenSessionChanged(true);
  }

  render() {
    const { loading, user } = this.props;
    if (loading) return false;

    if (!user) {
      redirectToLogin();
      return false;
    }

    return (
      <div className="container-admin">
        <Header user={ user }/>
        <div className="row-admin">
          <Sidenav user={ user }/>
          <Content>
            { this.props.children }
          </Content>
          <Toastr />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ loading: state.auth.loading, user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ listenSessionChanged }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
