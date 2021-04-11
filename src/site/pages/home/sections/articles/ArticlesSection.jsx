import './ArticlesSection.css';

import React from 'react';

import Slider from './../../../../common/slider/Slider';
import Section from '../../../../common/section/Section';
import ArticleCard from './article-card/ArticleCard';

export default props => {
  const publicities1 = [
    { image: 'images/publicities/publicity-1.jpg', position: 'center center' }
  ];
  const publicities2 = [
    { image: 'images/publicities/publicity-2.jpg', position: 'center center' },
    { image: 'images/publicities/publicity-3.png', position: 'center center' }
  ];

  return (
    <Section id="articles">
      <h2>ARTIGOS</h2>
      <div className="articles">
        <ArticleCard title="Boletim Informativo ACIA em Ação 451 – Sabatina dos Empresários com os Candidatos">
          A ACIA mantém sua tradição e realiza o bate papo com os candidatos a prefeito de Anápolis. 
          A disputa eleitoral em Anápolis sempre foi tratada pela ACIA como um dos pontos fundamentais…
        </ArticleCard>
        <ArticleCard title="Boletim Informativo ACIA em Ação 450 – ACIA Participa da Inauguração do IPASGO Clinicas de Anápolis">
          O Diretor de Comunicação da ACIA, Odilon Rosa, participou no dia 22, em Anápolis, da inauguração 
          da terceira unidade do IPASGO, o IPASGO CLINICAS DE ANÁPOLIS, que será mais um centro...
        </ArticleCard>
        <ArticleCard title="Boletim Informativo ACIA em Ação 449 – Homenagem Dia da Secretária 2020">
          O maior objetivo é o reconhecimento e incentivo as mulheres no secretariado. 
          Como parte de uma Ação Social anual da ACIA, o presidente da Entidade, Álvaro...
        </ArticleCard>
        <ArticleCard title="Boletim Informativo ACIA em Ação 448 – Anápolis Centro Estratégico">
          A última Live da Associação Comercial e Industrial de Anápolis realizada 
          na quarta-feira, dia 12 de agosto, esclareceu sobre a importância do...
        </ArticleCard>
      </div>
  
      <h2>PUBLICIDADE</h2>
      <div className="publicities">
        <div className="publicities-slider-container">
          <Slider slides={ publicities1 } timeTransition={ 10000 }/>
        </div>
        <div className="publicities-slider-container">
          <Slider slides={ publicities2 } timeTransition={ 10000 }/>
        </div>
      </div>
    </Section>
  );  
} 

