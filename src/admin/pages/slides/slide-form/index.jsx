import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import required from '../../../../common/validators/required';
import Select from './../../../../common/fields/select';
import Row from '../../../../common/row';
import File from './../../../../common/fields/file';
import FormBase from '../../../../common/form-base';
import { create, update, loadForm, submitForm } from '../../../../reducers/slides/slide-actions';
import Input from './../../../../common/fields/input/index';
import Checkbox from './../../../../common/fields/checkbox/index';
import url from './../../../../common/validators/url/url';
import { SLIDE_OVERLAY_BUTTON, SLIDE_OVERLAY_LINK } from './../../../../reducers/slides/slide-type';

const DEFAULT_STATE = {
  image: null,
  positionX: 'center',
  positionY: 'center',
  overlaySlide: false,
  overlay: {
    type: null,
    url: '',
    title: '',
    subtitle: ''
  }
};

class SlideForm extends FormBase { 
  constructor(props) {
    super(props);
    if (!this.id) {
      this.props.initialize(DEFAULT_STATE);
    }
    this.title = 'Slide';
  }

  getTitle() {
    if (this.id)
      return `Edição do ${this.title}`;
    
    return `Cadastro do ${this.title}`;
  }

  form() {
    const positionXOptions = [
      { text: 'Esquerda', value: 'left' },
      { text: 'Centro', value: 'center' },
      { text: 'Direita', value: 'right' }
    ];
    const positionYOptions = [
      { text: 'Topo', value: 'top' },
      { text: 'Centro', value: 'center' },
      { text: 'Embaixo', value: 'bottom' }
    ];
    const types = [SLIDE_OVERLAY_LINK, SLIDE_OVERLAY_BUTTON];
    const { handleSubmit, overlaySlide, type } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="image" className="image-field" label="Imagem" button="Selecionar" placeholder="Selecione uma imagem"
            flex="25" component={ File } validate={ required }
          />
          <Field name="positionX" label="Posição Horizontal" 
            flex="25" component={ Select } options={ positionXOptions } object validate={ required }
          />
          <Field name="positionY" label="Posição Vertical" 
            flex="25" component={ Select } options={ positionYOptions } object validate={ required }
          />
          <Field name="overlaySlide" label="Conteúdo Sobreposto" type="checkbox" 
            flex="25" component={ Checkbox }
          />
        </Row>
        { overlaySlide &&
          <Row justify="flex-start">
            <Field name="overlay.type" label="Tipo" 
              flex="25" component={ Select } options={ types } validate={ required }
            />
            <Field name="overlay.url" label={ this.getUrlFieldLabel() } type="text" placeholder="Informe a url"
              className={ type === SLIDE_OVERLAY_LINK ? 'field-padding' : '' }
              flex="25" component={ Input } validate={ [required, url] }
            />
            { type !== SLIDE_OVERLAY_LINK &&    
              [<Field key="title" name="overlay.title" label="Título" type="text" placeholder="Informe o título"
                flex="25" component={ Input }
              />,
              <Field key="subtitle" name="overlay.subtitle" label="Subtítulo" type="text" placeholder="Informe o subtítulo"
                flex="25" component={ Input }
              />]
            }
          </Row>
        }
      </Form>
    );
  }

  getUrlFieldLabel() {
    const { type } = this.props;
    if (type === SLIDE_OVERLAY_LINK) return 'Url do Link';
    if (type === SLIDE_OVERLAY_BUTTON) return 'Url do Botão';
    return 'Url';
  }
}

const slideForm = reduxForm({ form: 'slide-form' })(withRouter(SlideForm));
const selector = formValueSelector('slide-form');
const mapStateToProps = state => ({ overlaySlide: selector(state, 'overlaySlide'), type: selector(state, 'overlay.type') });
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(slideForm);
