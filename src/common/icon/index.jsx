import './icon.css';
import React from 'react';

export default function Icon(props) {
  const { icon } = props.row;
  return (<i className={ `card-icon${ icon ? ` ${icon}` : '' }` }></i>);
}
