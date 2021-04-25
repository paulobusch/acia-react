import './home.css';

import React, { Component } from 'react';

import Slider from '../../common/slider/Slider';
import ServicesSection from './sections/services/ServicesSection';
import NewsSection from './sections/news/NewsSection';
import ActionsSection from './sections/actions/ActionsSection';
import ArticlesSection from './sections/articles/ArticlesSection';
import { getAll as getAllSlides } from '../../.../../../reducers/slides/slide-actions';
import OverlaySlide from './overlay-slide';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Home extends Component {
  componentWillMount() {
    this.props.getAllSlides();
  }

  mapSlideData(slide) {
    const { image, positionX, positionY, overlaySlide } = slide;
    return { 
      image: image, 
      position: `${positionX} ${positionY}`,
      template: overlaySlide ? OverlaySlide(slide) : false
    };
  }

  render() {
    return (
      <div id="home">
        <div className="slides-container">
          <Slider slides={ this.props.slides.map(s => this.mapSlideData(s)) } timeTransition={ 10000 }/>
        </div>
        <ServicesSection />
        <NewsSection />
        <ActionsSection />
        <ArticlesSection />
      </div>
    );
  }
}

const mapStateToProps = state => ({ slides: state.slides });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllSlides }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
