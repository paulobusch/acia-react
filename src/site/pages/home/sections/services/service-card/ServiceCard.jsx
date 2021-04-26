import './ServiceCard.css';

import React, { Fragment } from 'react';
import { Link } from 'react-router';        

export default function ServiceCard(props) {
  const service = <div>
    <i className={ `fas fa-${props.icon}` }></i>
    <h2>{ props.title }</h2>
    <p>{ props.children }</p>
  </div>;
  if (props.href) return (<a href={ props.href } className="service-card">{ service }</a>);
  return (<Link to={ props.to } className="service-card">{ service }</Link>);
}
