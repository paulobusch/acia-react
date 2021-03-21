import './NewsCard.css';

import React from 'react';

export default props => (
  <div className="news-card">
    <a href="#" className="link-image">
      <div className="image" style={ { backgroundImage: `url('${props.image}')` } }></div>
    </a>
    <div className="detail">
      <h3>{ props.title }</h3>
      <p>{ props.children }</p>
      <a href="#">Ver mais</a>
    </div>
  </div>
);
