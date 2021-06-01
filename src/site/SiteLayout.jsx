import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './partials/header/Header';
import Footer from './partials/footer/Footer';
import Toastr from '../common/messages/toastr';
import { listenSessionChanged } from './../reducers/auth/auth-actions';

class SiteLayout extends Component {
  componentWillMount() {
    window.addEventListener('popstate', () => window.scrollTo({ top: 0 }));
    this.props.listenSessionChanged(false);
  }

  render() {
    if (this.props.loading) return false;

    return (
      <div>
        <Header />
        { this.props.children }
        <Footer />
        <Toastr />
      </div>
    );
  }
}

const mapStateToProps = state => ({ loading: state.auth.loading });
const mapDispatchToProps = dispatch => bindActionCreators({ listenSessionChanged }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SiteLayout);
