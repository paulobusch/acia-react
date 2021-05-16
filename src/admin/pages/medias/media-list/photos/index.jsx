import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, remove } from '../../../../../reducers/medias/media-actions';
import MediaListBase from './../base';
import { MEDIA_PHOTO } from './../../../../../reducers/medias/media-type';

class PhotosList extends MediaListBase {
  constructor(props) {
    super(props, MEDIA_PHOTO);
  }
}

const mapStateToProps = state => ({ medias: state.medias });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PhotosList));
