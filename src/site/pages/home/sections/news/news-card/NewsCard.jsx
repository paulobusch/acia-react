import './NewsCard.css';

import React from 'react';
import { extractTextFromHtml } from './../../../../../../common/api/html';
import { limitText } from './../../../../../../common/api/string';

export default props => (
  <div className="news-card">
    <a href="#" className="link-image">
      <div className="image" style={ { backgroundImage: `url('${props.image}')` } }></div>
    </a>
    <div className="detail">
      <h3>{ props.title }</h3>
      <div className="text">{ limitText(extractTextFromHtml(props.text), 280) }</div>
      <a href="#">Ver mais</a>
    </div>
  </div>
);
