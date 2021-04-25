import './overlay-slide.css';

import React from 'react';

export default function OverlaySlide(props) {
  return (
    <div className="template-slide-about-bg">
      <div className="template-slide-about">
        <div className="title">
          <h2>{ props.title }</h2>
          <h1>{ props.subtitle }</h1>
        </div>
        <a href={ props.actionUrl }>SAIBA MAIS</a>
      </div>
    </div>
  );
}
