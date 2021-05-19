import './president.css'

import React from 'react';
import Row from './../../../../common/row/index';

export default function President() {
  return (
    <div id="static-president">
      <h2 className="main-title">PALAVRAS DO PRESIDENTE</h2>
      <Row className="main">
        <div className="detail">
          <div className="title">De 1936 aos dias atuais...</div>
          <p>Caros associados,</p>
          <p>É com muita alegria e honra que ao assumir a presidência da Associação Comercial e Industrial de 
            Anápolis encontramos a Casa do Empresário unida, com visão e convergência para continuar construindo 
            uma Anápolis melhor e com condições de empregabilidade para todos, desde ao grande empresário, 
            responsável pela geração de centenas de empregos ao microempresário que também produz e distribui renda. 
            A ACIA é a casa de todos!
          </p>
          <p>
            Ao longo dos seus 83 anos, a Associação Comercial e Industrial de Anápolis foi construída 
            com o suor e luta de empreendedores que visualizaram construir no Centro-Oeste uma Base Aérea, 
            um Distrito Agroindustrial, uma Ferrovia, um Centro de Convenções, um Aeroporto de Cargas e tantos 
            outros empreendimentos que fizeram e fazem a diferença no progresso e desenvolvimento de Anápolis e região. 
            Ou seja, ao longo dessas oito décadas cada presidente, diretor e associado tem feito sua contribuição 
            “colocando seu tijolo” e deixando a sua marca que precisa ser reconhecida e constantemente relembrada.
          </p>
          <p>
            Por isso, parabenizamos o trabalho sério e dedicado realizado em muitas frentes realizado pela diretoria 
            que nos precedeu. Agradeço especialmente o ex-presidente Anastacios Apostolos Dagios, pelo brilhante 
            trabalho e pela maneira como conduziu todo processo eleitoral e transição para a nova fase que iremos vivenciar.
          </p>
          <p>
            Aos nossos associados, mais uma vez, reafirmamos o compromisso de que os seus interesses continuarão sendo a 
            prioridade desta Casa. Pois acreditamos que a melhor política social que existe é o emprego e sem a ousadia, 
            dedicação e fé dos empreendedores sejam eles pequenos, médios ou grandes não há como existir desenvolvimento. 
            A eles nosso reconhecimento especial, afinal, colocar o capital em risco, sobretudo em tempos econômicos difíceis, 
            exige mais do que coragem, exige uma crença inabalável.
          </p>
          <p>
            Aos nossos diretores, agradeço a confiança e parceria, a ACIA não é uma empresa privada, 
            trata-se de uma Associação construída com a contribuição de todos nós empresários, 
            representados em dezenas de segmentos dos principais setores produtivos. A participação de todos é 
            fundamental para darmos continuidade ao nosso protagonismo. Tenham a certeza de que todas as decisões 
            dessa diretoria terão a participação do nosso Conselho Diretor.
          </p>
          <p>
            Contamos com a colaboração e trabalho de todos, com sugestões, propostas e críticas construtivas, para que façamos 
            dos próximos dois anos um tempo de muita luta, coragem e realização para Anápolis e Estado de Goiás.
          </p>
          <p>
            Álvaro Otávio Dantas Maia<br />
            Presidente ACIA
          </p>
        </div>
        <Row className="galery">
          <div className="image">
            <img src="/images/president/construction.jpg" alt="Construção"/>
            <label>Nossa sede na época de sua construção</label>
          </div>
          <div className="image">
            <img src="/images/president/sede.jpg" alt="Sede"/>
            <label>ACIA nos dias atuais.</label>
          </div>
        </Row>
      </Row>
    </div>
  );
}
