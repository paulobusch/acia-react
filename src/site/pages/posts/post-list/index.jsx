import './post-list.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllByFilter, mapTypeToTitle } from '../../../../reducers/posts/post-actions';
import { withRouter } from 'react-router';
import Loading from './../../../../common/loading/index';
import PostCard from './../../home/sections/posts/shared/post-card/index';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.type = this.props.router.params.type;
    this.title = mapTypeToTitle(this.type);
    this.afterLoad = this.afterLoad.bind(this);
  }

  componentWillMount() {
    this.props.getAllByFilter({ type: this.type }, this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        posts: list
      });
    }
  }

  render() {
    return (
      <div id="post-list">
        <h2>{ this.title }</h2>
        <div className="posts">
          { this.list() }
        </div>
      </div>
    );
  }

  list() {
    const { posts, loading } = this.state;
    if (loading) return <Loading block style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    return posts.map(p => <PostCard key={ p.id } { ...p }/>);
  }   
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(PostList));
