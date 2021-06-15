import './conciliation-court.css'

import React from 'react';
import DocumentCard from './document-card/index';

export default function ConciliationCourt() {
  const documents = [
    { 
      title: 'Portaria',
      url: '/documents/ALTERAÇÃO REGIMENTO INTERNO.pdf',
      description: 'Clique no botão abaixo e tenha acesso a Portaria'
    },
    { 
      title: 'Regimento Interno',
      url: '/documents/Regimento.Interno.1ªCCA.JUNHO-21.pdf',
      description: 'Clique no botão abaixo e leia o Regimento da 1ª Corte de Conciliação e Arbitragem da Anápolis'
    },
    { 
      title: 'Tabela de Custos',
      url: '/documents/TABELA DE CUSTAS JUNHO-21.pdf',
      description: 'Baixe a Tabela de Custos para o seu Contrato'
    },
    { 
      title: 'Cláusula',
      url: '/documents/MODELO_DE_CLÁUSULA_COMPROMISSÓRIA_DA_1ª_CCA_v2.pdf',
      description: 'Baixe a Cláusula para o seu Contrato'
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
