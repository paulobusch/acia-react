import './Header.css';

import React, { Component } from 'react';

import MainMenu from './main-menu/MainMenu';
import RightMenu from './right-menu/RightMenu';
import MainMenuItem from './main-menu/main-menu-item/MainMenuItem';
import RightMenuIcon from './right-menu/right-menu-icon/RightMenuIcon';
import RightMenuChip from './right-menu/right-menu-chip/RightMenuChip';
import { generateAddContactLink } from './../../../common/api/whatsapp';
import { WEBSITE_PHONE } from './../../../consts';

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
            <MainMenuItem onClick={ this.toggleMenuMobile } href="/#/acia-cred" text="ACIA CRED"/>
            <MainMenuItem onClick={ this.toggleMenuMobile } href="/#/digital-certificate" text="CERTIFICADO DIGITAL"/>
            <MainMenuItem onClick={ this.toggleMenuMobile } href="/#/serasa" text="SERASA"/>
            <MainMenuItem onClick={ this.toggleMenuMobile } href="/#/conciliation-court" text="CORTE CONCILIAÇÃO"/>
            <MainMenuItem onClick={ this.toggleMenuMobile } href="/#/cell-network" text="LIGUE ACIA"/>
            <MainMenuItem onClick={ this.toggleMenuMobile } href="/#/advantages-card" text="CARTÃO DE VANTAGENS"/>
            <MainMenuItem onClick={ this.toggleMenuMobile } href="https://www.aciaanapolis.com.br/site/sala-de-reunioes/" text="AUDITÓRIO / SALA REUNIÃO"/>
            <MainMenuItem onClick={ this.toggleMenuMobile } href="https://www.aciaanapolis.com.br/site/empresas/guia-de-convenios" text="REDE DE CONVÊNIOS"/>
            <MainMenuItem onClick={ this.toggleMenuMobile } href="https://www.aciaanapolis.com.br/site/empresas/guia-de-saude" text="GUIA SAÚDE"/>
            <MainMenuItem onClick={ this.toggleMenuMobile } href="/#/meeting-room" text="SALA DE REUNIÕES"/>
            <MainMenuItem onClick={ this.toggleMenuMobile } href="/#/multimedia" text="MULTIMÍDIA"/>
          </MainMenuItem>
          <MainMenuItem href="#" text="INSTITUCIONAL">
            <MainMenuItem onClick={ this.toggleMenuMobile } href="/#/about" text="QUEM SOMOS"/>
            <MainMenuItem onClick={ this.toggleMenuMobile } href="/#/boards" text="DIRETORIA"/>
            <MainMenuItem onClick={ this.toggleMenuMobile } href="http://arquivohistoricoacia.com.br/site/" text="ARQUIVO HISTÓRICO"/>
          </MainMenuItem>
          <MainMenuItem onClick={ this.toggleMenuMobile } href="https://www.sicoob.com.br/web/sicoob/segunda-via-boleto" text="FINANCEIRO"/>
          <MainMenuItem onClick={ this.toggleMenuMobile } href={ generateAddContactLink(WEBSITE_PHONE) } text="CONTATO"/>
          <MainMenuItem onClick={ this.toggleMenuMobile } href="/#/subscribe" text="ASSOCIE-SE" onlymobile/>
        </MainMenu>
        <RightMenu onlydesktop>
          <RightMenuChip onClick={ this.toggleMenuMobile } href="/#/subscribe" text="ASSOCIE-SE"/>
        </RightMenu>
      </header>
    );
  }
}
