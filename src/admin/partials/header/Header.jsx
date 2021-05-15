import './Header.css';

import React from 'react';

import { WEBSITE_NAME } from '../../../consts';
import { hashHistory } from 'react-router';

export default function Header(props) {
  return (
    <header className="header-admin">
      <div className="title">
        <i className="fas fa-user-cog"></i>
        <h2>Painel Administrativo - { WEBSITE_NAME || 'Website' }</h2>
      </div>
      <div className="right">
        <i id="icon-logout" title="Sair" className="fas fa-sign-out-alt" onClick={ () => hashHistory.push('/logout') }></i>
      </div>
    </header>
  );
}
