import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll, remove } from '../../../../reducers/law-suits/law-suit-actions';
import { formatDate } from './../../../../common/formatters/date';
import ListBase from '../../../partials/list-base';

class LawSuitList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Processos';
    this.className = 'admin-law-suit-list';
  }

  configure() {
    this.tableColumns = [
      { prop: 'code', label: 'Código', flex: 10 },
      { prop: 'name', label: 'Nome', flex: 80 },
      { prop: 'date', label: 'Data', flex: 10, format: formatDate },
    ];
  }
  
  getList() {
    return this.props.lawSuits;
  }
}

const mapStateToProps = state => ({ lawSuits: state.lawSuits });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LawSuitList));
