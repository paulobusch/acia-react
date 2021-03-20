import './RightMenu.css';

import React from 'react';

export default props => (
  <ul className={ `right-menu ${props.onlydesktop ? 'right-menu-only-desktop' : ''}` }>
    { props.children }
  </ul>
);
