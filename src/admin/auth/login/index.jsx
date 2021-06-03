import './auth.css';

import React, { Component } from 'react';
import { reduxForm, Form, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Toastr from '../../../common/messages/toastr';
import Input from '../../../common/fields/input';
import SubmitButton from '../../../common/buttons/submit';
import email from '../../../common/validators/email';
import Password from './../../../common/fields/password';
import Row from './../../../common/row/index';
import { login, listenSessionChanged } from '../../../reducers/auth/auth-actions';
import { Link, hashHistory } from 'react-router';
import { ROLE_ADMIN, ROLE_EDITOR } from './../../../reducers/users/role-type';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = { loginLoading: false };
    this.afterLogin = this.afterLogin.bind(this);
    this.toggleLoadingLogin = this.toggleLoadingLogin.bind(this);
    this.submit = this.submit.bind(this);
  }
  
  componentWillMount() {
    this.props.listenSessionChanged();
  }

  isValid() {
    const emailError = email(this.props.email);
    return this.props.email && !emailError && this.props.password;
  }

  submit(values) {
    const { login } = this.props;
    this.toggleLoadingLogin(true);
    login(values, this.afterLogin);
  }

  afterLogin() {
    this.toggleLoadingLogin(false);
  }

  redirectUser() {
    const { router } = this.props;
    const redirect = router.location.query.redirect || this.getRedirectRoute();
    setTimeout(() => hashHistory.push(`/${redirect}`), 0);
  }

  getRedirectRoute() {
    const { user } = this.props;
    if (user.role === ROLE_ADMIN) return 'admin/slides';
    if (user.role === ROLE_EDITOR) return 'admin/posts';
    throw new Error('Method not implemented');
  }

  toggleLoadingLogin(loading) {
    this.setState({
      ...this.state,
      loginLoading: loading
    });
  }

  render() {
    const { handleSubmit, user, loading, email } = this.props;
    if (loading) return false;
    if (user) {
      this.redirectUser();
      return false;
    }

    return (
      <div className="background-login" style={ { backgroundImage: `url('images/acia/background-login.jpg')` } }>
        <div className="background-overlay">
          <Form id="form-login" onSubmit={ handleSubmit(this.submit) }>
            <h2>Login</h2>
            <Field component={ Input } type="email" name="email"
              placeholder="E-mail" icon="user"/>
            <Field component={ Password } name="password"
              placeholder="Senha" icon="envelope"/>
            <Row>
              <Link className="link" to={ (`/forgot-password/${email ? encodeURIComponent(email) : ''}`) }>Esqueci minha senha</Link>
              <Link className="link" to="/">Ir para o Site</Link>
            </Row>
            <SubmitButton disabled={ !this.isValid() } loading={ this.state.loginLoading } fill padding="10px" text="Entrar"/>
          </Form>
          <Toastr />
        </div>
      </div>
    );
  }
}

const authForm = reduxForm({ form: 'login-form' })(Auth);
const selector = formValueSelector('login-form');
const mapStateToProps = state => ({ 
  email: selector(state, 'email'), 
  password: selector(state, 'password'),
  loading: state.auth.loading, 
  user: state.auth.user
});
const mapDispatchToProps = dispatch => bindActionCreators({ login, listenSessionChanged }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(authForm);
