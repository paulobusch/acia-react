import './button-next.css';

import React from 'react';

export default function ButtonNext(props) {
  return (
    <i className={ `fas fa-chevron-right galery-next ${ props.disabled ? 'disabled' : '' }` } 
      onClick={ props.onClick }></i>
  );
}
