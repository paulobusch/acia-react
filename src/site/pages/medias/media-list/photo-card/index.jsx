import './photo-card.css';

import React from 'react';

export default function PhotoCard(props) {
  const { image, title } = props;
  return (
    <div className="photo-card" title={ title } style={ { backgroundImage: `url(${image})` } }></div>
  );
}
