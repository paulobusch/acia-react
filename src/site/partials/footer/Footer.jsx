import './Footer.css';

import React from 'react';
import { WEBSITE_ADDRESS, WEBSITE_EMAIL, WEBSITE_LANDLINE } from '../../../consts';
import { WEBSITE_WHATSAPP } from './../../../consts';
import { generateAddContactLink } from './../../../common/api/whatsapp';
import { Link } from 'react-router';
import { POST_ACTION } from './../../../reducers/posts/post-type';
import FixedButton from './../../../common/buttons/fixed/index';

export default () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <ul className="main-list">
        <li>
          <ul className="block-list">
            <li><a target="_blank" href="/"><img src="images/acia/logo-acia-white.png"/></a></li>
          </ul>
        </li>
        <li>
          <h4>INFORMAÇÕES</h4>
          <ul className="block-list">
            <li><i className="fas fa-map-marker-alt"></i>{ WEBSITE_ADDRESS }</li>
            <li><a target="_blank" href={ `mailto:${WEBSITE_EMAIL}` }><i className="fas fa-envelope"></i> { WEBSITE_EMAIL }</a></li>
            <li><a target="_blank" href={ `tel:55${WEBSITE_LANDLINE.replace(/\D/g, '')}` }><i className="fas fa-phone-alt"></i> { WEBSITE_LANDLINE }</a></li>
            <li><a target="_blank" href={ generateAddContactLink(WEBSITE_WHATSAPP) }><i className="fab fa-whatsapp-square"></i> { WEBSITE_WHATSAPP }</a></li>
          </ul>
        </li>
        <li>
          <h4>EMPRESAS</h4>
          <ul className="block-list">
            <li><a target="_blank" href="/#/digital-certificate">CERTIFICADO DIGITAL</a></li>
            <li><a target="_blank" href="/#/conciliation-court">CORTE DE CONCILIAÇÃO</a></li>
            <li><a target="_blank" href="/#/advantages-card">CARTÃO DE VANTAGENS</a></li>
            <li><a target="_blank" href="/#/acia-cred">ACIA CRED</a></li>
          </ul>
        </li>
        <li>
          <h4>INSTITUCIONAL</h4>
          <ul className="block-list">
            <li><a target="_blank" href="/#/acia-woman">ACIA MULHER</a></li>
            <li><Link to={ `/posts/${encodeURIComponent(POST_ACTION)}` }>{ POST_ACTION.toUpperCase() }</Link></li>
            <li><a target="_blank" href="https://www.aciaanapolis.com.br/polodedefesa">POLO DE DEFESA</a></li>
            <li><a target="_blank" href="/#/policy-quality">POLÍTICA DE QUALIDADE</a></li>
            <li><a target="_blank" href="#">POLÍTICA DE PRIVACIDADE</a></li>
          </ul>
        </li>
        <li className="autosize">
          <h4>ANÁPOLIS</h4>
          <ul className="block-list">
            <li><a target="_blank" href="/#/history">HISTÓRIA</a></li>
            <li><a target="_blank" href="/#/geographical-information">INFORMAÇÕES GEOGRÁFICAS</a></li>
            <li><a target="_blank" href="/#/relevant-informations">INFORMAÇÕES RELEVANTES</a></li>
          </ul>
          <ul className="social-list">
            <li><a target="_blank" href="https://www.instagram.com/aciaanapolisoficial"><i className="fab fa-instagram"></i></a></li>
            <li><a target="_blank" href="https://www.facebook.com/acia.anapolis"><i className="fab fa-facebook"></i></a></li>
            <li><a target="_blank" href="https://www.youtube.com/channel/UCO4ScvIkaZpjLdytMBrYvmA"><i className="fab fa-youtube"></i></a></li>
            <li><a target="_blank" href="https://twitter.com/aciaanapolis"><i className="fab fa-twitter-square"></i></a></li>
          </ul>
        </li>
      </ul>        
      <div className="bottom">
        <span>
          <i className="far fa-copyright"></i>&nbsp;
          COPYRIGHT ACIA - ASSOCIAÇÃO COMERCIAL E INDUSTRIAL DE ANÁPOLIS - { year }
        </span>
        <a target="_blank" href="https://gritealto.com" target="_blank">
          Powered by GriteAlto
        </a>         
      </div>
      <FixedButton image="images/social/whatsapp.png" href={ generateAddContactLink(WEBSITE_WHATSAPP) }/>
    </footer>
  );  
}
