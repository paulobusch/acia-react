import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import MediaListBase from '../base';
import { getAllByFilter, remove } from '../../../../../reducers/medias/media-actions';
import { MEDIA_VIDEO } from '../../../../../reducers/medias/media-type';

class VideosList extends MediaListBase {
  constructor(props) {
    super(props, MEDIA_VIDEO);
  }
}

const mapStateToProps = state => ({ medias: state.medias });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VideosList));
