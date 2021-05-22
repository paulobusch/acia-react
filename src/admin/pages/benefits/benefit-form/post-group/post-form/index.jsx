import './post-form.css';

import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';

import required from './../../../../../../common/validators/required';
import Input from './../../../../../../common/fields/input/index';
import url from './../../../../../../common/validators/url/url';
import withRouter from './../../../../posts/post-list/index';
import Row from './../../../../../../common/row/index';
import File from './../../../../../../common/fields/file/index';
import TextArea from './../../../../../../common/fields/textarea/index';
import SubmitButton from './../../../../../../common/buttons/submit/index';

const DEFAULT_STATE = {
  image: null,
  title: '',
  link: '',
  contact: '',
  address: '',
  description: ''  
};

class PostForm extends Component {
  constructor(props) {
    super(props);

    // this.props.initialize(DEFAULT_STATE);
  }
  
  clean() {

  }

  submit(values) {

  }

  render() {
    // const { handleSubmit } = this.props;
    // <Form onSubmit={ () => {} }>
    return (
      <div id="post-form">
        <Row justify="flex-start">
          <Field name="image" className="image-field" label="Imagem" button="Selecionar" placeholder="Selecione uma imagem"
            flex="25" component={ File } validate={ required }
          />
          <Field name="title" label="Título" type="text" placeholder="Informe o título" 
            flex="25" component={ Input } validate={ required }
          />
          <Field name="link" label="Link" type="text" placeholder="Informe o link" 
            flex="50" component={ Input } validate={ [required, url] }
          />
        </Row>
        <Row>
          <Field name="address" label="Endereço" type="text" placeholder="Informe o endereço" 
            flex="25" component={ Input } validate={ required }
          />
          <Field name="contact" label="Contato" type="text" placeholder="Informe o contato" 
            flex="25" component={ Input } validate={ required }
          />
          <Field name="description" label="Descrição" type="text" placeholder="Informe a descrição" 
            flex="50" component={ Input } validate={ required }
          />
        </Row>
        <div className="buttons">
          <SubmitButton text="LIMPAR" backgroundColor="red" onClick={ this.clean }/>
          <SubmitButton text="SALVAR" onClick={ this.submit }/>
        </div>
      </div>
    );
    // </Form>
  }
}

export default PostForm; //reduxForm({ form: 'post-form' })(withRouter(PostForm));
