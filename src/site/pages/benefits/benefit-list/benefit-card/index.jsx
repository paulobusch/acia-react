import './benefit-card.css';

import React from 'react';
import { Link } from 'react-router';
import { generateAddContactLink } from '../../../../../common/api/whatsapp';

export default function BenefitCard(props) {
  return (
    <Link className="benefit-card" to={ `/benefits/view/${props.id}` }>
      <h3 className="mobile-title">{ props.title }</h3>
      <div className="image" style={ { backgroundImage: `url('${props.image}')` } }></div>
      <div className="about">
        <h3 className="desktop-title">{ props.title }</h3>
        <p>{ props.description }</p>
      </div>
      <ul className="contact"> 
        { details(props) }
      </ul>
    </Link>
  );
}  

function details(accredited) {
  const details = [];

  if (accredited.responsible)
    details.push(detail(details.length, accredited.responsible, 'fas fa-user'));

  if (accredited.whatsapp)
    details.push(
      detail(
        details.length, accredited.whatsapp, 'fab fa-whatsapp-square',
        p => window.open(generateAddContactLink(p), '_self')
      )
    );
  else 
    details.push(
      detail(
        details.length, accredited.phone, 'fas fa-phone-alt', 
        p => window.open(`tel:55${p.replace(/\D/g, '')}`, '_self')
      )
    );
  if (accredited.email)
    details.push(
      detail(
        details.length, accredited.email, 'fas fa-envelope',
        email => window.open(`mailto:${email}`, '_self')
      )
    );
  if (accredited.website)
    details.push(
      detail(
        details.length, accredited.website, 'fas fa-globe',
        website => window.open(website, '_self')
      )
    );

  return details;
}

function detail(key, text, icon, action) {
  return (
    <li key={ key } onClick={ e => { if (action) { e.preventDefault(); action(text); } } } 
      className={ action ? 'link-action' : '' }>
      <i className={ icon }></i>
      { text }
    </li>
  );
}