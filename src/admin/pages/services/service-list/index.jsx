import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll, updateOrderBulk, remove } from '../../../../reducers/services/service-actions';
import ListBase from '../../../partials/list-base';
import Icon from './../../../../common/icon/index';

class ServiceList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Serviços';
    this.className = 'page-service-list';
  }

  configure() {
    this.tableColumns = [
      { prop: 'icon', label: 'Ícone', flex: 5, template: Icon },
      { prop: 'title', label: 'Título', flex: 20 },
      { prop: 'description', label: 'Descrição', flex: 75 }
    ];
  }
  
  getList() {
    return this.props.services;
  }
}

const mapStateToProps = state => ({ services: state.services });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ServiceList));
