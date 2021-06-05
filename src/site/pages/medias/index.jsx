import './media-list.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { MEDIA_PHOTO, MEDIA_VIDEO } from './../../../reducers/medias/media-type';
import { getAll } from '../../../reducers/medias/media-actions';
import Loading from './../../../common/loading/index';
import PhotoCard from './photo-card/index';
import VideoCard from './video-card/index';

class MediaList extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.type = this.props.router.params.type;
    this.afterLoad = this.afterLoad.bind(this);
  }

  componentWillMount() {
    this.props.getAll(this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        medias: list
      });
    }
  }

  render() {
    return (
      <div id="media-list">
        <h4>MULTIMÍDIA</h4>
        { this.container() }
      </div>
    );
  }

  container() {
    const { medias, loading } = this.state;
    if (loading) return <Loading style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    const photos = medias.filter(m => m.type === MEDIA_PHOTO);
    const videos = medias.filter(m => m.type === MEDIA_VIDEO);

    return (
      <div>
        <h2>FOTOS</h2>
        <div className="photos">
          { this.photos(photos) }
        </div>
        <h2>VÍDEOS</h2>
        <div className="videos">
          { this.videos(videos) }
        </div>
      </div>
    );
  }

  photos(list) {
    return list.map(p => <PhotoCard key={ p.id } { ...p }/>);
  }

  videos(list) {
    return list.map(p => <VideoCard key={ p.id } { ...p }/>);
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAll }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(MediaList));
