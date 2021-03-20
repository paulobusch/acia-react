import './RightMenuChip.css';

import React from 'react';

export default props => (
  <a href={ props.href } className="right-menu-chip">
    { props.text }
  </a>
);
