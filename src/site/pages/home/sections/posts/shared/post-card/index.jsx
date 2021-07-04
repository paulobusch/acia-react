import './post-card.css';

import React from 'react';
import { extractTextFromHtml } from '../../../../../../../common/api/html';
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
        <div className="text-container">
          <div className="text" style={ { WebkitLineClamp: getLines(props) } }>{ extractTextFromHtml(props.text) }</div>
        </div>
        <Link to={ link }>Ver mais</Link>
      </div>
    </div>
  );
}

function getLines(props) {
  if (props.image) return 3;
  if (window.innerWidth > 1800) return 20;
  if (window.innerWidth > 1400) return 18;
  if (window.innerWidth > 1100) return 15;
  if (window.innerWidth > 800) return 10;
  if (window.innerWidth > 500) return 5;
  return 3;
}