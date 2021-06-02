import './overlay-slide.css';

import React from 'react';
import { SLIDE_OVERLAY_LINK, SLIDE_OVERLAY_BUTTON } from './../../../../reducers/slides/slide-type';

export default function OverlaySlide(props) {
  const { overlay } = props;
  if (overlay.type === SLIDE_OVERLAY_LINK) return getLink(overlay);
  if (overlay.type === SLIDE_OVERLAY_BUTTON) return getButton(overlay);
  throw new Error('Method not implemented!');
}

function getLink(props) {
  return (
    <div className="template-slide-about-bg action-link" 
      onClick={ () => { window.location.replace(props.url); debugger;} }>
      <div className="template-slide-about">
        { getTitle(props) }
      </div>
    </div>
  );
}

function getButton(props) {
  return (
    <div className="template-slide-about-bg">
      <div className="template-slide-about">
        { getTitle(props) }
        <a href={ props.url }>SAIBA MAIS</a>
      </div>
    </div>
  );
}

function getTitle(props) {
  return (
    <div className="title">
      <h2>{ props.title }</h2>
      <h1>{ props.subtitle }</h1>
    </div>
  );
}
