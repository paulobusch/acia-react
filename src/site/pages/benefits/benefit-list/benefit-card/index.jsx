import './benefit-card.css';

import React from 'react';
import { Link } from 'react-router';

export default function BenefitCard(props) {
  return (
    <Link className="benefit-card" to={ `/benefits/view/${props.id}` }>
      <h3 className="mobile-title">{ props.title }</h3>
      <div className="image" style={ { backgroundImage: `url('${props.image}')` } }></div>
      <div className="about">
        <h3 className="desktop-title">{ props.title }</h3>
        <p>{ props.description }</p>
        <ul className="contact"> 
          { props.responsible &&
            <li>
              <i className="fas fa-user"></i>
              { props.responsible }
            </li>
          }
          <li>
            <i className="fas fa-phone-alt"></i>
            { props.phone }
          </li>
          <li>
            <i className="fas fa-map-marker-alt"></i>
            { props.address }
          </li>
        </ul>
      </div>
    </Link>
  );
}
