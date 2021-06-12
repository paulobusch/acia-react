import './advantages-card.css'

import React from 'react';

export default function AdvantagesCard() {
  return (
    <div id="static-acia-cred">
      <h2 className="main-title">CARTÃO DE VANTAGENS – ACIA</h2>
      <div className="bold">Esclarecimentos:</div>
      <p>Terão direito aos benefícios do Cartão de Vantagens todas as pessoas autorizadas pela empresa associada, 
        ou seja, os empresários, os funcionários e os parentes destes até segundo grau. Considera-se, para efeito deste 
        cartão de vantagens, o parente de segundo grau como sendo os pais e avós na esfera ascendente, os filhos e netos 
        na esfera descendentes, inclusive os afins (adotado ou correlato), o cônjuge e o irmão consanguíneo ou afim (adotado).
      </p>
      <p><span className="bold">Funcionário: </span>Para utilizar os convênios existem duas opções:</p>
      <ul className="main-list">
        <li>
          Opção por FAZER o Cartão de Vantagens ACIA.
          <p>
            É necessário: – <a target="_blank" href="/documents/Ficha de Cadastro de Funcionario e Dependente.pdf">Preencher o RQ.18 – Ficha de Cadastro de Funcionário e Dependente</a>; efetuar o pagamento da 
            taxa anual de R$ 26,00 (vinte e seis reais);
          </p>
          <ul className="secondary-list">
            <li>Benefícios: Convênios com (comércios, serviços, área da saúde: consultas e exames) basta a apresentação do Cartão no local conveniado;</li>
            <li>Acesso ao cartão de vantagens para os dependentes. Pagamento da taxa anual de R$ 26,00 (vinte e seis reais) por dependente.</li>
          </ul>
        </li>
        <li>
          <span className="bold">Opção por NÃO FAZER</span> o Cartão de Vantagens ACIA. É necessário: Preencher o RQ.18 citado;
          <ul className="secondary-list">
            <li>
              Benefícios: Convênios na área da saúde (consultas e exames). Para isso quando for necessário, o interessado deverá 
              se dirigir até a ACIA com documento que comprove ser funcionário de empresa associada e retirar a Guia de autorização. 
              Titular que não possui o Cartão de Vantagens, não pode adquirir aos dependentes.
            </li>
          </ul>
        </li>
      </ul>
      <p>
        <span className="bold">Dependente: </span>
        Possui os mesmos benefícios do Titular. O Titular deve relacionar o dependente no momento de preenchimento do RQ.18 
        citado que deverá vir assinada pelo Titular e pela empresa associada.
      </p>
      <p>
        Para a aquisição do Cartão ao dependente, na sede da ACIA, serão solicitados: apresentação do Cartão de Vantagens do 
        Titular (sócio/funcionário) e documentos que comprovem a dependência. Mais esclarecimentos no Departamento Social da 
        ACIA, pelos telefones 62 4014-7000 e 4014-7009 e pelo site www.aciaanapolis.com.br.
      </p>
      <img src="/images/advantages-card/advantages-card.jpg" alt="Cartão de Vantagens Acia"/>
    </div>
  );
}
