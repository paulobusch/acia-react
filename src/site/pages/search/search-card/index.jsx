import './search-card.css';

import React from 'react';
import { SEARCH_POST } from '../../../../reducers/search/search-type';
import { SEARCH_SERVICE } from './../../../../reducers/search/search-type';

export default function SearchCard(props) {
  return (
    <a className="search-card"  target="_blank" href={ props.link }>
      <h3 className="mobile-title">{ props.title }</h3>
      { props.type === SEARCH_POST && <div className="image" style={ { backgroundImage: `url('${props.image || '/images/acia/default.png'}')` } }></div> }
      { props.type === SEARCH_SERVICE && <i className={ `icon ${props.icon}` }></i> }
      <div className="about">
        <h3 className="desktop-title">{ props.title }</h3>
      </div>
    </a>
  );
}
