import './policy-quality.css'

import React from 'react';

export default function PolicyQuality() {
  return (
    <div id="static-policy-quality">
      <h2>POLÍTICA DA QUALIDADE</h2>
      <p>
        A ACIA, fundada em 8 de fevereiro de 1936, é uma entidade civil, representativa, sem fins lucrativos, 
        com personalidade jurídica de caráter assistencial, cultural e social; com patrimônio e individualidade 
        próprios e distintos de seus sócios; com sede e foro em Anápolis-GO.
      </p>
      <p>
        A Associação Comercial e Industrial de Anápolis – ACIA, com sede e foro em Anápolis, foi fundada em 8 de 
        fevereiro de 1936, com o propósito de unir e defender os seus associados e comerciantes. Ampliou o seu campo de 
        ação, recebendo e absorvendo a Associação Industrial, que se uniram, fortalecendo-se. Após anos de intenso trabalho, 
        dificuldades e vencendo obstáculos, transforma-se, hoje, no centro das discussões, estudos e decisões importantes 
        para os desafios do desenvolvimento da região. Além dos benefícios conquistados, avança em audaciosos projetos, 
        como ligação ferroviária, Estação Multimodal, Aeroporto Internacional de Cargas e Universidade com a certeza de 
        novos horizontes para Anápolis, face à austeridade de seu procedimento e parcerias com os poderes públicos.
      </p>
      <ul className="main-list">
        <li>
          <div className="bold">MISSÃO</div>
          <p>
            Integrar, representar e defender os direitos dos associados, interagindo com outras entidades em prol do seu 
            desenvolvimento e progresso, prestando serviços sociais e afins à entidade.
          </p>
        </li>
        <li>
          <div className="bold">VISÃO</div>
          <p>Ser uma referência em Gestão de Associação Comercial e Industrial na região Centro Oeste goiana</p>
        </li>
        <li>
          <div className="bold">VALORES</div>
          <ul className="secondary-list">
            <li>
              <span className="bold">Atitude de dono: </span>acatar demandas com responsabilidade, compromisso e competência, 
              buscando os resultados planejados.
            </li>
            <li>
              <span className="bold">Interdependência: </span>priorizar o “nós” à frente do “eu”, cultivando relações de 
              cooperação mútua, parceria e integração que possa fortalecer a entidade como legítima representante em Anápolis e 
              região.
            </li>
            <li>
              <span className="bold">Ética: </span>transparência nas ações e respeito às pessoas, associados, diretores, 
              colaboradores ou fornecedores, construindo dessa forma nossa credibilidade.
            </li>
            <li>
              <span className="bold">Excelência: </span>oferecer produtos e serviços com qualidade reconhecida e busca da 
              excelência, fazendo sempre o melhor possível para atender as necessidades de nossos associados.
            </li>
            <li>
              <span className="bold">Proatividade: </span>encorajar a criatividade e iniciativa dos colaboradores no 
              desenvolvimento e realização de suas atividades.
            </li>
            <li>
              <span className="bold">Respeito à Memória: </span>a imagem institucional e credibilidade da associação construída 
              ao longo de sua história carrega lutas e conquistas 
              para a cidade. Por isso, respeitamos, preservamos e difundimos essa memória aos públicos que relacionamos.
            </li>
            <li>
              <span className="bold">Política da Qualidade: “PRESTAR SERVIÇOS QUE ATENDAM NOSSOS CLIENTES COM MELHORIA 
              CONTÍNUA E COMPROMISSO COM A COMUNIDADE LOCAL”</span>
            </li>
          </ul>
        </li>
      </ul>
      <div className="reference">Anápolis, 12 / 06 / 19 – Rev.01</div>
    </div >
  );
}
