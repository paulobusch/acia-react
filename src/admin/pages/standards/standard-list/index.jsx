import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll, updateOrderBulk, remove } from '../../../../reducers/standards/standard-actions';
import ListBase from '../../../partials/list-base';

class StandardList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Patrocínios';
    this.className = 'page-standard-list';
  }

  count(row) {
    if (!row.slides) return 0;
    return row.slides.length;
  }

  configure() {
    this.tableColumns = [
      { prop: 'title', label: 'Título', flex: 90 },
      { prop: 'slides', label: 'Contagem', textAlign: 'center', flex: 10, format: slides => slides.length }
    ];
  }
  
  getList() {
    return this.props.standards;
  }
}

const mapStateToProps = state => ({ standards: state.standards });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, updateOrderBulk, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StandardList));
