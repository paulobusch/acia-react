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
            <MainMenuItem href="/#/acia-cred" text="ACIA CRED"/>
            <MainMenuItem href="/#/digital-certificate" text="CERTIFICADO DIGITAL"/>
            <MainMenuItem href="/#/serasa" text="SERASA"/>
            <MainMenuItem href="/#/conciliation-court" text="CORTE CONCILIAÇÃO"/>
            <MainMenuItem href="https://www.aciaanapolis.com.br/site/rede-celular/" text="LIGUE ACIA"/>
            <MainMenuItem href="https://www.aciaanapolis.com.br/site/cartao-de-vantagens-acia/" text="CARTÃO DE VANTAGENS"/>
            <MainMenuItem href="https://www.aciaanapolis.com.br/site/sala-de-reunioes/" text="AUDITÓRIO / SALA REUNIÃO"/>
            <MainMenuItem href="https://www.aciaanapolis.com.br/site/empresas/guia-de-convenios" text="REDE DE CONVÊNIOS"/>
            <MainMenuItem href="https://www.aciaanapolis.com.br/site/empresas/guia-de-saude" text="GUIA SAÚDE"/>
            <MainMenuItem href="/#/multimedia" text="MULTIMÍDIA"/>
          </MainMenuItem>
          <MainMenuItem href="#" text="INSTITUCIONAL">
            <MainMenuItem href="/#/about" text="QUEM SOMOS"/>
            <MainMenuItem href="https://www.aciaanapolis.com.br/site/diretoria/" text="DIRETORIA"/>
            <MainMenuItem href="http://arquivohistoricoacia.com.br/site/" text="ARQUIVO HISTÓRICO"/>
          </MainMenuItem>
          <MainMenuItem href="https://www.sicoob.com.br/web/sicoob/segunda-via-boleto" text="FINANCEIRO"/>
          <MainMenuItem href={ generateAddContactLink(WEBSITE_PHONE) } text="CONTATO"/>
          <MainMenuItem href="/#/subscribe" text="ASSOCIE-SE" onlymobile/>
        </MainMenu>
        <RightMenu onlydesktop>
          <RightMenuIcon icon="search" title="Pesquisar"/>
          <RightMenuChip href="/#/subscribe" text="ASSOCIE-SE"/>
        </RightMenu>
      </header>
    );
  }
}
