import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, updateOrderBulk, remove } from '../../../../../reducers/boards/board-actions';
import BoardListBase from './../base';
import { BOARD_VICE_PRESIDENCY } from '../../../../../reducers/boards/board-type';

class VicePresidencyList extends BoardListBase {
  constructor(props) {
    super(props, BOARD_VICE_PRESIDENCY);
  }
}

const mapStateToProps = state => ({ boards: state.boards });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VicePresidencyList));
