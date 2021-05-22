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
        <MenuItem href="admin/standards" name="Patrocínios" icon="search-dollar"/>
        <MenuItem href="admin/products" name="Produtos" icon="cubes"/>
        <MenuItem href="admin/directors" name="Diretoria" icon="far fa-user"/>
        <MenuItem href="admin/covenants" name="Convênios" icon="far fa-building"/>
      </Menu>
    </div>
  );
} 


