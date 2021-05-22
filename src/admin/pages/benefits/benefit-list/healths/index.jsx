import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, remove } from '../../../../../reducers/benefits/benefits-actions';
import { BENEFITS_HEALTHS } from './../../../../../reducers/benefits/benefits-type';
import BenefitListBase from './../base';

class HealthsList extends BenefitListBase {
  constructor(props) {
    super(props, BENEFITS_HEALTHS);
  }
}

const mapStateToProps = state => ({ benefits: state.benefits });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HealthsList));
