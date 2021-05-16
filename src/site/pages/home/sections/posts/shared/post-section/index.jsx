import './post-section.css';

import React, { Component } from 'react';

import Loading from './../../../../../../../common/loading/index';
import Section from './../../../../../../common/section/Section';
import PostCard from './../post-card/index';

export default class PostSectionBase extends Component {
  constructor(props, title) {
    super(props);

    this.title = title;
  }

  render() {
    return (
      <Section className="posts-section">
        { this.content() }
      </Section>
    );
  }
  
  content() {
    const { posts, loading } = this.props;
    return (
      <div>
        <h2>{ this.title }</h2>
        <div className="posts">
          { loading && <Loading block/> }
          { !loading && posts.map(p => <PostCard key={ p.id } { ...p }/>) }
        </div>
      </div>
    );
  }
}
