import './ServicesSection.css';

import React from 'react';

import Section from '../../../../common/section/Section';
import ServiceItem from './service-item/ServiceItem';

export default props => (
  <Section id="services">
    <ServiceItem icon="credit-card" title="ACIA CRED">
      CARTÃO DE CRÉDITO DO
      TRABALHADOR, BOM PARA
      A EMPRES BOM PARA O FUNCIONÁRIO
    </ServiceItem>
    <ServiceItem icon="desktop" title="CERTIFICADO DIGITAL">
      O CERTIFICADO DIGITAL DA ACIA É UMA
      EXCELENTE OPÇÃO PARA QUEM QUER,
      USUFRUIR DE SEGURANÇA E BAIXO CUSTO
    </ServiceItem>
    <ServiceItem icon="search" title="SERASA EXPERIAN">
      OBTENHA INFORMAÇÕES COMERCIAIS E
      FINANCEIRAS SOBRE PESSOAS E EMPRESAS,
      DE FORMA SIMPLES E ONLINE.
    </ServiceItem>
    <ServiceItem icon="mobile-alt" title="REDE CELULAR">
      ECONOMIA COM QUALIDADE É COM A REDE
      CELULAR, ONDE OFERECEMOS PLANOS DE
      LIGAÇÃO COM ECONOMIA PARA VOCÊ.
    </ServiceItem>
    <ServiceItem icon="gavel" title="CORTE DE CONCILIAÇÃO">
      CONSULTE SEUS PROCESSOS
      NA CORTE DE CONCILIAÇÃO.
    </ServiceItem>
  </Section>
);
