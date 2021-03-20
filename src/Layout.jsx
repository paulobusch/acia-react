import React from 'react';
import Header from './partials/header/Header';

export default props => (
  <div>
    <Header />
    { props.children }
  </div>
)
