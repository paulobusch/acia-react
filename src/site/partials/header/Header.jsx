import './Header.css';

import React, { Component } from 'react';

import MainMenu from './main-menu/MainMenu';
import RightMenu from './right-menu/RightMenu';
import MainMenuItem from './main-menu/main-menu-item/MainMenuItem';
import RightMenuIcon from './right-menu/right-menu-icon/RightMenuIcon';
import RightMenuChip from './right-menu/right-menu-chip/RightMenuChip';

const INITIAL_STATE = {
  showMenuMobile: false
};

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.toggleMenuMobile = this.toggleMenuMobile.bind(this);
  }

  toggleMenuMobile() {
    this.setState({
      ...this.state,
      showMenuMobile: !this.state.showMenuMobile
    });
  }

  render() {
    return (
      <header className="header">
        <div className="main">
          <a href="./">
            <img src="images/acia/logo-acia.png" alt="logo"/>
          </a>
          <i className="menu-only-mobile toggle-menu fas fa-bars" onClick={ this.toggleMenuMobile }></i>
        </div>
        <MainMenu className={ `menu ${this.state.showMenuMobile ? 'show-mobile-menu' : ''}` }>
          <MainMenuItem href="#" text="VANTAGENS ACIA">
            <MainMenuItem href="#" text="ACIA CRED"/>
            <MainMenuItem href="#" text="CERTIFICADO DIGITAL"/>
            <MainMenuItem href="#" text="SERASA"/>
            <MainMenuItem href="#" text="CORTE CONCILIAÇÃO"/>
            <MainMenuItem href="#" text="LIGUE ACIA"/>
            <MainMenuItem href="#" text="CARTÃO DE VANTAGENS"/>
            <MainMenuItem href="#" text="AUDITÓRIO / SALA REUNIÃO"/>
          </MainMenuItem>
          <MainMenuItem href="#" text="INSTITUCIONAL">
            <MainMenuItem href="#" text="QUEM SOMOS"/>
            <MainMenuItem href="#" text="DIRETORIA"/>
            <MainMenuItem href="#" text="ARQUIVO HISTÓRICO"/>
          </MainMenuItem>
          <MainMenuItem href="#" text="FINANCEIRO"/>
          <MainMenuItem href="#" text="CONTATO"/>
          <MainMenuItem href="#" text="ASSOCIE-SE" onlymobile/>
        </MainMenu>
        <RightMenu onlydesktop>
          <RightMenuIcon icon="bars"/>
          <RightMenuIcon icon="search" title="Pesquisar"/>
          <RightMenuChip href="#" text="ASSOCIE-SE"/>
        </RightMenu>
      </header>
    );
  }
}
