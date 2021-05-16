import './ArticleCard.css';

import React from 'react';
import { extractTextFromHtml } from './../../../../../../common/api/html';
import { limitText } from './../../../../../../common/api/string';

export default props => (
  <div className="article-card">
    <div className="detail">
      <h3>{ props.title }</h3>
      <div className="text">{ limitText(extractTextFromHtml(props.text), 280) }</div>
      <a href="#">Ver mais</a>
    </div>
  </div>
);
