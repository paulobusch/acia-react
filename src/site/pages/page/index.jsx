import './page.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Loading from '../../../common/loading';
import { getById } from '../../../reducers/pages/page-actions';
import { getIdByRouter } from '../../../common/api/router';
import { removeScripts } from '../../../common/api/html';
import Message from './../../../common/message/index';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.id = getIdByRouter(this.props.router, 'view');
    this.afterLoad = this.afterLoad.bind(this);
  }

  componentWillMount() {
    this.props.getById(this.id, this.afterLoad);
  }

  afterLoad(success, data) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        page: { ...data, content: removeScripts(data.content) }
      });
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <div id="page">
        { loading 
          ? <Loading style={ { paddingTop: 'calc(40vh - 230px)' } }/> 
          : this.content()
        }
      </div>
    );
  }

  content() {
    const { loading, page } = this.state;

    if (loading) return false;
    if (!page || !page.content) return <Message message="Página não encontrada!" style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    return (
      <div>
        <h2>{ page.title }</h2>
        <div className="content" dangerouslySetInnerHTML={ { __html: page.content } }></div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getById }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(Page));
