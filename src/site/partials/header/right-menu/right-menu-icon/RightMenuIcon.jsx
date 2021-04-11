import './RightMenuIcon.css';

import React from 'react';

export default props => (
  <i className={ `right-menu-icon fas fa-${props.icon}` } title={ props.title ? props.title : '' }></i>
);
