import './card.css';

import React from 'react';

export default function Card(props) {
  return (
    <div className={ `cred-card${ props.className ? ` ${props.className}` : '' }` }>
      <img src="images/cred/aciacred.png" alt="Acia Cred"/>
      <h3>Acesso ao Sistema: { props.title }</h3>
      <a className="action" href={ props.href }>ACESSE AQUI</a>
    </div>
  );
}
