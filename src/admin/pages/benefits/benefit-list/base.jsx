import ListBase from '../../../partials/list-base';
import { getRouteWithoutParams } from '../../../../common/router';

export default class BenefitListBase extends ListBase {
  constructor(props, type) {
    super(props);

    this.type = type;
    this.className = 'page-benefit-list';
    this.count = this.count.bind(this);
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

  count(row) {
    if (!row.posts) return 0;
    return row.posts.length;
  }

  configure() {
    this.tableColumns = [
      { prop: 'title', label: 'Título', flex: 90 },
      { prop: 'posts', label: 'Contagem', flex: 10, template: this.count }
    ];
  }
  
  getList() {
    return this.props.benefits;
  }
}
