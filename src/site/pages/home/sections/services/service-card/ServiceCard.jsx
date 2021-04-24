import './ServiceCard.css';

import React from 'react';
import { Link } from 'react-router';        

export default props => (
  <Link to={ props.to } className="service-card">
    <i className={ `fas fa-${props.icon}` }></i>
    <h2>{ props.title }</h2>
    <p>{ props.children }</p>
  </Link>
);
