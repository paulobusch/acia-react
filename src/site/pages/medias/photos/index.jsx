import './photos.css';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { MEDIA_PHOTO } from './../../../../reducers/medias/media-type';
import { getAll } from '../../../../reducers/medias/media-actions';
import PhotoCard from './photo-card/index';
import MediaListBase from '..';

class PhotoList extends MediaListBase {
  constructor(props) {
    super(props, MEDIA_PHOTO);
  }

  card(props) {
    return <PhotoCard key={ props.id } { ...props }/>;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAll }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(PhotoList));
