import './acia-woman.css'

import React from 'react';

export default function AciaWoman() {
  return (
    <div id="static-acia-woman">
      <h2>ACIA MULHER</h2>
      <img alt="Acia Mulher" src="/images/acia-woman/acia-woman.jpg"/>
      <h2>PARTICIPE DO CONSELHO DA MULHER EMPREENDEDORA DE ANÁPOLIS –  ACIA MULHER</h2>
      <p>
        A <span className="bold">ACIA MULHER</span> é um braço da Associação Comercial e Industrial de Anápolis, criado em 16 de setembro de 2015, pela 
        presidência desta entidade. É apartidário e sem fins lucrativos. A primeira prioridade do Conselho da Mulher 
        Empreendedora – ACIA MULHER é aumentar a participação e atividades das mulheres empresárias e profissionais 
        liberais nas decisões em prol da nossa cidade. Atuando sobre o guarda chuvas da ACIA a ACIA Mulher tem como objetivo 
        incentivar o empreendedorismo feminino por meio do desenvolvimento do potencial da mulher empresaria e das suas empresas.
      </p>
      <p className="bold question">Quais os principais objetivos?</p>
      <p>
        Unir e promover o fortalecimento da mulher empresária e empreendedora; Incentivar a participação da mulher em atividades 
        empresariais e classistas; Promover a união, capacitação e o aperfeiçoamento por meio de cursos e palestras.
      </p>
      <p className="bold question">Quando ocorrem as reuniões?</p>
      <p>As reuniões são realizadas quinzenalmente na sede da ACIA Anápolis.</p>
      <p className="bold">Principais Eventos promovidos:</p>
      <ul>
        <li>
          <div className="bold">Troféu Mulher Destaque</div>
          <p>
            Evento anual e tem por objetivo reconhecer mulheres no contexto socioeconômico empresarial, político, saúde, esporte, 
            comunicação, educação, serviço público, cultural e outros de Anápolis.
          </p>
        </li>
        <li>
          <div className="bold">Homenagem e Capacitação Dia das Secretárias</div>
          <p>
            Evento anual de suporte empresarial para capacitação e reconhecimento profissional, tem por objetivo valorizar e 
            reconhecer essas profissionais fundamentais nas empresas, clínicas e hospitais, afinal as Secretárias são 
            “a porta de entrada” destes estabelecimentos.
          </p>
        </li>
      </ul>
      <p className="bold question">Quem pode participar da ACIA MULHER?</p>
      <p>Mulheres que administre ou represente uma empresa, profissionais com perfil empreendedor ou profissionais liberais associadas a ACIA.</p>
    </div >
  );
}
