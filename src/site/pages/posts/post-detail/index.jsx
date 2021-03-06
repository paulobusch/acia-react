import './post-detail.css';

import React, { Component } from 'react';
import Loading from '../../../../common/loading';
import { bindActionCreators } from 'redux';
import { getById } from '../../../../reducers/posts/post-actions';
import { getIdByRouter } from '../../../../common/api/router';
import { connect } from 'react-redux';
import { removeScripts } from '../../../../common/api/html';
import { withRouter } from 'react-router';
import PhotoCard from './../../medias/photos/photo-card/index';
import VideoCard from './../../medias/videos/video-card/index';
import DocumentCard from '../../static/conciliation-court/document-card';

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.id = getIdByRouter(this.props.router, 'view');
    this.afterLoad = this.afterLoad.bind(this);
  }

  componentWillMount() {
    this.props.getById(this.id, this.afterLoad);
  }

  afterLoad(success, data) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        post: { ...data, text: removeScripts(data.text) }
      });
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <div id="post">
        { loading 
          ? <Loading style={ { paddingTop: 'calc(40vh - 230px)' } }/> 
          : this.content() 
        }
      </div>
    );
  }

  content() {
    const { post } = this.state;
    return (
      <div>
        <h2>{ post.title }</h2>
        { post.image && <div className="image" style={ { backgroundImage: `url('${post.image}')` } }></div> }
        <div className="content" dangerouslySetInnerHTML={ { __html: post.text } }></div>
        { this.photos(post.photos) }
        { this.videos(post.videos) }
        { this.files(post.files) }
      </div>
    );
  }

  photos(photos) {
    if (!photos || photos.length === 0) return false;

    return (
      <div>
        <h4>FOTOS</h4>
        <div className="photos">
          { photos.map((p, i) => <PhotoCard key={ i } { ...p } flexBasis="30%"/>) }
        </div>
      </div>
    );
  }

  videos(videos) {
    if (!videos || videos.length === 0) return false;

    return (
      <div>
        <h4>V??DEOS</h4>
        <div className="videos">
          { videos.map((p, i) => <VideoCard key={ i } { ...p } url={ p.link } flexBasis="30%"/>) }
        </div>
      </div>
    );
  }

  files(files) {
    if (!files || files.length === 0) return false;

    return (
      <div>
        <h4>ANEXOS</h4>
        <div className="files">
          { files.map((p, i) => <DocumentCard key={ i } { ...p } url={ p.file } description={ p.title } title={ this.getName(p.name) }/>) }
        </div>
      </div>
    );
  }

  getName(fileName) {
    if (!fileName || fileName.search('.') === -1) return '';
    return fileName.substr(0, fileName.indexOf('.'));
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getById }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(PostDetail));
