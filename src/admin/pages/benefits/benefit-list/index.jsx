import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import ListBase from '../../../partials/list-base';
import { getAllByFilter, remove } from '../../../../reducers/benefits/benefits-actions';

class BenefitList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Benefícios';
    this.className = 'page-benefit-list';
  }

  componentWillMount() {
    this.toggleLoading(true);
    this.props.getAllByFilter({  }, this.afterLoad);
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

const mapStateToProps = state => ({ benefits: state.benefits });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BenefitList));
