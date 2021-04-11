import './ServiceCard.css';

import React from 'react';

export default props => (
  <a href="#" className="service-card">
    <i className={ `fas fa-${props.icon}` }></i>
    <h2>{ props.title }</h2>
    <p>{ props.children }</p>
  </a>
);
