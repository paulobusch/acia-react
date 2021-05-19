import './about.css';

import React from 'react';
import Row from './../../../../common/row/index';

export default function About() {
    return (
      <div id="static-about">
        <h2>QUEM SOMOS</h2>
        <Row className="main">
          <div className="detail">
            <p>
              A história da ACIA teve início no ano de 1935, época em que a estrada de ferro foi inaugurada em Anápolis, 
              impulsionando o crescimento econômico, contribuindo para a instalação de novas empresas e despertando nos 
              homens de negócio da cidade a necessidade de se instituir uma entidade capaz de congrega-los e que servisse 
              de instrumento para defesa dos interesses em comum da categoria.
            </p>
            <Row justify="space-between" className="actions">
              <a href="https://www.aciaanapolis.com.br/site/palavras-do-presidente">Palavras do Presidente</a>
              <a href="https://www.aciaanapolis.com.br/site/diretoria">Diretoria 2019 - 2021</a>
            </Row>
          </div>
          <iframe className="video" src="https://www.youtube.com/embed/D0ep4dn4rpA?feature=oembed"/>
        </Row>
        <h2>A HISTÓRIA DA INSTITUIÇÃO</h2>
        <div>
          <div className="title">Nossa História</div>
          <p>A história da ACIA teve início no ano de 1935, época em que a estrada de ferro foi inaugurada em Anápolis, 
            impulsionando o crescimento econômico, contribuindo para a instalação de novas empresas e despertando nos 
            homens de negócio da cidade a necessidade de se instituir uma entidade capaz de congrega-los e que servisse de 
            instrumento para defesa dos interesses em comum da categoria.
            Foi com base nesses ideais que no dia 8 de fevereiro de 1936 um grupo de empresários se reuniu no então Clube 
            Lítero Recreativo Anapolino e, em sessão solene, discutiu a fundação da Associação Comercial e Anápolis. 
            Da primeira ata, lavrada naquele dia e mantida até hoje nos arquivos da ACIA, consta que Nicanor de Faria e Silva, 
            escolhido como orador do grupo, foi o responsável pela exposição dos motivos em defesa da criação da entidade.
            Encaminhadas as primeiras providências e conscientizados os presentes da viabilidade
            do projeto, foi formada uma diretoria provisória eleita por aclamação.
            Ela era assim constituída: Albérico Borges de Carvalho (presidente), Carlos de Pina (primeiro vice-presidente), 
            Cel. Cristovam Campos (segundo vice-presidente), Manoel S. Maia (terceiro vice-presidente), José E. Roriz (tesoureiro), 
            Calixto José Fares (primeiro secretário), Declieux J. Crispim (segundo secretário) e Nicanor de Faria e Silva (orador oficial).
            Após a posse dos membros da primeira diretoria, o presidente Albérico Borges de Carvalho, vislumbrando a necessidade 
            de dar uma personalidade legal à entidade, constituiu uma comissão formada por Nicanor de Faria e Silva, 
            Tarcis de Almeida Monteiro, Graciano Antônio da Silva, João José Peclat, Benedito Matias e Juvenal Campos Amaral 
            para estudar e elaborar os estatutos da então Associação Comercial de Anápolis.
            Em 28 de maio de 1936 foi realizada uma reunião com a presença de vários empresários da cidade para a composição de 
            uma comissão de sindicância, integrada por Miguel Pedreiro, Cristovam Campos, Graciano Antônio da Silva, Achiles de Pina, 
            Tarcis de Almeida Monteiro, Benedito Matias, Anísio Cecílio e Eduardo Chaed.
            A história da entidade, de acordo com os anais existentes hoje, é retomada em fevereiro de 1943, quando ela ressurge 
            com a denominação de Associação Comercial, Industrial e Agropecuária de Anápolis. No final da década de 1940 foi feita 
            uma reunião da diretoria, envolvendo pessoas como José Falluh, Fares Falluh, Ildefonso Castanheira, Justo Neiva de Souza, 
            José Martins de Brito, José Antônio Garcia, João Rios Carneiro, Esper Caixe, Raimundo Lins Neto, Hastinphilo Pereira Leão, 
            Abrão Besboródco e José Garibaldi Nunes da Costa.
          </p>
        </div>
        <div>
          <div className="title">Sede</div>
          <p>A luta para dotar a entidade de uma sede própria foi deflagrada em 8 de abril de 1958 pelo associado Sócrates Diniz. 
            O empresário entendia que era necessária a implantação de um local para reuniões, até então realizadas nas 
            residências dos filiados. Alguns anos antes, mais precisamente em 4 de junho de 1944, 
            o presidente da Associação Comercial de Anápolis, João Luiz de Oliveira, durante seu discurso de posse, 
            já falava da necessidade de uma sede própria para a entidade.
            Mas somente em 1971, sob a gestão do presidente Mounir Naoum, é que o projeto foi finalmente concretizado. 
            O Palácio do Comércio, localizado no centro de Anápolis, é hoje um marco histórico na luta dos interesses da 
            classe empresarial da cidade. O grande mérito da realização deste plano de sede própria também é atribuído 
            ao já falecido Aléxis Salomão, presidente entre 1969 e 1971.
          </p>
        </div>
        <div>
          <div className="title">Estatuto</div>
          <p>O estatuto da ACIA, aprovado no dia 30 de setembro de 1955, dá a seguinte orientação em seu primeiro artigo: 
            “A Associação Comercial e Industrial de Anápolis, fundada em 8 de fevereiro de 1936 e que já funcionou com nome de 
            Associação Comercial, Industrial e Agropecuária de Anápolis, é uma sociedade civil, de intuitos não lucrativos e 
            duração ilimitada, com sede e foro nesta cidade, tendo por finalidade precípua defender, amparar, orientar e instruir 
            as classes que representa, e bem assim, cooperar com os poderes públicos na solução dos problemas econômicos da região”.
          </p>
        </div>
        <div>
          <div className="title">Fusão</div>
          <p>Até 1971, além da Associação Comercial de Anápolis, funcionava na cidade a Associação Industrial de Anápolis, 
            na época presidida por Gilson Teixeira do Amaral Brito. No dia 26 de março de 1971, em sessão ordinária, 
            foi discutida pela primeira vez a fusão das duas entidades.
            Depois de avaliadas as conveniências, ficou aprovada a proposta de fusão das duas entidades, 
            havendo inclusive o acoplamento de nomes. A partir de então a denominação passou a ser Associação Comercial e 
            Industrial de Anápolis (ACIA).
          </p>
          <p>
            A partir da unificação, houve uma assembléia geral para debater, entre outros assuntos, a elaboração do novo 
            estatuto da entidade. Isso aconteceu no dia 20 de maio de 1971, quando foi elaborado o artigo primeiro do estatuto. 
            Ele diz o seguinte: “A Associação Comercial e Industrial de Anápolis, fundada no dia 08.02.36, e a Associação 
            Industrial de Anápolis, fundada no dia 08.12.58, é uma entidade civil, com personalidade jurídica de fins não 
            lucrativos, e de duração ilimitada, com sede e foro nesta cidade de Anápolis, Estado de Goiás, que se constitui 
            com a finalidade precípua de defender os interesses da classe que representa, mantendo sempre o elevado nível ético, 
            moral e intelectual; promover e incentivar a união e solidariedade entre os associados e associações de classe de todo 
            o País; manter os serviços de utilidade para os seus associados e para o comércio e indústria em geral; desempenhar 
            todas as funções do Código Comercial e demais leis do País conferidas as associações comerciais e industriais; 
            procurar dirimir, amigavelmente, questões, por ventura surgidas entre as classes que representa, ou seus associados; 
            ser órgão representativo, perante os poderes públicos, das classes que a compõem, colaborando na solução de todos os 
            problemas; participar de associações de classe e prestigiar a organização sindical”.
          </p>
        </div>
      </div>
    );
}
