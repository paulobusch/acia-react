import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, updateOrderBulk, remove } from '../../../../../reducers/boards/board-actions';
import BoardListBase from '../base';
import { BOARD_DIRECTOR } from '../../../../../reducers/boards/board-type';

class DirectorList extends BoardListBase {
  constructor(props) {
    super(props, BOARD_DIRECTOR);
  }

  configure() {
    this.tableColumns = [
      { prop: 'name', label: 'Nome', flex: 40 },
      { prop: 'company', label: 'Empresa', flex: 30 },
      { prop: 'office', label: 'Cargo', flex: 30 }
    ];

    this.useDrag = false;
  }
}

const mapStateToProps = state => ({ boards: state.boards });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DirectorList));
