import './ArticleCard.css';

import React from 'react';

export default props => (
  <div className="article-card">
    <div className="detail">
      <h3>{ props.title }</h3>
      <div>{ props.children }</div>
      <a href="#">Ver mais</a>
    </div>
  </div>
);
