import './fixed-button.css';

import React from 'react';

export default function FixedButton(props) {
  const { icon, onClick, color, title, image, href } = props;

  if (image) 
    return (
      <div className="fixed-button-image">
        <a href={ href } target="_blank">
          <img src={ image }/>
        </a>
      </div>
    );

  return (
    <i className={ `fixed-button fas fa-${icon}` } 
      title={ title } onClick={ onClick } 
      style={ { backgroundColor: color } }
    >
    </i>
  );  
}
