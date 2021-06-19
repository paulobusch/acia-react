import './post-section.css';

import React, { Component } from 'react';

import Loading from './../../../../../../../common/loading/index';
import Section from './../../../../../../common/section/Section';
import GaleryPost from '../../../../../../common/galery/galery-post';
import { Link } from 'react-router';
import { mapTypeToTitle } from '../../../../../../../reducers/posts/post-actions';

export default class PostSectionBase extends Component {
  constructor(props, type) {
    super(props);

    this.title = mapTypeToTitle(type);
    this.type = type;
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
        <GaleryPost cards={ posts } loading={ loading }/>
        { !loading && <Link to={ `posts/${encodeURIComponent(this.type)}` } className="link-view-all">Ver Todos</Link> }
      </div>
    );
  }
}
