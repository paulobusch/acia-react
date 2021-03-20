import './Home.css';

import React from 'react';

import Slider from '../../common/slider/Slider';
import TemplateSlideAbout from './template-slide-about/TemplateSlideAbout';
import ServicesSection from './sections/services/ServicesSection';
import ArticlesSection from './sections/articles/ArticlesSection';

export default props => {
  const slides = [
    { image: 'images/slides/slide-1.jpg', position: 'center center', template: TemplateSlideAbout },
    { image: 'images/slides/slide-2.jpg', position: 'left center' }
  ];

  return (
    <div id="home">
      <div className="slides-container">
        <Slider slides={ slides } timeTransition={ 10000 }/>
      </div>
      <ServicesSection />
      <ArticlesSection />
    </div>
  );
}
