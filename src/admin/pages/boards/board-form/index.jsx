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
import TextArea from './../../../../common/fields/textarea/index';
import TextEditor from './../../../../common/fields/text-editor/index';
import requiredTextEditor from './../../../../common/validators/requiredTextEditor';
import { BOARD_VICE_PRESIDENCY, BOARD_SECRETARY, BOARD_TREASURER, BOARD_DIRECTOR } from './../../../../reducers/boards/board-type';
import { create, update, loadForm, submitForm } from '../../../../reducers/boards/board-actions';

const DEFAULT_STATE = {
  name: null,
  type: null,
  company: '',
  office: ''  
};

class BoardForm extends FormBase { 
  constructor(props) {
    super(props);
    
    const { router } = this.props;
    if (!this.id) {
      const data = DEFAULT_STATE;
      if (router.params.type) data.type = router.params.type;
      this.props.initialize(data);
    }
    this.title = 'Diretoria';
  }

  form() {
    const types = [BOARD_VICE_PRESIDENCY, BOARD_SECRETARY, BOARD_TREASURER, BOARD_DIRECTOR];
    const { handleSubmit, type } = this.props;
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="type" label="Tipo" 
            flex="25" component={ Select } options={ types } validate={ required }
          />
          <Field name="name" label="Nome" type="text" placeholder="Informe o nome" 
            flex="75" component={ Input } validate={ required }
          />
        </Row>
        { type === BOARD_DIRECTOR &&
          <Row justify="flex-start">
            <Field name="company" label="Empresa" type="text" placeholder="Informe a empresa" 
              flex="50" component={ Input } validate={ required }
            />
            <Field name="office" label="Cargo" type="text" placeholder="Informe o cargo" 
              flex="50" component={ Input } validate={ required }
            />
          </Row>
        }
      </Form>
    );
  }
}

const form = reduxForm({ form: 'board-form' })(withRouter(BoardForm));
const selector = formValueSelector('board-form');
const mapStateToProps = state => ({ type: selector(state, 'type') });
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(form);
