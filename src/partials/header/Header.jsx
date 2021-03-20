import './Header.css';

import React from 'react';

import MainMenu from './main-menu/MainMenu';
import RightMenu from './right-menu/RightMenu';
import MainMenuItem from './main-menu/main-menu-item/MainMenuItem';
import RightMenuIcon from './right-menu/right-menu-icon/RightMenuIcon';
import RightMenuChip from './right-menu/right-menu-chip/RightMenuChip';

export default props => (
  <header>
    <img src="images/acia/logo-acia.png" alt="logo"/>
    <MainMenu>
      <MainMenuItem text="VANTAGENS ACIA">
        <MainMenuItem text="ACIA CRED"/>
        <MainMenuItem text="CERTIFICADO DIGITAL"/>
        <MainMenuItem text="SERASA"/>
        <MainMenuItem text="CORTE CONCILIAÇÃO"/>
        <MainMenuItem text="LIGUE ACIA"/>
        <MainMenuItem text="CARTÃO DE VANTAGENS"/>
        <MainMenuItem text="AUDITÓRIO / SALA REUNIÃO"/>
      </MainMenuItem>
      <MainMenuItem text="INSTITUCIONAL">
        <MainMenuItem text="QUEM SOMOS"/>
        <MainMenuItem text="DIRETORIA"/>
        <MainMenuItem text="ARQUIVO HISTÓRICO"/>
      </MainMenuItem>
      <MainMenuItem text="FINANCEIRO"/>
      <MainMenuItem text="CONTATO"/>
      <MainMenuItem text="ASSOCIE-SE" onlymobile/>
    </MainMenu>
    <RightMenu onlydesktop>
      <RightMenuIcon icon="bars"/>
      <RightMenuIcon icon="search" title="Pesquisar"/>
      <RightMenuChip text="ASSOCIE-SE"/>
    </RightMenu>
  </header>
);
