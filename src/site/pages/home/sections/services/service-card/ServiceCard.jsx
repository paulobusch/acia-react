import './ServiceCard.css';

import React, { Fragment } from 'react';

export default function ServiceCard(props) {
  const service = <div>
    <i className={ props.icon }></i>
    <h3>{ props.title }</h3>
    <p>{ props.children }</p>
  </div>;
  return (<a target="_blank" href={ props.link } className="service-card">{ service }</a>);
}
