import './home.css';

import React, { Component } from 'react';

import Slider from '../../common/slider/Slider';
import ServicesSection from './sections/services/ServicesSection';
import NewsSection from './sections/news/NewsSection';
import ActionsSection from './sections/actions/ActionsSection';
import ArticlesSection from './sections/articles/ArticlesSection';
import { getAll as getAllSlides } from '../../.../../../reducers/slides/slide-actions';
import { getAll as getAllPosts } from '../../.../../../reducers/posts/post-actions';
import OverlaySlide from './overlay-slide';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { loadingPosts: true };
    this.mapSlideData = this.mapSlideData.bind(this);
    this.afterLoadPosts = this.afterLoadPosts.bind(this);
    this.toggleLoadingPosts = this.toggleLoadingPosts.bind(this);
  }

  componentWillMount() {
    this.props.getAllSlides();
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

  toggleLoadingPosts(loading) {
    this.setState({
      ...this.state,
      loadingPosts: loading
    });
  }

  render() {
    const { posts } = this.props;
    const news = posts.filter(p => p.type === 'Notícia');
    const actions = posts.filter(p => p.type === 'Acia em Ação');
    const articles = posts.filter(p => p.type === 'Artigo');

    return (
      <div id="home">
        <div className="slides-container">
          <Slider slides={ this.props.slides.map(s => this.mapSlideData(s)) } timeTransition={ 10000 }/>
        </div>
        <ServicesSection />
        <NewsSection loading={ this.state.loadingPosts } news={ news }/>
        <ActionsSection loading={ this.state.loadingPosts } actions={ actions }/>
        <ArticlesSection loading={ this.state.loadingPosts } articles={ articles }/>
      </div>
    );
  }
}

const mapStateToProps = state => ({ slides: state.slides, posts: state.posts });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllSlides, getAllPosts }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
