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
    this.sendMessage = this.sendMessage.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    const modalActions = [
      { text: 'FECHAR', pallet: { fill: '#c8c8c8', text: 'black' }, click: this.closeModal.bind(this) },
      { text: 'ENVIAR WHATSAPP', click: this.sendMessage.bind(this) }
    ];

    return ( 
      <Modal title="Informação" show={ this.state.showModalSuccess } actions={ modalActions }
        onClose={ this.closeModal }
      >
        Email enviado com sucesso, em breve a Acia entrará em contato
      </Modal>
    );
  }

  sendEmail(values) {      
    this.setState({
      ...this.state,
      values: values,
      showModalSuccess: true
    });
  }

  sendMessage() {
    const { values } = this.state;
    const message = 
    'Olá, gostaria de participar do programa de associados do ACIA\n' + 
    'Segue informações cadastrais: \n' + 
    ' - Nome Completo: ' + values.name + '\n' + 
    ' - Email: ' + values.email + '\n' + 
    ' - Telefone: ' + values.phone + '\n' + 
    (values.customer ? ' - Empresa: ' + values.customer : '') +  '\n';

    const link = generateSendMessageLink(WEBSITE_WHATSAPP, message);
    window.open(link, '_blank');
    this.closeModal();
  }

  closeModal() {
    this.setState({
      ...this.state,
      showModalSuccess: false
    });
  }
}

export default reduxForm({ form: 'subscribe-form' })(Subscribe);
