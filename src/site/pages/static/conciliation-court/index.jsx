import './conciliation-court.css'

import React from 'react';
import DocumentCard from './document-card/index';

export default function ConciliationCourt() {
  const documents = [
    { 
      title: 'Regimento',
      url: 'https://www.aciaanapolis.com.br/site/wp-content/uploads/2021/04/regimento_interno_2021.pdf',
      description: 'Clique no botão abaixo e leia o Regimento da 1ª Corte de Conciliação e Arbitragem da Anápolis:'
    },
    { 
      title: 'Consultar Valores',
      url: 'https://www.aciaanapolis.com.br/site/wp-content/uploads/2021/04/PORTARIA_001_REAJUSTESCORTE.pdf',
      description: 'Tabela de Custas da 1ª Corte de Conciliação e Arbitragem:'
    },
    { 
      title: 'Modelo de Cláusula',
      url: 'https://www.aciaanapolis.com.br/site/wp-content/uploads/2021/04/MODELO_DE_CL%c3%81USULA_COMPROMISS%c3%93RIA_DA_1%c2%aa_CCA_v2.pdf',
      description: 'Baixe o modelo de Cláusula para o seu Contrato:'
    }
  ];

  return (
    <div id="static-conciliation-court">
      <h2 className="main-title">CORTE DE CONCILIAÇÃO</h2>
      <img src="/images/conciliation-court/conciliation-court.jpeg" alt="Corte de Conciliação"/>
      { documents.map((d, i) => <DocumentCard key={ i } { ...d }/>) }
      <hr />
      <div className="bold">Informações:</div>
      <ul className="information-list">
        <li>
          Horário de Atendimento: <span className="bold">8h às 18h segunda a quinta-feira e sexta-feira das 8h às 17:30h</span>
        </li>
        <li>
          Auxiliar Administrativo: <span className="bold">Rafael de Paula Silva</span>
        </li>
        <li>
          Conciliadores e Árbitros: <span className="bold">Dra. Caroline Kowalewski e Dr. Olin Daniel Ferreira Silva</span>
        </li>
        <li>
          Contato Corte de Conciliação: <span className="bold">(62) 4014-7007 / (62) 9 9844-6447</span>
        </li>
        <li>
          Email: <span className="bold">corteacia@aciaanapolis.com.br</span>
        </li>
      </ul>
    </div>
  );
}
