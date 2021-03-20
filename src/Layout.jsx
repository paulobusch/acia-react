import React from 'react';

import Header from './partials/header/Header';
import Footer from './partials/footer/Footer';

export default props => (
  <div>
    <Header />
    { props.children }
    <Footer />
  </div>
)
