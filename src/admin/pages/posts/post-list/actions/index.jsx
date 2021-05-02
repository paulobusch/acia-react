import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, updateOrderBulk, remove } from '../../../../../reducers/posts/post-actions';
import { POST_ACTION } from './../../../../../reducers/posts/post-type';
import PostListBase from './../base';

class ActionList extends PostListBase {
  constructor(props) {
    super(props, POST_ACTION);
  }
}

const mapStateToProps = state => ({ posts: state.posts });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ActionList));
