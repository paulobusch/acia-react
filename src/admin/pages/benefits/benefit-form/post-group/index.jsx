import './post-group.css';

import React, { Component } from 'react';
import PostForm from './post-form';
import PostList from './post-list';

export default class PostGroup extends Component {
  render() {
    return (
      <fieldset>
        <legend>Posts</legend>
        <PostForm />
        <hr />
        <PostList posts={ this.props.posts }/>
      </fieldset>
    );
  }
}
