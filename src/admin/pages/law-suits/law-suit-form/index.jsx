
import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import required from './../../../../common/validators/required';
import Row from '../../../../common/row';
import FormBase from '../../../../common/form-base';
import Input from '../../../../common/fields/input';
import { create, update, loadForm, submitForm } from './../../../../reducers/law-suits/law-suit-actions';

const DEFAULT_STATE = {
  code: '',
  name: '',
  date: moment().format('YYYY-MM-DD')
};

class LawSuitForm extends FormBase { 
  constructor(props) {
    super(props);
    if (!this.id) this.props.initialize(DEFAULT_STATE);
    this.title = 'Processo';
  }

  form() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="code" type="text" label="Código" placeholder="Informe o código"
            flex="25" component={ Input } validate={ required }
          />
          <Field name="name" type="text" label="Nome" placeholder="Informe o nome"
            flex="25" component={ Input } validate={ required }
          />
          <Field name="date" type="date" label="Data" placeholder="Informe a data"
            flex="25" component={ Input } validate={ required }
          />
        </Row>
      </Form>
    );
  }
}

const lawSuitForm = reduxForm({ form: 'law-suit-form' })(withRouter(LawSuitForm));
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(null, mapDispatchToProps)(lawSuitForm);
