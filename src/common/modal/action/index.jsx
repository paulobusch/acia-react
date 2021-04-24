import './action.css';

import React from 'react';

function getStyle(props) {
  const { pallet } = props;
  if (!pallet) return { };
  return {  
    backgroundColor: pallet.fill,
    color: pallet.text,
  };
}

export default props => (
  <div className="action-button action-container" >
    { props.loading &&
      <div className="container-spinner">
        <i  className="spinner fas fa-spinner"></i>
      </div>
    }

    <button type="button" className="modal-action"
      onClick={ props.onClick } 
      style={ getStyle(props) }
    >
      { props.text }
    </button>
  </div>
);
