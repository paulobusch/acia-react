import './Sidenav.css';

import React from 'react';
import Menu from './menu/Menu';
import MenuItem from './menu-item/MenuItem';
import If from './../../../common/operators/condition/If';
import { ROLE_ADMIN, ROLE_EDITOR } from './../../../reducers/users/role-type';

function redirectDefault(role) {
  const currentHref = location.hash.substr(2);
  if (currentHref === 'admin') {
    const route = role === ROLE_ADMIN ? 'slides' : 'posts';
    location.href = `/#/admin/${route}`;
  }
}

export default props => {
  const { user } = props;
  if (!user) return false;

  redirectDefault(user.role);

  return (
    <div className="sidenav">
      <Menu>
        <If test={ ROLE_ADMIN === user.role }>
          <div>
            <MenuItem href="admin/slides" name="Slides" icon="images"/>
          </div>
        </If>
        <If test={ [ROLE_ADMIN, ROLE_EDITOR].indexOf(user.role) !== -1 }>
          <div>
            <MenuItem href="admin/posts" name="Posts" icon="list"/>
            <MenuItem href="admin/multimedia" name="Multimídia" icon="photo-video"/>
            <MenuItem href="admin/benefits" name="Benefícios" icon="money-check-alt"/>
            <MenuItem href="admin/services" name="Serviços" icon="layer-group"/>
            <MenuItem href="admin/standards" name="Patrocínios" icon="search-dollar"/>
          </div>
        </If>
        <If test={ ROLE_ADMIN === user.role }>
          <div>
            <MenuItem href="admin/boards" name="Diretoria" icon="building"/>
            <MenuItem href="admin/users" name="Usuários" icon="users"/>
          </div>
        </If>
      </Menu>
    </div>
  );
} 


