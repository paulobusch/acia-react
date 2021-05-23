import './Slide.css';

import React from 'react';

export default props => (
  <li className={ `slide ${ props.active ? 'active' : '' }` }>
    <div title={ props.title } 
      className={ `image${props.link ? ' link' : ''}` }
      onClick={ () => window.open(props.link, '_blank') }
      style={
        { 
          backgroundImage: `url('${ props.image }')`,
          backgroundPosition: props.position || 'top center'
        }
      }>
    </div>
    { props.template ? props.template : false }
  </li>
);
