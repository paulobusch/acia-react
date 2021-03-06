import './accredited-form.css';

import React, { Component } from 'react';
import { reduxForm, Field, Form, submit, reset } from 'redux-form';
import { withRouter } from 'react-router';

import required from './../../../../../../common/validators/required';
import Input from './../../../../../../common/fields/input/index';
import Row from './../../../../../../common/row/index';
import File from './../../../../../../common/fields/file/index';
import SubmitButton from './../../../../../../common/buttons/submit/index';
import phone from './../../../../../../common/validators/phone';
import email from './../../../../../../common/validators/email';
import TextArea from './../../../../../../common/fields/textarea/index';
import url from '../../../../../../common/validators/url/url';

const FORM_ID = 'accredited-form';
const DEFAULT_STATE = {
  image: null,
  title: '',
  phone: '',
  whatsapp: '',
  email: '',
  website: '',
  address: '',
  responsible: '',
  description: ''  
};

class AccreditedForm extends Component {
  constructor(props) {
    super(props);

    this.clean = this.clean.bind(this);
    this.submit = this.submit.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  
  clean(e) {
    if(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.props.initialize(DEFAULT_STATE);
  }

  submitForm(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.dispatch(submit(FORM_ID));
  }

  submit(values) {
    this.props.onSubmit(values);
    this.clean();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) } id="post-form">
        <Row justify="flex-start">
          <Field name="title" label="Título" type="text" placeholder="Informe o título" 
            flex="50" component={ Input } validate={ required }
          />
          <Field name="image" className="image-field" label="Imagem" button="Selecionar" placeholder="Selecione uma imagem"
            flex="50" component={ File } validate={ required }
          />
        </Row>
        <Row>
          <Field name="phone" label="Telefone" type="text" placeholder="Informe o telefone" 
            flex="25" component={ Input } validate={ [required, phone] }
          />
          <Field name="whatsapp" label="Whatsapp" type="text" placeholder="Informe o whatsapp" 
            flex="25" component={ Input } validate={ phone }
          />
          <Field name="email" label="E-mail" type="email" placeholder="Informe o email" 
            flex="25" component={ Input } validate={ email }
          />
          <Field name="website" label="Site" type="text" placeholder="Informe a url do site"
            flex="25" component={ Input } validate={ url }
          />
        </Row>
        <Row>
          <Field name="responsible" label="Responsável" type="text" placeholder="Informe o responsável" 
            flex="50" component={ Input }
          />
          <Field name="address" label="Endereço" type="text" placeholder="Informe o endereço" 
            flex="50" component={ Input } validate={ required }
          />
        </Row>
        <Row>
          <Field name="description" label="Descrição" placeholder="Informe a descrição" 
            flex="100" component={ TextArea } validate={ required }
          />
        </Row>
        <div className="buttons">
          <SubmitButton text="LIMPAR" backgroundColor="red" onClick={ this.clean }/>
          <SubmitButton text="SALVAR" onClick={ this.submitForm }/>
        </div>
      </Form>
    );
  }
}

export default reduxForm({ form: FORM_ID })(withRouter(AccreditedForm));
