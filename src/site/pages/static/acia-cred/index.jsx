import './acia-cred.css'

import React from 'react';
import Card from './card/index';
import Row from './../../../../common/row/index';

export default function AciaCred() {
  return (
    <div id="static-acia-cred">
      <h2>ACIACRED – CONVÊNIO / CREDENCIADO</h2>
      <Row justify="space-between" className="cards">
        <Card className="blue" title="Empresas Credenciadas / Conveniadas" href="https://cartao3.algorix.com/Comcard/Login.aspx?op=Login"/>
        <Card className="green" title="Funcionários" href="https://cartao3.algorix.com/Comcard/Atend/logincliente.aspx"/>
      </Row>
      <h2 className="subtitle">ACIACred CONVÊNIO</h2>
      <h3 className="subtitle">O cartão de crédito do trabalhador.</h3>
      <p>
        A Associação Comercial e Industrial de Anápolis será a administradora do cartão e fará a intermediação 
        entre as empresas CONVENIADAS e CREDENCIADAS, proporcionando reais vantagens para o empregador e 
        seus funcionários e clientes.
      </p>
      <p>
        O Cartão ACIACred Convênio tem o objetivo de <span className="bold">fomentar os negócios de seus associados, intensificando a 
        economia local</span>, pois se trata de um <span className="bold">cartão corporativo, desenvolvido para o incremento real do faturamento 
        das empresas associadas.</span>
      </p>
      <p>
        O ACIACred Convênio é um produto diferenciado dos demais cartões de crédito, pois o objetivo do projeto é de colaborar 
        cada vez mais com os negócios dos associados da ACIA e intensificar o desenvolvimento da economia local.  
        O produto é desenvolvido em parceria com a COMCARD, que já fez a implantação do sistema na cidade de Caldas Novas.
      </p>
      <p>
        Os interessados podem ligar e agendar uma visita pelo telefone (62) 4014-7000.
      </p>
      <Row justify="space-between" className="details">
        <img src="images/cred/aciacred-1.jpeg" alt="Acia Cred 1"/>
        <img src="images/cred/aciacred-2.jpeg" alt="Acia Cred 2"/>
      </Row>
      <img src="images/cred/aciacred-3.jpeg" alt="Acia Cred 3"/>
    </div>                            
  );
}
