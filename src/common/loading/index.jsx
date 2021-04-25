import './loading.css';

import React from 'react';

export default function Loading(props) {
  return (
    <div className={ `loading-spinner ${props.block ? 'block-center' : ''}` } style={ props.style }>
      <i  className="fas fa-spinner"></i>
    </div>
  );
}
