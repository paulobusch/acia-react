import React from 'react';

import FieldBase from './../index';

export default class Input extends FieldBase {
  field() {
    const { input } = this.props;

    return (
      <input { ...input } 
        className="form-control" 
        readOnly={ this.props.readOnly }
        type={ this.props.type } 
        onChange={ this.handleOnChange }
        autoComplete={ this.props.autoComplete }
        placeholder={ this.props.placeholder }>
      </input>
    );
  }
}
