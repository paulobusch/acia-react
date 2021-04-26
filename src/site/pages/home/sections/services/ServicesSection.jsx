import './ServicesSection.css';

import React from 'react';

import Section from '../../../../common/section/Section';
import ServiceCard from './service-card/ServiceCard';

export default props => (
  <Section id="services">
    <ServiceCard icon="credit-card" title="ACIA CRED" href="https://www.aciaanapolis.com.br/site/aciacred-convenio/">
      CARTÃO DE CRÉDITO DO
      TRABALHADOR, BOM PARA
      A EMPRES BOM PARA O FUNCIONÁRIO
    </ServiceCard>
    <ServiceCard icon="desktop" title="CERTIFICADO DIGITAL" href="https://www.aciaanapolis.com.br/site/certificado-digital-acia/">
      O CERTIFICADO DIGITAL DA ACIA É UMA
      EXCELENTE OPÇÃO PARA QUEM QUER,
      USUFRUIR DE SEGURANÇA E BAIXO CUSTO
    </ServiceCard>
    <ServiceCard icon="search" title="SERASA EXPERIAN" href="https://www.aciaanapolis.com.br/site/serasa-experian/">
      OBTENHA INFORMAÇÕES COMERCIAIS E
      FINANCEIRAS SOBRE PESSOAS E EMPRESAS,
      DE FORMA SIMPLES E ONLINE.
    </ServiceCard>
    <ServiceCard icon="mobile-alt" title="REDE CELULAR" href="https://www.aciaanapolis.com.br/site/rede-celular/">
      ECONOMIA COM QUALIDADE É COM A REDE
      CELULAR, ONDE OFERECEMOS PLANOS DE
      LIGAÇÃO COM ECONOMIA PARA VOCÊ.
    </ServiceCard>
    <ServiceCard icon="gavel" title="CORTE DE CONCILIAÇÃO" to="law-suit/search">
      CONSULTE SEUS PROCESSOS
      NA CORTE DE CONCILIAÇÃO.
    </ServiceCard>
  </Section>
);
