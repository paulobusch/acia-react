import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, updateOrderBulk, remove } from '../../../../../reducers/posts/post-actions';
import { POST_NEWS } from './../../../../../reducers/posts/post-type';
import PostListBase from './../base';

class NewsList extends PostListBase {
  constructor(props) {
    super(props, POST_NEWS);
  }
}

const mapStateToProps = state => ({ posts: state.posts });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewsList));
