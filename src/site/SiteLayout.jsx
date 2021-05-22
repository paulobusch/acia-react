import React from 'react';

import Header from './partials/header/Header';
import Footer from './partials/footer/Footer';

export default function SiteLayout(props){
  window.addEventListener('popstate', () => window.scrollTo({ top: 0 }));

  return (
    <div>
      <Header />
      { props.children }
      <Footer />
    </div>
  );
}
