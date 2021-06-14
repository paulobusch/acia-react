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
            <li><a href="/"><img src="images/acia/logo-acia-white.png"/></a></li>
          </ul>
          <ul className="social-list">
            <li><a target="_blank" href="https://www.instagram.com/aciaanapolisoficial"><i className="fab fa-instagram"></i></a></li>
            <li><a target="_blank" href="https://www.facebook.com/acia.anapolis"><i className="fab fa-facebook"></i></a></li>
            <li><a target="_blank" href="https://www.youtube.com/channel/UCO4ScvIkaZpjLdytMBrYvmA"><i className="fab fa-youtube"></i></a></li>
            <li><a target="_blank" href="https://twitter.com/aciaanapolis"><i className="fab fa-twitter-square"></i></a></li>
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
      </ul>
      <div className="bottom">
        <span>
          <i className="far fa-copyright"></i>&nbsp;
          COPYRIGHT ACIA - ASSOCIAÇÃO COMERCIAL E INDUSTRIAL DE ANÁPOLIS - { year }
        </span>
        <a href="https://gritealto.com">
          Powered by GriteAlto
        </a>         
      </div>
      <FixedButton image="images/social/whatsapp.png" href={ generateAddContactLink(WEBSITE_WHATSAPP) }/>
    </footer>
  );  
}
