import React from 'react';

import ListBase from '../../../partials/list-base';
import Image from '../../../../common/image';
import { formatDate } from '../../../../common/formatters/date';
import { getRouteWithoutParams } from '../../../../common/router';
import { limitText } from './../../../../common/api/string';
import { extractTextFromHtml } from './../../../../common/api/html';
import Resume from './../../../../common/resume/index';

export default class PostListBase extends ListBase {
  constructor(props, type) {
    super(props);

    this.type = type;
    this.className = 'page-post-list';
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

  configure() {
    this.tableColumns = [
      { prop: 'image', label: 'Imagem', flex: 5, template: props => <Image { ...props } height="100px"/> },
      { prop: 'title', label: 'Título', flex: 25 },
      { prop: 'text', label: 'Texto', flex: 60, template: props => Resume({ text: extractTextFromHtml(props.row.text) }) },
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
