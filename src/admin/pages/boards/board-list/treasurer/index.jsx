import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, updateOrderBulk, remove } from '../../../../../reducers/boards/board-actions';
import BoardListBase from '../base';
import { BOARD_TREASURER } from '../../../../../reducers/boards/board-type';

class TreasurerList extends BoardListBase {
  constructor(props) {
    super(props, BOARD_TREASURER);
  }
}

const mapStateToProps = state => ({ boards: state.boards });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TreasurerList));
