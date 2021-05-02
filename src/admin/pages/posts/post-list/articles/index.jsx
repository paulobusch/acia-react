import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, updateOrderBulk, remove } from '../../../../../reducers/posts/post-actions';
import { POST_ARTICLE } from './../../../../../reducers/posts/post-type';
import PostListBase from './../base';

class ArticlesList extends PostListBase {
  constructor(props) {
    super(props, POST_ARTICLE);
  }
  
  configure() { 
    super.configure();

    this.tableColumns = this.tableColumns.filter(t => t.label !== 'Imagem');
  }
}

const mapStateToProps = state => ({ posts: state.posts });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticlesList));
