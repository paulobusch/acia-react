import './MainMenu.css';

import React from 'react';

export default props => (
  <ul className={ `main-menu ${props.className ? props.className : false}` }>
    { props.children }
  </ul>
);
