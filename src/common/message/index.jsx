import './message.css';

import React from 'react';

export default props => {
  const message = props.message || 'Nenhum registro encontrado';

  return (
    <div className="table-message">
      <i className="fas fa-comment"></i>
      { message }
    </div>
  );
}
