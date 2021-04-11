import './ActionsSection.css';

import React from 'react';

import Section from '../../../../common/section/Section';
import ActionCard from './action-card/ActionCard';

export default props => (
  <Section id="actions">
    <h2>ACIA EM AÇÃO</h2>
    <div className="actions">
      <ActionCard image="images/actions/action-1.jpg" 
        title="Boletim Informativo ACIA em Ação 451 – Sabatina dos Empresários com os Candidatos">
        A ACIA mantém sua tradição e realiza o bate papo com os candidatos a prefeito de Anápolis. 
        A disputa eleitoral em Anápolis sempre foi tratada pela ACIA como um dos pontos fundamentais…
      </ActionCard>
      <ActionCard image="images/actions/action-2.jpg" 
        title="Boletim Informativo ACIA em Ação 450 – ACIA Participa da Inauguração do IPASGO Clinicas de Anápolis">
        O Diretor de Comunicação da ACIA, Odilon Rosa, participou no dia 22, em Anápolis, da inauguração 
        da terceira unidade do IPASGO, o IPASGO CLINICAS DE ANÁPOLIS, que será mais um centro...
      </ActionCard>
      <ActionCard image="images/actions/action-3.jpg" 
        title="Boletim Informativo ACIA em Ação 449 – Homenagem Dia da Secretária 2020">
        O maior objetivo é o reconhecimento e incentivo as mulheres no secretariado. 
        Como parte de uma Ação Social anual da ACIA, o presidente da Entidade, Álvaro...
      </ActionCard>
      <ActionCard image="images/actions/action-4.jpg" 
        title="Boletim Informativo ACIA em Ação 448 – Anápolis Centro Estratégico">
        A última Live da Associação Comercial e Industrial de Anápolis realizada 
        na quarta-feira, dia 12 de agosto, esclareceu sobre a importância do...
      </ActionCard>
    </div>
  </Section>
);
