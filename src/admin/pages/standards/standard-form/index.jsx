import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import required from '../../../../common/validators/required';
import Row from '../../../../common/row';
import FormBase from '../../../../common/form-base';
import Input from '../../../../common/fields/input/index';
import SlideList from './slide-list/index';
import integer from './../../../../common/validators/number/integer';
import oneOrMore from './../../../../common/validators/number/one-or-more';
import { create, update, loadForm, submitForm } from '../../../../reducers/standards/standard-actions';

const DEFAULT_STATE = {
  title: null,
  transition: 5,
  slides: []
};

class StandardForm extends FormBase { 
  constructor(props) {
    super(props);
    
    const { router } = this.props;
    if (!this.id) {
      const data = DEFAULT_STATE;
      if (router.params.type) data.type = router.params.type;
      this.props.initialize(data);
    }
    this.title = 'Patrocínio';
  }

  form() {
    const { handleSubmit } = this.props;
    const slides = this.props.slides || [];
    return (
      <Form onSubmit={ handleSubmit(this.submit) }>
        <Row justify="flex-start">
          <Field name="title" label="Título" type="text" placeholder="Informe o título"
            flex="25" component={ Input } validate={ required }
          />
          <Field name="transition" label="Tempo de transição em segundos" type="number" placeholder="Informe o tempo de transição" className="field-padding"
            flex="25" component={ Input } validate={ [required, integer, oneOrMore] }
          />
        </Row>
        <SlideList slides={ slides }/>
      </Form>
    );
  }
}

const form = reduxForm({ form: 'standard-form' })(withRouter(StandardForm));
const selector = formValueSelector('standard-form');
const mapStateToProps = state => ({ slides: selector(state, 'slides') });
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(form);
