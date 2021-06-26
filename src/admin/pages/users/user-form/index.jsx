
import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Row from '../../../../common/row/index';
import Input from '../../../../common/fields/input/index';
import required from '../../../../common/validators/required';
import email from '../../../../common/validators/email';
import Select from '../../../../common/fields/select/index';
import Password from '../../../../common/fields/password/index';
import password from '../../../../common/validators/password';
import FormBase from './../../../../common/form-base/index';
import If from './../../../../common/operators/condition/If';
import { ROLE_ADMIN, ROLE_EDITOR } from '../../../../reducers/users/role-type';
import { create, update, submitForm, loadForm } from './../../../../reducers/users/user-actions';

const DEFAULT_STATE = {
  name: '',
  email: '',
  role: null
};

class UserForm extends FormBase { 
  constructor(props) {
    super(props);
    
    const { router } = this.props;
    if (!this.id) {
      const data = DEFAULT_STATE;
      if (router.params.role) data.role = router.params.role;
      this.props.initialize(data);
    }
    this.title = 'Usuário';
  }

  form() {
    const roles = [ROLE_ADMIN, ROLE_EDITOR];
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="name" type="text" label="Nome" placeholder="Informe o nome"
            flex="25" component={ Input } validate={ required }
          />
          <Field name="email" type="email" label="E-mail" placeholder="Informe o email" 
            flex="25" component={ Input } readOnly={ !!this.id } validate={ [required, email] }
          />
          <Field name="role" label="Papel" placeholder="Informe o papel"
            flex="25" component={ Select } options={ roles } validate={ required }
          />
          <If test={ !this.id }>
            <Field name="password" label="Senha" placeholder="Informe a senha"
              orientation="A senha deve conter caracteres especiais, números e letras em maiúsculo e minúsculo com no mínimo 8 caracteres"
              flex="25" component={ Password } validate={ [required, password] }
            />
          </If>
        </Row>
      </Form>
    );
  }
}

const form = reduxForm({ form: 'user-form' })(withRouter(UserForm));
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(null, mapDispatchToProps)(form);
