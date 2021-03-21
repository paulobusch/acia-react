import './NewsCard.css';

import React from 'react';

export default props => (
  <div className="news-card">
    <div className="image" style={ { backgroundImage: `url('${props.image}')` } }></div>
    <div className="detail">
      <h3>{ props.title }</h3>
      <p>{ props.children }</p>
      <a href="#">Ler mais</a>
    </div>
  </div>
);
