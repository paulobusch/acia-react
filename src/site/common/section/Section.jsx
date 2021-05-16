import './Section.css';

import React from 'react';

export default function Section(props) {
  return (
    <section id={ props.id } className={ props.className }>
      { props.children }
    </section>
  );
}
