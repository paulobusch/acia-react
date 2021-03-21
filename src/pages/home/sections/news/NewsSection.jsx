import './NewsSection.css';

import React from 'react';

import Section from '../../../../common/section/Section';
import NewsCard from './news-card/NewsCard';

export default props => (
  <Section id="news">
    <h2>NOTÍCIAS</h2>
    <div className="news">
      <NewsCard image="images/news/news-1.jpg" title="Esperança para vencer o COVID-19: VACINAÇÃO">
        Descoberto em 2019, um misterioso vírus “paralisa” e impacta o mundo. 
        Estudos apontam que o COVID-19 teve sua origem em Wuhan, e foi transmitido…
      </NewsCard>
      <NewsCard image="images/news/news-2.jpg" title="Conheça 1ª Corte de Conciliação e Arbitragem de Anápolis">
        A solução do seu conflito não deve ficar restrita ao Poder 
        Judiciário Em Anápolis-GO, a 1ª Corte de Conciliação e 
        Arbitragem atua desde 1996 e foi instituída para auxiliar…
      </NewsCard>
      <NewsCard image="images/news/news-3.jpg" title="Notícias 27/02 – 05/03">
        Acompanhe bem de perto as notícias que impactam o setor empresarial anapolino. 
        Confira: O Presidente da Federação do Comércio do Estado de Goiás (Fecomércio)…
      </NewsCard>
      <NewsCard image="images/news/news-4.jpg" title="Notícias da Semana 22/2 – 26/2">
        Acompanhe bem de perto as notícias que impactam o setor empresarial anapolino. 
        Confira: Balança comercial de Anápolis inicia 2021 com exportações em alta…
      </NewsCard>
    </div>
  </Section>
);
