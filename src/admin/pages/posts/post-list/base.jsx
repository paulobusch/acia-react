import React from 'react';

import ListBase from '../../../partials/list-base';
import Image from '../../../../common/image';
import { formatDate } from '../../../../common/formatters/date';
import { getRouteWithoutParams } from '../../../../common/router';

export default class PostListBase extends ListBase {
  constructor(props, type) {
    super(props);

    this.type = type;
    this.className = 'page-post-list';
    this.resumeText = this.resumeText.bind(this);
  }

  componentWillMount() {
    this.toggleLoading(true);
    this.props.getAllByFilter({ type: this.type }, this.afterLoad);
  }

  goNew() {
    const { router } = this.props;
    const url = `${getRouteWithoutParams(router)}/new/${encodeURIComponent(this.type)}`;
    router.push(url);
  }

  resumeText(text) {
    const limit = 300;
    if (!text) return false;
    if (text.length > limit) 
      return <span>{text.substr(0, limit - 3)}...</span>;
    return <span>{text}</span>;
  }

  configure() {
    this.tableColumns = [
      { prop: 'image', label: 'Imagem', flex: 5, template: props => Image({ ...props, height: '100px' }) },
      { prop: 'title', label: 'Título', flex: 25 },
      { prop: 'text', label: 'Texto', flex: 60, format: this.resumeText },
      { prop: 'createdAt', label: 'Data', flex: 10, format: formatDate }
    ];
    this.sort = 'desc';
  }

  afterUpdateOrder(success) { 
    if (success) this.props.getAllByFilter({ type: this.type }, this.afterLoad);
  }
  
  getList() {
    return this.props.posts;
  }
}
