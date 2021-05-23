import './articles.css';

import React from 'react';

import PostSectionBase from './../shared/post-section/index';
import Slider from './../../../../../common/slider/Slider';
import { POST_ARTICLE } from '../../../../../../reducers/posts/post-type';
import Loading from './../../../../../../common/loading/index';

export default class ArticlesSection extends PostSectionBase {
  constructor(props) {
    super(props, POST_ARTICLE);
  }

  content() {
    return (
      <div>
        { super.content() }
        { this.standards() }
      </div>
    );
  }

  standards() {
    const { standards, loadingStandards } = this.props;
    return (
      <div>
        <h2 className="publicity-header">PUBLICIDADE</h2>
        <div className="publicities">
          { loadingStandards && <Loading block style={ { marginTop: '5vh' } }/> }
          { !loadingStandards && standards.map(s => this.standard(s)) }
        </div>
      </div>
    );
  }

  standard(standard) {
    return (
      <div key={ standard.id } className="publicities-slider-container">
        <Slider slides={ standard.slides } timeTransition={ standard.transition * 1000 }/>
      </div>
    );
  }
}
