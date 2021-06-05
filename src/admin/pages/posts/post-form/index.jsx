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
import { POST_ACTION, POST_ARTICLE, POST_NEWS } from './../../../../reducers/posts/post-type';
import TextEditor from './../../../../common/fields/text-editor/index';
import requiredTextEditor from './../../../../common/validators/requiredTextEditor';

const DEFAULT_STATE = {
  image: null,
  type: null,
  title: '',
  text: ''  
};

class PostForm extends FormBase { 
  constructor(props) {
    super(props);
    
    const { router } = this.props;
    if (!this.id) {
      const data = DEFAULT_STATE;
      if (router.params.type) data.type = router.params.type;
      this.props.initialize(data);
    }
    this.title = 'Post';
  }

  form() {
    const types = [POST_NEWS, POST_ARTICLE, POST_ACTION];
    const { handleSubmit, type } = this.props;
    const imageValidators = [];
    if (type !== 'Artigo') imageValidators.push(required);
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="type" label="Tipo" 
            flex="25" component={ Select } options={ types } validate={ required }
          />
          <Field name="image" className="image-field" label="Imagem" button="Selecionar" placeholder="Selecione uma imagem"
            flex="25" component={ File } validate={ imageValidators }
          />
          <Field name="title" label="Título" type="text" placeholder="Informe o título" 
            flex="50" component={ Input } validate={ required }
          />
        </Row>
        <Row>
          <Field name="text" label="Texto" placeholder="Informe um texto"
            flex="100" component={ TextEditor } validate={ requiredTextEditor }
          />
        </Row>
      </Form>
    );
  }
}

const postForm = reduxForm({ form: 'post-form' })(withRouter(PostForm));
const selector = formValueSelector('post-form');
const mapStateToProps = state => ({ type: selector(state, 'type') });
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(postForm);
