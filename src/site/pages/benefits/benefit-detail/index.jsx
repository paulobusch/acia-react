import './benefit-detail.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form, Field, reduxForm, submit } from 'redux-form';

import Row from './../../../../common/row/index';
import Loading from '../../../../common/loading';
import TextArea from './../../../../common/fields/textarea/index';
import required from './../../../../common/validators/required';
import SubmitButton from '../../../../common/buttons/submit';
import { getAccreditedById } from '../../../../reducers/benefits/benefits-actions';
import { getIdByRouter } from '../../../../common/api/router';
import { generateSendMessageLink } from '../../../../common/api/whatsapp';

class BenefitDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.id = getIdByRouter(this.props.router, 'view');
    this.afterLoad = this.afterLoad.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillMount() {
    this.props.getAccreditedById(this.id, this.afterLoad);
  }

  afterLoad(success, accredited) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        accredited: accredited
      });
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <div id="benefit">
        { loading 
          ? <Loading style={ { paddingTop: 'calc(40vh - 230px)' } }/> 
          : this.content() 
        }
      </div>
    );
  }

  content() {
    const { accredited } = this.state;
    return (
      <div>
        <h2>{ accredited.title }</h2>
        <div className="content">
          <div className="image" style={ { backgroundImage: `url('${accredited.image}')` } }></div>
          <div className="detail">
            <p>{ accredited.description }</p>
            <ul className="contact"> 
              { accredited.responsible &&
                <li>
                  <i className="fas fa-user"></i>
                  { accredited.responsible }
                </li>
              }
              <li>
                <i className="fas fa-phone-alt"></i>
                { accredited.phone }
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                { accredited.address }
              </li>
            </ul>
            <div className="message">
              { this.message() }
            </div>
          </div>
        </div>
      </div>
    );
  }

  message() {
    const { dispatch, handleSubmit } = this.props;

    return (
      <Form onSubmit={ handleSubmit(this.sendMessage) }>
        <Row>
          <Field name="message" placeholder="Escreva aqui sua mensagem"
            flex="100" component={ TextArea } validate={ required }
          />
        </Row>
        <SubmitButton onClick={ () => dispatch(submit('message-form')) } text="ENVIAR MENSAGEM" fill/>
      </Form>
    );
  }

  sendMessage(values) {
    const link = generateSendMessageLink(this.state.accredited.phone, values.message);
    window.open(link, '_blank');
  }
}

const form = reduxForm({ form: 'message-form' })(withRouter(BenefitDetail));
const mapDispatchToProps = dispatch => bindActionCreators({ getAccreditedById }, dispatch);
export default connect(null, mapDispatchToProps)(form);
