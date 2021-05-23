import './Footer.css';

import React from 'react';
import { WEBSITE_EMAIL } from '../../../consts';
import { WEBSITE_PHONE } from './../../../consts';
import { generateAddContactLink } from './../../../common/api/whatsapp';

export default props => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <ul className="main-list">
        <li>
          <ul className="block-list">
            <li><img src="images/acia/logo-acia-white.png"/></li>
            <li><a href={ generateAddContactLink(WEBSITE_PHONE) }>FALE COM UM ATENDENTE</a></li>
            <li><a href="#">POLÍTICA DE PRIVACIDADE</a></li>
            <li><a href="/#/subscribe">ASSOCIE-SE</a></li>
            <li>
              <a href="#">
                R. Manoel D'abadia, 335 - St. Central, <br />
                Anápolis - GO, 75020-030
              </a>
            </li>
          </ul>
        </li>
        <li>
          <h3>EMPRESAS</h3>
          <ul className="block-list">
            <li><a href="/#/digital-certificate">CERTIFICADO DIGITAL</a></li>
            <li><a href="/#/conciliation-court">CORTE DE CONCILIAÇÃO</a></li>
            <li><a href="/#/advantages-card">CARTÃO DE VANTAGENS</a></li>
            <li><a href="/#/acia-cred">ACIA CRED</a></li>
          </ul>
        </li>
        <li>
          <h3>INSTITUCIONAL</h3>
          <ul className="block-list">
            <li><a href={ `mailto:${WEBSITE_EMAIL}` }>ACIA TEC</a></li>
            <li><a href="/#/acia-woman">ACIA MULHER</a></li>
            <li><a href="https://www.aciaanapolis.com.br/polodedefesa">POLO DE DEFESA</a></li>
            <li><a href="/#/policy-quality">POLÍTICA DE QUALIDADE</a></li>
          </ul>
        </li>
        <li>
          <h3>ANÁPOLIS</h3>
          <ul className="block-list">
            <li><a href="https://www.aciaanapolis.com.br/site/historia/">HISTÓRIA</a></li>
            <li><a href="/#/geographical-information">INFORMAÇÕES GEOGRÁFICAS</a></li>
            <li><a href="/#/relevant-informations">INFORMAÇÕES RELEVANTES</a></li>
            <li><a href="https://www.juceg.go.gov.br">JUCEG</a></li>
            <li><a href="https://portaldoempreendedor.me">PORTAL DO MICROEMPREENDEDOR</a></li>
            <li><a href="https://www.sebrae.com.br/sites/PortalSebrae/ufs/go?codUf=10&gclid=Cj0KCQjwgtWDBhDZARIsADEKwgMks6rnCHkmrxWWjUQmTWvXRGEUmH1LcrHm9GvHJS5f1Hcucs1v0KwaAlVXEALw_wcB">SEBRAE</a></li>
          </ul>
        </li>
        <li>
          <h3>RECEBA NOVIDADES</h3>
          <input type="email" name="email" placeholder="escreva seu email..."/>
          <ul className="social-list">
            <li><a href="https://www.facebook.com/acia.anapolis"><i className="fab fa-facebook"></i></a></li>
            <li><a href="https://twitter.com/aciaanapolis"><i className="fab fa-twitter-square"></i></a></li>
            <li><a href="https://www.instagram.com/aciaanapolisoficial"><i className="fab fa-instagram"></i></a></li>
            <li><a href="https://www.youtube.com/channel/UCO4ScvIkaZpjLdytMBrYvmA"><i className="fab fa-youtube"></i></a></li>
          </ul>
        </li>
      </ul>        
      <div className="bottom">
        <span>
          <i className="far fa-copyright"></i>&nbsp;
          COPYRIGHT ACIA - ASSOCIAÇÃO COMERCIAL E INDUSTRIAL DE ANÁPOLIS - { year }
        </span>
        <a href="https://gritealto.com" target="_blank">
          Powered by GriteAlto
        </a>         
      </div>
    </footer>
  );  
}
