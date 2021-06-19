import './button-prev.css';

import React from 'react';

export default function ButtonPrev(props) {
  return (
    <i className={ `fas fa-chevron-left galery-prev ${ props.disabled ? 'disabled' : '' }` } 
      onClick={ props.onClick }></i>
  );
}
