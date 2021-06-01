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
import Input from '../../../../common/fields/input/index';
import { create, update, loadForm, submitForm } from '../../../../reducers/medias/media-actions';
import { MEDIA_PHOTO, MEDIA_VIDEO } from './../../../../reducers/medias/media-type';
import urlYoutube from './../../../../common/validators/url/url-youtube';

const DEFAULT_STATE = {
  type: '',
  path: '',
  url: '',
  title: ''
};

class MediaForm extends FormBase { 
  constructor(props) {
    super(props);
    
    const { router } = this.props;
    if (!this.id) {
      const data = DEFAULT_STATE;
      if (router.params.type) data.type = router.params.type;
      this.props.initialize(data);
    }
    this.title = 'Mídia';
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
    const types = [MEDIA_PHOTO, MEDIA_VIDEO];
    const { handleSubmit, type } = this.props;
    const titleValidators = [];
    if (type === MEDIA_VIDEO) titleValidators.push(required);
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="type" label="Tipo" 
            flex="25" component={ Select } options={ types } validate={ required }
          />
          { this.inputMedia() }
          <Field name="title" type="text" label="Título" placeholder="Informe o título"
            flex="25" component={ Input } validate={ titleValidators }
          />
        </Row>
      </Form>
    );
  }

  inputMedia() {
    const { type } = this.props;
    if (type === MEDIA_PHOTO)
      return (
        <Field key="image" name="image" className="image-field" label="Imagem" button="Selecionar" placeholder="Selecione uma imagem"
          flex="25" component={ File } validate={ required }/>
      );

    if (type === MEDIA_VIDEO)
      return (
        <Field key="url" name="url" type="text" label="Url do YoutTube" placeholder="Informe a url do youtube"
          flex="25" component={ Input } validate={ [required, urlYoutube] }/>
      );

    return false;
  }
}

const form = reduxForm({ form: 'media-form' })(withRouter(MediaForm));
const selector = formValueSelector('media-form');
const mapStateToProps = state => ({ type: selector(state, 'type') });
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(form);
