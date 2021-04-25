import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll, updateOrderBulk, remove } from '../../../../reducers/posts/post-actions';
import ListBase from '../../../partials/list-base';
import Image from '../../../../common/image';
import { formatDate } from './../../../../common/formatters/date';

class PostList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Posts';
    this.className = 'page-post-list';
    this.resumeText = this.resumeText.bind(this);
  }

  resumeText(text) {
    const limit = 180;
    if (!text) return false;
    if (text.length > limit) 
      return <span>{text.substr(0, limit - 3)}...</span>;
    return <span>{text}</span>;
  }

  configure() {
    this.tableColumns = [
      { prop: 'image', label: 'Imagem', flex: 5, template: props => Image({ ...props, height: '100px' }) },
      { prop: 'type', label: 'Tipo', flex: 10 },
      { prop: 'title', label: 'Título', flex: 25 },
      { prop: 'text', label: 'Texto', flex: 50, format: this.resumeText },
      { prop: 'createdAt', label: 'Data', flex: 10, format: formatDate }
    ];
    this.sort = 'desc';
  }
  
  getList() {
    return this.props.posts;
  }
}

const mapStateToProps = state => ({ posts: state.posts });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostList));
