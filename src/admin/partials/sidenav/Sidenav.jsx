import './Sidenav.css';

import React from 'react';
import Menu from './menu/Menu';
import MenuItem from './menu-item/MenuItem';

function redirectDefault() {
  const currentHref = location.hash.substr(2);
  if (currentHref === 'admin')
    location.href = '/#/admin/slides';
}

export default props => {
  redirectDefault();

  return (
    <div className="sidenav">
      <Menu>
        <MenuItem href="admin/slides" name="Slides" icon="images"/>
        <MenuItem href="admin/posts" name="Posts" icon="list"/>
        <MenuItem href="admin/multimedia" name="Multimídia" icon="photo-video"/>
        <MenuItem href="admin/benefits" name="Benefícios" icon="money-check-alt"/>
        <MenuItem href="admin/services" name="Serviços" icon="layer-group"/>
        <MenuItem href="admin/standards" name="Patrocínios" icon="search-dollar"/>
        <MenuItem href="admin/users" name="Usuários" icon="users"/>
        <MenuItem href="admin/boards" name="Diretoria" icon="building"/>
      </Menu>
    </div>
  );
} 


