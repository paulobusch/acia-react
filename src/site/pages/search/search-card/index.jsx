import './search-card.css';

import React from 'react';

import Resume from '../../../../common/resume';
import { SEARCH_POST, SEARCH_SERVICE, SEARCH_CONVENANT, SEARCH_BENEFIT, SEARCH_MENU } from '../../../../reducers/search/search-type';

export default function SearchCard(props) {
  return (
    <a className="search-card" href={ props.link }>
      <h3 className="mobile-title">{ props.title }</h3>
      { [SEARCH_POST, SEARCH_BENEFIT].includes(props.type) && <div className="image" style={ { backgroundImage: `url('${props.image || '/images/acia/default.png'}')` } }></div> }
      { props.type === SEARCH_SERVICE && <i className={ `icon ${props.icon}` }></i> }
      { props.type === SEARCH_CONVENANT && <i className="icon fas fa-list"></i> }
      { props.type === SEARCH_MENU && <i className="icon fas fa-link"></i> }
      <div className="about">
        <h3 className="desktop-title">{ props.title }</h3>
        { props.description && <Resume text={ props.description } lines={ 4 }/> }
      </div>
    </a>
  );
}
