import './standards.css';

import React from 'react';
import { Component } from 'react';

import Slider from './../../../../common/slider/Slider';
import Loading from './../../../../../common/loading/index';
import OverlaySlide from './../../overlay-slide/index';
import { SLIDE_OVERLAY_LINK } from './../../../../../reducers/slides/slide-type';
import Section from './../../../../common/section/Section';

export default class StandardsSection extends Component {
  render() {
    return (
      <Section className="standards-section">
        { this.content() }
      </Section>
    );
  }
  
  content() {
    const { standards, loading } = this.props;
    if (!loading && standards.length === 0) return false;
    return (
      <div>
        <h2 className="publicity-header">PUBLICIDADE</h2>
        <div className="publicities">
          { loading && <Loading block style={ { marginTop: '5vh' } }/> }
          { !loading && standards.map(s => this.standard(s)) }
        </div>
      </div>
    );
  }

  standard(standard) {
    return (
      <div key={ standard.id } className="publicities-slider-container">
        <Slider slides={ standard.slides.map(s => this.mapSlideData(s)) } timeTransition={ standard.transition * 1000 }/>
      </div>
    );
  }

  mapSlideData(standard) {
    return { 
      image: standard.image,
      position: 'center center',
      template: standard.link 
        ? OverlaySlide({ overlay: { type: SLIDE_OVERLAY_LINK, tooltip: standard.title, url: standard.link } }) 
        : false
    };
  }
}
