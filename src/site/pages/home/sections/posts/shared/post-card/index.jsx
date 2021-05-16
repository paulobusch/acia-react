import './post-card.css';

import React from 'react';
import { extractTextFromHtml } from '../../../../../../../common/api/html';
import { limitText } from '../../../../../../../common/api/string';
import { Link } from 'react-router';

export default function PostCard(props) {
  const link = `/posts/view/${props.id}`;
  return (
    <div className="post-card">
      { props.image && 
        <Link to={ link } className="link-image">
          <div className="image" style={ { backgroundImage: `url('${props.image}')` } }></div>
        </Link> 
      }
      <div className="detail">
        <h3>{ props.title }</h3>
        <div className="text">{ limitText(extractTextFromHtml(props.text), 280) }</div>
        <Link to={ link }>Ver mais</Link>
      </div>
    </div>
  );
}
