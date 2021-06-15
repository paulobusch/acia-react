import './videos.css';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { MEDIA_VIDEO } from './../../../../reducers/medias/media-type';
import { getAll } from '../../../../reducers/medias/media-actions';
import VideoCard from './video-card/index';
import MediaListBase from '..';

class VideoList extends MediaListBase {
  constructor(props) {
    super(props, MEDIA_VIDEO);
  }

  card(props) {
    return <VideoCard key={ props.id } { ...props }/>;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAll }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(VideoList));
