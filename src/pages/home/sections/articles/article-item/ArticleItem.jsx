import './ArticleItem.css';

import React from 'react';

export default props => (
  <div className="article-item">
    <div className="article-item-body" style={ { backgroundImage: `url('${props.image}')` } }>
      <h3>{ props.title }</h3>
    </div>
    <div className="article-item-hover">
      <a href="#">Ver detalhes</a>
    </div>
  </div>
);
