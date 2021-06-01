import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import required from '../../../../common/validators/required';
import Row from '../../../../common/row';
import FormBase from '../../../../common/form-base';
import Input from '../../../../common/fields/input/index';
import TextEditor from './../../../../common/fields/text-editor/index';
import requiredTextEditor from './../../../../common/validators/requiredTextEditor';
import { create, update, loadForm, submitForm } from '../../../../reducers/pages/page-actions';

const DEFAULT_STATE = {
  title: '',
  content: ''  
};

class PageForm extends FormBase { 
  constructor(props) {
    super(props);
    
    if (!this.id) {
      const data = DEFAULT_STATE;
      this.props.initialize(data);
    }
    this.title = 'Página';
  }

  getTitle() {
    if (this.id) {
      if (this.state.loading)
        return 'Carregando...';
      else
        return `Edição da ${this.title}`;
    }
    
    return `Cadastro da ${this.title}`;
  }

  form() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="title" label="Título" type="text" placeholder="Informe o título" 
            flex="50" component={ Input } validate={ required }
          />
        </Row>
        <Row>
          <Field name="content" label="Conteúdo" placeholder="Informe o conteúdo"
            flex="100" component={ TextEditor } validate={ requiredTextEditor }
          />
        </Row>
      </Form>
    );
  }
}

const form = reduxForm({ form: 'page-form' })(withRouter(PageForm));
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(null, mapDispatchToProps)(form);
