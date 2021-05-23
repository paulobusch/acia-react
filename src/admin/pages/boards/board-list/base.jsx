import ListBase from '../../../partials/list-base';
import { getRouteWithoutParams } from '../../../../common/router';

export default class BoardListBase extends ListBase {
  constructor(props, type) {
    super(props);

    this.type = type;
    this.className = 'page-board-list';
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
      { prop: 'name', label: 'Nome', flex: 100 }
    ];
  }

  afterUpdateOrder(success) { 
    if (success) this.props.getAllByFilter({ type: this.type }, this.afterLoad);
  }
  
  getList() {
    return this.props.boards;
  }
}
