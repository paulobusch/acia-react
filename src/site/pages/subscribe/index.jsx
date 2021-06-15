import './subscribe.css';

import React, { Component } from 'react';
import { Form, reduxForm, Field } from 'redux-form';
import Row from './../../../common/row/index';
import required from './../../../common/validators/required';
import Input from './../../../common/fields/input/index';
import phone from './../../../common/validators/phone';
import SubmitButton from '../../../common/buttons/submit';
import email from './../../../common/validators/email';
import { generateSendMessageLink } from '../../../common/api/whatsapp';
import { WEBSITE_WHATSAPP } from './../../../consts';
import Checkbox from './../../../common/fields/checkbox/index';
import Modal from './../../../common/modal/index';

class Subscribe extends Component {
  constructor(props) {
    super(props);

    this.state = { showModalSuccess: false };
    this.sendEmail = this.sendEmail.bind(this);
    this.closeModalSuccess = this.closeModalSuccess.bind(this);
  }

  render() {
    const { handleSubmit } = this.props;
    const whatsappMessage = 'Olá, gostaria de mais informações sobre o cartão de vantagens ACIA';
    return (
      <div id="subscribe">
        <h2>ASSOCIE-SE</h2>
        <p>É com muita satisfação que a Associação Comercial e Industrial de Anápolis – ACIA, agradece sua intenção em tornar-se um de nossos membros.
          Para associar- se Insira seus dados nos campos abaixo que entraremos em contato.</p>
        <p>Caso já seja um associado, e deseja obter o Cartão de vantagens ACIA, <a target="_blank" href={ generateSendMessageLink(WEBSITE_WHATSAPP, whatsappMessage) }>clique aqui!</a></p>
        <Form onSubmit={ handleSubmit(this.sendEmail) }>
          <Row justify="flex-start">
            <Field name="name" label="Nome Completo" type="text"
              flex="75" component={ Input } validate={ required }
            />
            <Field name="email" label="Email" type="text"
              flex="25" component={ Input } validate={ [required, email] }
            />
          </Row>
          <Row>
            <Field name="customer" label="Empresa" type="text"
              flex="75" component={ Input }
            />
            <Field name="phone" label="Telefone" type="text"
              flex="25" component={ Input } validate={ phone }
            />
          </Row>
          <Row>
            <Field name="accept" label="Eu concordo em receber notificações e emails da Acia"
              component={ Checkbox }
            />
            <SubmitButton text="ENVIAR"/>
          </Row>
          { this.modalSuccess() }
        </Form>
      </div>
    );
  }

  modalSuccess() {
    return ( 
      <Modal title="Informação" show={ this.state.showModalSuccess } 
        onClose={ this.closeModalSuccess }
      >
        Email enviado com sucesso, em breve a Acia entrará em contato
      </Modal>
    );
  }

  closeModalSuccess() {
    this.setState({
      ...this.state,
      showModalSuccess: false
    });
  }

  sendEmail(values) {
    // TODO: Send email
    // const message = 
    // 'Olá, gostaria de participar do programa de associados do ACIA\n' + 
    // 'Segue informações cadastrais: \n' + 
    // ' - Nome Completo: ' + values.name + '\n' + 
    // ' - Email: ' + values.email + '\n' + 
    // ' - Telefone: ' + values.phone + '\n' + 
    // (values.customer ? ' - Empresa: ' + values.customer : '') +  '\n';
    this.afterSendEmail(true);
  }

  afterSendEmail(success) {
    if (success) {
      this.setState({
        ...this.state,
        showModalSuccess: true
      });
    }
  }
}

export default reduxForm({ form: 'subscribe-form' })(Subscribe);
