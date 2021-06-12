import './contact.css';

import React from 'react';

import { WEBSITE_EMAIL, WEBSITE_LANDLINE } from '../../../consts';
import { WEBSITE_WHATSAPP, WEBSITE_ADDRESS } from './../../../consts';
import { generateAddContactLink } from './../../../common/api/whatsapp';

export default function Contact() {
  return (
    <div id="contact">
      <h2>CONTATO</h2>
      <ul>
        <li><a target="_blank" href={ `tel:55${WEBSITE_LANDLINE.replace(/\D/g, '')}` }><i className="fas fa-phone-alt"></i> { WEBSITE_LANDLINE }</a></li>
        <li><a target="_blank" href={ generateAddContactLink(WEBSITE_WHATSAPP) }><i className="fab fa-whatsapp-square"></i> { WEBSITE_WHATSAPP }</a></li>
        <li><a target="_blank" href={ `mailto:${WEBSITE_EMAIL}` }><i className="fas fa-envelope"></i> { WEBSITE_EMAIL }</a></li>
        <li><i className="fas fa-map-marker-alt"></i> { WEBSITE_ADDRESS }</li>
      </ul>
    </div>
  );
}
