import './video-card.css';

import React from 'react';

import { getYoutubeLink } from '../../../../common/api/youtube';

export default function VideoCard(props) {
  const { url, title } = props;
  
  return (
    <div className="video-card">
      <h4>{ title }</h4>
      <iframe className="video" src={ getYoutubeLink(url) }/>
    </div>
  );
}
