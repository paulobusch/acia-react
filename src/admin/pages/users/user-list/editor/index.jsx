import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import UserListBase from '../base';
import { getRouteWithoutParams } from '../../../../../common/router/index';
import { getAll, remove } from './../../../../../reducers/users/user-actions';
import { ROLE_EDITOR } from '../../../../../reducers/users/role-type';

class UserListEditor extends UserListBase {
  constructor(props) {
    super(props, ROLE_EDITOR);
  }

  goNew() {
    const { router } = this.props;
    const url = `${getRouteWithoutParams(router)}/new/Editor`;
    router.push(url);
  }
}


const mapStateToProps = state => ({ users: state.users });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserListEditor));
