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
import PhotoList from './media-list/photo-list/index';
import VideoList from './media-list/video-list/index';
import FileList from './media-list/file-list/index';
import Checkbox from '../../../../common/fields/checkbox';

const DEFAULT_STATE = {
  image: null,
  type: null,
  title: '',
  text: '',
  includePhotos: false,
  includeVideos: false,
  includeFiles: false
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
    const { includePhotos, includeVideos, includeFiles } = this.props;
    const photos = this.props.photos || [];
    const videos = this.props.videos || [];
    const files = this.props.files || [];
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
          <Field name="title" label="T??tulo" type="text" placeholder="Informe o t??tulo" 
            flex="50" component={ Input } validate={ required }
          />
        </Row>
        <Row justify="flex-start">
          <Field name="includePhotos" label="Incluir Fotos" type="checkbox" 
            flex="25" component={ Checkbox }
          />
          <Field name="includeVideos" label="Incluir V??deos" type="checkbox" 
            flex="25" component={ Checkbox }
          />
          <Field name="includeFiles" label="Incluir Anexos" type="checkbox" 
            flex="25" component={ Checkbox }
          />
        </Row>
        <Row wrap>
          { includePhotos && <PhotoList photos={ photos }/> }
          { includeVideos && <VideoList videos={ videos }/> }
          { includeFiles && <FileList files={ files }/> }
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
const mapStateToProps = state => ({
  includePhotos: selector(state, 'includePhotos'),
  includeVideos: selector(state, 'includeVideos'),
  includeFiles: selector(state, 'includeFiles'),
  type: selector(state, 'type'),
  photos: selector(state, 'photos'),
  videos: selector(state, 'videos'),
  files: selector(state, 'files')
});
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(postForm);
