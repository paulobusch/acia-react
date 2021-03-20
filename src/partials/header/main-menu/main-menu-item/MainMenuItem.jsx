import './MainMenuItem.css';

import React from 'react';

import MainMenu from '../MainMenu';
import If from './../../../../common/operators/if/If';

export default props => (
  <li className={ `main-menu-item ${props.onlymobile ? 'main-menu-item-only-mobile' : ''}` }>
    <a href={ props.href }>{ props.text }</a>
    <If test={ props.children }>
      <MainMenu className="main-menu-dropdown">
        { props.children }      
      </MainMenu>
    </If>
  </li>
);
