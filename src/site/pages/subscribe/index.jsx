import './subscribe.css';

import React, { Component } from 'react';
import { Form, reduxForm, Field } from 'redux-form';
import Row from './../../../common/row/index';
import required from './../../../common/validators/required';
import Input from './../../../common/fields/input/index';
import phone from './../../../common/validators/phone';
import SubmitButton from '../../../common/buttons/submit';
import email from './../../../common/validators/email';

class Subscribe extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div id="subscribe">
        <h2>ASSOCIE-SE</h2>
        <p>É com muita satisfação que a Associação Comercial e Industrial de Anápolis – ACIA, agradece sua intenção em tornar-se um de nossos membros.
          Para associar- se Insira seus dados nos campos abaixo que entraremos em contato.
          Caso já seja um associado, e deseja obter o Cartão de vantagens ACIA, clique aqui!</p>
        <p>Caso queira obter, de imediato, nosso Cadastro de Sócio Contribuinte, <a href="https://www.aciaanapolis.com.br/site/userfiles/forms/cadastro_socio_contribuinte.pdf">clique aqui!</a></p>
        <Form onSubmit={ handleSubmit(() => {}) }>
          <Row justify="flex-start">
            <Field name="name" label="Nome Completo" type="text"
              flex="50" component={ Input } validate={ required }
            />
            <Field name="email" label="Email" type="text"
              flex="25" component={ Input } validate={ [required, email] }
            />
            <Field name="phone" label="Telefone" type="text"
              flex="25" component={ Input } validate={ phone }
            />
          </Row>
          <Row>
            <Field name="customer" label="Empresa" type="text"
              flex="75" component={ Input }
            />
            <SubmitButton text="ENVIAR"/>
          </Row>
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: 'subscribe-form' })(Subscribe);
