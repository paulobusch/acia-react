import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import required from '../../../../common/validators/required';
import Row from '../../../../common/row';
import FormBase from '../../../../common/form-base';
import Input from './../../../../common/fields/input/index';
import { create, update, loadForm, submitForm } from '../../../../reducers/services/service-actions';
import url from './../../../../common/validators/url/url';
import TextArea from './../../../../common/fields/textarea/index';
import maxLength from './../../../../common/validators/length/max-length';

const DEFAULT_STATE = {
  icon: null,
  title: '',
  link: '',
  description: ''
};

class ServiceForm extends FormBase { 
  constructor(props) {
    super(props);
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }
    this.title = 'Serviço';
  }

  iconOrientation() {
    return (
      <div>
        O código do ícone pode ser consultado em:&nbsp;
        <a href="https://fontawesome.com/icons" target="_blank">fontawesome.com</a>
      </div>
    );
  }

  form() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="icon" label="Código do Ícone" type="text" placeholder="Ex: fas fa-search" 
            flex="25" component={ Input } validate={ required }
            orientation={ this.iconOrientation() }
          />
          <Field name="title" label="Título" type="text" placeholder="Informe o título" 
            flex="25" component={ Input } validate={ required }
          />
          <Field name="link" label="Link" type="text" placeholder="Informe o link" 
            flex="50" component={ Input } validate={ [required, url] }
          />
        </Row>
        <Row>
          <Field name="description" label="Descrição" placeholder="Informe a descrição" 
            flex="100" component={ TextArea } validate={ required, maxLength(250) }
          />
        </Row>
      </Form>
    );
  }
}

const form = reduxForm({ form: 'service-form' })(withRouter(ServiceForm));
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(null, mapDispatchToProps)(form);
