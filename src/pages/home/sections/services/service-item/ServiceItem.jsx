import './ServiceItem.css';

import React from 'react';

export default props => (
  <div className="service-item">
    <i className={ `fas fa-${props.icon}` }></i>
    <h2>{ props.title }</h2>
    <p>{ props.children }</p>
  </div>
);
