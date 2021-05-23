import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm, formValueSelector, Field, Form } from 'redux-form';

import { getPresident, submitForm, update } from '../../../../../reducers/boards/board-actions';
import { BOARD_PRESIDENCY } from './../../../../../reducers/boards/board-type';
import FormBase from './../../../../../common/form-base/index';
import Image from './../../../../../common/fields/image/index';
import Col from './../../../../../common/col/index';
import Row from './../../../../../common/row/index';
import Loading from './../../../../../common/loading/index';
import Input from './../../../../../common/fields/input/index';
import required from './../../../../../common/validators/required';
import SubmitButton from './../../../../../common/buttons/submit/index';
import CardContent from '../../../../partials/card/card-content';
import CardFooter from '../../../../partials/card/card-footer';
import integer from './../../../../../common/validators/number/integer';
import minValue from './../../../../../common/validators/number/min-value';

class PresidencyForm extends FormBase {
  constructor(props) {
    super(props);

    this.state = { loading: true, saveLoading: false };
    this.data = this.getData();
  }

  getData() { 
    this.props.getPresident(this.afterLoad);
  }

  afterLoad(success, president) {
    if (success) {
      this.id = president.id;
      this.props.initialize(president);
      this.setState({ ...this.state, loading: false });
    }
  }

  render() {
    return (this.state.loading ? <Loading /> : this.form());
  }

  getMinYearEnd() {
    const { yearStart } = this.props;
    const currentYear = new Date().getFullYear();
    const start = parseInt(yearStart);
    if (isNaN(start) || start < 2019) return currentYear;
    return start;
  }

  form() {
    const { handleSubmit, imageUrl } = this.props;

    return (
      <div>
        <CardContent>
          <Form id="presidency-form" onSubmit={ handleSubmit(this.submit) }>
            <Row justify="flex-start">
              <Col flex="30">
                <Row height="100%" justify="flex-start">
                  <Field name="image" className="image-field" label="Foto" flex="100"
                    imageDefault="images/users/default-avatar.png"
                    imageUrl={ imageUrl } component={ Image }
                  />
                </Row>
              </Col>
              <Col flex="70">
                <Row justify="flex-start">
                  <Field name="name" type="text" label="Nome" placeholder="Informe o nome"
                    flex="100" component={ Input } validate={ required }
                  />
                </Row>
                <Row justify="flex-start">
                  <Field name="yearStart" type="number" label="Ano Início" placeholder="Informe o ano que o cargo foi assumido"
                    flex="50" component={ Input } validate={ [required, integer, minValue(2019)] }
                  />
                  <Field name="yearEnd" type="number" label="Ano Fim" placeholder="Informe o ano que o cargo será renovado"
                    flex="50" component={ Input } validate={ [required, integer, minValue(this.getMinYearEnd())] }
                  />
                </Row>
              </Col>
            </Row>
          </Form>
        </CardContent>
        <CardFooter>
          <SubmitButton text="SALVAR" loading={ this.state.saveLoading } onClick={ this.props.submitForm }/>
        </CardFooter>
      </div>
    );
  }
}

const form = reduxForm({ form: 'board-form' })(withRouter(PresidencyForm));
const selector = formValueSelector('board-form');
const mapStateToProps = state => ({
  imageUrl: selector(state, 'imageUrl'),
  yearStart: selector(state, 'yearStart')
});
const mapDispatchToProps = dispatch => bindActionCreators({ getPresident, update, submitForm }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(form);
