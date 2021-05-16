import './post.css';

import React, { Component } from 'react';
import Loading from '../../../common/loading';
import { bindActionCreators } from 'redux';
import { getById } from './../../../reducers/posts/post-actions';
import { getIdByRouter } from './../../../common/api/router';
import { connect } from 'react-redux';
import { removeScripts } from '../../../common/api/html';
import { withRouter } from 'react-router';

class PostDetail extends Component {
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
        post: { ...data, text: removeScripts(data.text) }
      });
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <div id="post">
        { loading 
          ? <Loading style={ { paddingTop: 'calc(40vh - 230px)' } }/> 
          : this.content() 
        }
      </div>
    );
  }

  content() {
    const { post } = this.state;
    return (
      <div>
        <h2>{ post.title }</h2>
        { post.image && <div className="image" style={ { backgroundImage: `url('${post.image}')` } }></div> }
        <div className="content" dangerouslySetInnerHTML={ { __html: post.text } }></div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getById }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(PostDetail));
