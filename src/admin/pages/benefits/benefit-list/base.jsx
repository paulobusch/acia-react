import React from 'react';

import ListBase from '../../../partials/list-base';
import { getRouteWithoutParams } from '../../../../common/router';

export default class BenefitListBase extends ListBase {
  constructor(props, type) {
    super(props);

    this.type = type;
    this.className = 'page-benefit-list';
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
      { prop: 'title', label: 'Título', flex: 90 },
      { prop: 'accrediteds', label: 'Conveniados', textAlign: 'center', flex: 10, format: accrediteds => accrediteds.length }
    ];
  }
  
  getList() {
    return this.props.benefits;
  }
}
