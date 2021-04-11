import './MainMenuItem.css';

import React, { Component } from 'react';

import MainMenu from '../MainMenu';
import If from './../../../../../common/operators/condition/If';

const INITIAL_STATE = {
  showMobileDropdown: false
};

export default class MainMenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.toggleMenuDropdown = this.toggleMenuDropdown.bind(this);
  }

  toggleMenuDropdown() {
    this.setState({
      ...this.state,
      showMobileDropdown: !this.state.showMobileDropdown
    });
  }

  render() {
    return (
      <li className={ `main-menu-item ${this.props.onlymobile ? 'main-menu-item-only-mobile' : ''}` }>
        <a href={ this.props.href } onClick={ this.props.children ? this.toggleMenuDropdown : false }>
          { this.props.text }
          <If test={ this.props.children }>
            <i className="icon-dropdown fas fa-sort-down"></i>
          </If>
        </a>
        <If test={ this.props.children }>
          <MainMenu className={ `main-menu-dropdown ${this.state.showMobileDropdown ? 'show-mobile-dropdown' : ''}` }>
            { this.props.children }      
          </MainMenu>
        </If>
      </li>
    );    
  }
}
