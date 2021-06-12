import React from 'react';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import required from '../../../../common/validators/required';
import Row from '../../../../common/row';
import FormBase from '../../../../common/form-base';
import Input from '../../../../common/fields/input/index';
import { create, update, loadForm, submitForm } from '../../../../reducers/benefits/benefits-actions';
import Accredited from './accredited/index';

const DEFAULT_STATE = {
  title: null,
  accrediteds: []
};

class BenefitForm extends FormBase { 
  constructor(props) {
    super(props);
    
    const { router } = this.props;
    if (!this.id) {
      const data = DEFAULT_STATE;
      this.props.initialize(data);
    }
    this.title = 'Benefício';
  }

  form() {
    const { handleSubmit, accrediteds } = this.props;
    return (
      <div>
        <Form onSubmit={ handleSubmit(this.submit) }>
          <Row justify="flex-start">
            <Field name="title" label="Título" type="text" placeholder="Informe o título" className="field-padding"
              flex="50" component={ Input } validate={ required }
            />
          </Row>
        </Form>
        <Accredited accrediteds={ accrediteds }/>
      </div>
    );
  }
}

const form = reduxForm({ form: 'benefit-form' })(withRouter(BenefitForm));
const selector = formValueSelector('benefit-form');
const mapStateToProps = state => ({ accrediteds: selector(state, 'accrediteds') });
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, submitForm, loadForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(form);
