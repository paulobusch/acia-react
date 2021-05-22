import './submit-button.css';

import React from 'react';

export default function SubmitButton(props) {
  return (
    <div className="submit-button submit-container" >
      { props.loading &&
        <div className="container-spinner">
          <i  className="spinner fas fa-spinner"></i>
        </div>
      }
      <button type="submit" disabled={ props.disabled } onClick={ props.onClick } style={ 
        { 
          width: props.fill ? '100%' : 'auto',
          padding: props.padding ? props.padding : '',
          backgroundColor: props.backgroundColor || '',
          color: props.color || ''
        } 
      }>{ props.text }</button>
    </div>
  );
}
