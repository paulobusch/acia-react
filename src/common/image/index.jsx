import './image.css';
import React from 'react';

export default props => {
  const { height } = props;
  const { image } = props.row;
  return (
    <div className="card-image" style={ { 
      height: height ? height : '50px', 
      backgroundImage: `url('${image || '/images/acia/default.png'}')` 
    } }></div>
  );
}
