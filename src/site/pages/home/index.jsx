import './home.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAll as getAllSlides } from '../../.../../../reducers/slides/slide-actions';
import { getAll as getAllPosts } from '../../.../../../reducers/posts/post-actions';
import { getAll as getAllStandards } from '../../.../../../reducers/standards/standard-actions';
import Slider from '../../common/slider/Slider';
import ServicesSection from './sections/services';
import OverlaySlide from './overlay-slide';
import ArticlesSection from './sections/posts/articles/index';
import { POST_ARTICLE, POST_NEWS } from './../../../reducers/posts/post-type';
import StandardsSection from './sections/standards/index';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { loadingPosts: true, loadingStandards: true };
    this.mapSlideData = this.mapSlideData.bind(this);
    this.afterLoadPosts = this.afterLoadPosts.bind(this);
    this.afterLoadStandards = this.afterLoadStandards.bind(this);
    this.toggleLoadingPosts = this.toggleLoadingPosts.bind(this);
  }

  componentWillMount() {
    this.props.getAllSlides();
    this.props.getAllStandards(this.afterLoadStandards);
    this.props.getAllPosts(this.afterLoadPosts);
  }

  mapSlideData(slide) {
    const { image, positionX, positionY, overlaySlide } = slide;
    return { 
      image: image, 
      position: `${positionX} ${positionY}`,
      template: overlaySlide ? OverlaySlide(slide) : false
    };
  }

  afterLoadPosts(success) {
    if (success) this.toggleLoadingPosts(false);
  }

  afterLoadStandards(success) {
    if (success) {
      this.setState({
        ...this.state,
        loadingStandards: false
      });
    }
  }

  toggleLoadingPosts(loading) {
    this.setState({
      ...this.state,
      loadingPosts: loading
    });
  }

  getArticles() {
    return this.props.posts
      .filter(p => [POST_ARTICLE, POST_NEWS].indexOf(p.type) !== -1);
  }

  render() {
    return (
      <div id="home">
        <div className="slides-container">
          <Slider slides={ this.props.slides.map(s => this.mapSlideData(s)) } timeTransition={ 10000 }/>
          <a className="join" href="/#/subscribe">
            <i className="fas fa-handshake"></i>
            <span>ASSOCIE-SE! CLIQUE AQUI E FAÇA SEU PRÉ CADASTRO QUE ENTRAREMOS EM CONTATO</span>
          </a>
        </div>
        <ServicesSection />
        <ArticlesSection loading={ this.state.loadingPosts } posts={ this.getArticles() }/>
        <StandardsSection loading={ this.state.loadingStandards } standards={ this.props.standards }/>
      </div>
    );
  }
}

const mapStateToProps = state => ({ slides: state.slides, posts: state.posts, standards: state.standards });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllSlides, getAllPosts, getAllStandards }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
