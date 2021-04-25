import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import required from '../../../../common/validators/required';
import Select from '../../../../common/fields/select';
import Row from '../../../../common/row';
import File from '../../../../common/fields/file';
import FormBase from '../../../../common/form-base';
import { create, update, loadForm, submitForm } from '../../../../reducers/posts/post-actions';
import Input from '../../../../common/fields/input/index';
import TextArea from './../../../../common/fields/textarea/index';

const DEFAULT_STATE = {
  image: null,
  type: null,
  title: '',
  text: ''  
};

class PostForm extends FormBase { 
  constructor(props) {
    super(props);
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }
    this.title = 'Post';
  }

  form() {
    const types = ['Notícia', 'Artigo', 'Acia em Ação'];
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="image" className="image-field" label="Imagem" button="Selecionar" placeholder="Selecione uma imagem"
            flex="25" component={ File } validate={ required }
          />
          <Field name="type" label="Tipo" 
            flex="25" component={ Select } options={ types } validate={ required }
          />
          <Field name="title" label="Título" type="text" placeholder="Informe o título" 
            flex="50" component={ Input } validate={ required }
          />
        </Row>
        <Row>
          <Field name="text" label="Texto" placeholder="Informe um texto"
            flex="100" rows="10" component={ TextArea } validate={ required }
          />
        </Row>
      </Form>
    );
  }
}

const postForm = reduxForm({ form: 'post-form' })(withRouter(PostForm));
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(null, mapDispatchToProps)(postForm);
