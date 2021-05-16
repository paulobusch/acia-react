import './articles.css';

import React from 'react';

import PostSectionBase from './../shared/post-section/index';
import Slider from './../../../../../common/slider/Slider';
import { POST_ARTICLE } from '../../../../../../reducers/posts/post-type';

export default class ArticlesSection extends PostSectionBase {
  constructor(props) {
    super(props, POST_ARTICLE);
  }

  content() {
    const publicities1 = [
      { image: 'images/publicities/publicity-1.jpg', position: 'center center' }
    ];
    const publicities2 = [
      { image: 'images/publicities/publicity-2.jpg', position: 'center center' },
      { image: 'images/publicities/publicity-3.png', position: 'center center' }
    ];

    return (
      <div>
        { super.content() }
  
        <h2 className="publicity-header">PUBLICIDADE</h2>
        <div className="publicities">
          <div className="publicities-slider-container">
            <Slider slides={ publicities1 } timeTransition={ 10000 }/>
          </div>
          <div className="publicities-slider-container">
            <Slider slides={ publicities2 } timeTransition={ 10000 }/>
          </div>
        </div>
      </div>
    );
  }
}
