import './Footer.css';

import React from 'react';

export default props => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <ul className="main-list">
        <li>
          <ul className="block-list">
            <li><img src="images/acia/logo-acia-white.png"/></li>
            <li><a href="#">FALE COM UM ATENDENTE</a></li>
            <li><a href="#">POLÍTICA DE PRIVACIDADE</a></li>
            <li><a href="#">ASSOCIE-SE</a></li>
            <li>
              <a href="#">
                R. Manoel D'abadia, 335 - St. Central, <br />
                Anápolis - GO, 75020-030
              </a>
            </li>
          </ul>
        </li>
        <li>
          <h2>EMPRESAS</h2>
          <ul className="block-list">
            <li><a href="#">CERTIFICADO DIGITAL</a></li>
            <li><a href="#">CORTE DE CONCILIAÇÃO</a></li>
            <li><a href="#">CARTÃO DE VANTAGENS</a></li>
            <li><a href="#">ACIA CRED</a></li>
          </ul>
        </li>
        <li>
          <h2>INSTITUCIONAL</h2>
          <ul className="block-list">
            <li><a href="#">ACIA TEC</a></li>
            <li><a href="https://www.aciaanapolis.com.br/site/acia-mulher">ACIA MULHER</a></li>
            <li><a href="https://www.aciaanapolis.com.br/polodedefesa">POLO DE DEFESA</a></li>
            <li><a href="https://www.aciaanapolis.com.br/site/politica-da-qualidade">POLÍTICA DE QUALIDADE</a></li>
          </ul>
        </li>
        <li>
          <h2>ANÁPOLIS</h2>
          <ul className="block-list">
            <li><a href="#">HISTÓRIA</a></li>
            <li><a href="#">INFORMAÇÕES GEOGRÁFICAS</a></li>
            <li><a href="#">INFORMAÇÕES RELEVANTES</a></li>
            <li><a href="https://www.juceg.go.gov.br">JUCEG</a></li>
            <li><a href="https://portaldoempreendedor.me">PORTAL DO MICROEMPREENDEDOR</a></li>
            <li><a href="https://www.sebrae.com.br/sites/PortalSebrae/ufs/go?codUf=10&gclid=Cj0KCQjwgtWDBhDZARIsADEKwgMks6rnCHkmrxWWjUQmTWvXRGEUmH1LcrHm9GvHJS5f1Hcucs1v0KwaAlVXEALw_wcB">SEBRAE</a></li>
          </ul>
        </li>
        <li>
          <h2>RECEBA NOVIDADES</h2>
          <input type="email" name="email" placeholder="escreva seu email..."/>
          <ul className="social-list">
            <li><a href="https://www.facebook.com/acia.anapolis"><i className="fab fa-facebook"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter-square"></i></a></li>
            <li><a href="https://www.instagram.com/aciaanapolisoficial"><i className="fab fa-instagram"></i></a></li>
            <li><a href="https://www.youtube.com/channel/UCO4ScvIkaZpjLdytMBrYvmA"><i className="fab fa-youtube"></i></a></li>
          </ul>
        </li>
      </ul>        
      <div className="bottom">
        <span>
          <i className="far fa-copyright"></i>&nbsp;
          DEF Brokers { year } - Todos os direitos reservados
        </span>
        <a href="https://gritealto.com" target="_blank">
          Powered by GriteAlto
        </a>         
      </div>
    </footer>
  );  
}
