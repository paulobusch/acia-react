import './ArticlesSection.css';

import React from 'react';

import Slider from './../../../../common/slider/Slider';
import Section from '../../../../common/section/Section';
import ArticleCard from './article-card/ArticleCard';
import Loading from './../../../../../common/loading/index';

export default props => {
  const publicities1 = [
    { image: 'images/publicities/publicity-1.jpg', position: 'center center' }
  ];
  const publicities2 = [
    { image: 'images/publicities/publicity-2.jpg', position: 'center center' },
    { image: 'images/publicities/publicity-3.png', position: 'center center' }
  ];

  return (
    <Section id="articles">
      <h2>ARTIGOS</h2>
      <div className="articles">
        { props.loading && <Loading block/> }
        { !props.loading && props.articles.map(n => <ArticleCard key={ n.id } title={ n.title } text={ n.text }/>) }
      </div>
  
      <h2>PUBLICIDADE</h2>
      <div className="publicities">
        <div className="publicities-slider-container">
          <Slider slides={ publicities1 } timeTransition={ 10000 }/>
        </div>
        <div className="publicities-slider-container">
          <Slider slides={ publicities2 } timeTransition={ 10000 }/>
        </div>
      </div>
    </Section>
  );  
} 

