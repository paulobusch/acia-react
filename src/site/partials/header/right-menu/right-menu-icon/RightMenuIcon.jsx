import './RightMenuIcon.css';

import React from 'react';

export default props => (
  <i onClick={ props.onClick } className={ `right-menu-icon fas fa-${props.icon}` } title={ props.title ? props.title : '' }></i>
);
