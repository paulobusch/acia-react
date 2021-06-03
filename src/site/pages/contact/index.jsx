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
        <li><i className="fas fa-phone-alt"></i> { WEBSITE_LANDLINE }</li>
        <li className="link"><a href={ generateAddContactLink(WEBSITE_WHATSAPP) }><i className="fab fa-whatsapp-square"></i> { WEBSITE_WHATSAPP }</a></li>
        <li className="link"><a href={ `mailto:${WEBSITE_EMAIL}` }><i className="fas fa-envelope"></i> { WEBSITE_EMAIL }</a></li>
        <li className="map"><i className="fas fa-map-marker-alt"></i> { WEBSITE_ADDRESS }</li>
      </ul>
    </div>
  );
}
