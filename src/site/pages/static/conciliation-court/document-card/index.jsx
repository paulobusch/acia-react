import './document-card.css';

import React from 'react';

export default function DocumentCard(props) {
  const { title, description, url } = props;
  
  return (
    <div className="document-card">
      <div className="description">{ description }</div>
      <a className="action" href={ url } target="_blank">{ title }</a>
    </div>
  );
}
