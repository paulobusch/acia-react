import React from 'react';

import ListBase from '../../../partials/list-base';
import Image from '../../../../common/image';
import { formatDate } from '../../../../common/formatters/date';
import { getRouteWithoutParams } from '../../../../common/router';
import { MEDIA_PHOTO } from './../../../../reducers/medias/media-type';

export default class MediaListBase extends ListBase {
  constructor(props, type) {
    super(props);

    this.type = type;
    this.className = 'page-media-list';
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
    const needImage = this.type === MEDIA_PHOTO;
    this.tableColumns = [
      { prop: 'title', label: 'Título', flex: needImage ? 85 : 90 },
      { prop: 'createdAt', label: 'Data', flex: 10, format: formatDate }
    ];

    if (needImage) this.tableColumns.unshift({ prop: 'path', label: 'Imagem', flex: 5, template: props => <Image { ...props } image={ props.path }/> });

    this.sort = 'desc';
  }
  
  getList() {
    return this.props.medias;
  }
}
