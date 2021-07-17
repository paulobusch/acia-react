import './Header.css';

import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import MainMenu from './main-menu/MainMenu';
import RightMenu from './right-menu/RightMenu';
import MainMenuItem from './main-menu/main-menu-item/MainMenuItem';
import RightMenuIcon from './right-menu/right-menu-icon/RightMenuIcon';
import RightMenuChip from './right-menu/right-menu-chip/RightMenuChip';
import Search from './search';
import { generateAddContactLink } from './../../../common/api/whatsapp';
import { WEBSITE_WHATSAPP } from './../../../consts';
import { POST_ACTION } from './../../../reducers/posts/post-type';
import { MENU_INSTITUCIONAL, MENU_PADRAO, MENU_VANTAGENS_ACIA } from './menus';

const INITIAL_STATE = {
  showMenuMobile: false,
  showSearch: false
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.toggleMenuMobile = this.toggleMenuMobile.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.search = this.search.bind(this);
  }

  toggleMenuMobile() {
    this.setState({
      ...this.state,
      showMenuMobile: !this.state.showMenuMobile
    });
  }

  search(search) {
    if (search)
      hashHistory.push(`/search?query=${encodeURIComponent(search)}`);
    this.toggleSearch();
  }

  toggleSearch() {
    this.setState({
      ...this.state,
      showSearch: !this.state.showSearch
    }, () => {
      if (this.state.showSearch) document.querySelector('input[name=search]').focus();
    });
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <header className="header">
          <div className="main">
            <a href="./">
              <img src="images/acia/logo-acia.png" alt="logo"/>
            </a>
            <i className="menu-only-mobile toggle-menu fas fa-bars" onClick={ this.toggleMenuMobile }></i>
          </div>
          <MainMenu className={ `menu ${this.state.showMenuMobile ? 'show-mobile-menu' : ''}` }>
            <MainMenuItem href="#" text="VANTAGENS ACIA">
              { MENU_VANTAGENS_ACIA.map(m => <MainMenuItem key={ m.id } onClick={ this.toggleMenuMobile } href={ m.link } text={ m.title }/>) }
            </MainMenuItem>
            <MainMenuItem href="#" text="INSTITUCIONAL">
              { MENU_INSTITUCIONAL.map(m => <MainMenuItem key={ m.id } onClick={ this.toggleMenuMobile } href={ m.link } text={ m.title }/>) }
            </MainMenuItem>
            { MENU_PADRAO.map(m => <MainMenuItem key={ m.id } onClick={ this.toggleMenuMobile } href={ m.link } text={ m.title } onlymobile={ m.onlymobile }/>) }
          </MainMenu>
          <RightMenu onlydesktop>
            { user 
              ? <RightMenuIcon onClick={ () => hashHistory.push('/admin') } icon="user-cog" title="Admin"/> 
              : <RightMenuIcon onClick={ () => hashHistory.push('/login') } icon="user" title="Logar"/> 
            }
            <RightMenuIcon onClick={ this.toggleSearch } icon="search" title="Pesquisar"/>
            <RightMenuChip onClick={ this.toggleMenuMobile } href="/#/subscribe" text="ASSOCIE-SE"/>
          </RightMenu>
        </header>
        <Search onSearch={ this.search } show={ this.state.showSearch }/>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.contact, user: state.auth.user });
export default connect(mapStateToProps)(Header);
