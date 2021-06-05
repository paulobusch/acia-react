import './file.css';

import FieldBase from './../index';

import React from 'react';

const INITIAL_STATE = {
  file: null,
  name: ''
};

export default class File extends FieldBase {
  constructor(props) {
    super(props);

    this.fileInput = null;
    this.state = INITIAL_STATE;
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const [file] = e.target.files;
    if (file) this.setState({ ...this.state, name: file.name });
    this.handleOnChange(file);
  }

  field() {
    const { button, accept, placeholder, className, input } = this.props;

    return (
      <div className={ `form-control file-input ${className}` } >
        <button type="button" onClick={ () => this.fileInput.click() }>{ button || 'Selecionar arquivo' }</button>
        <label>{ this.state.name || placeholder || 'Selecione um arquivo...' }</label>
        <input type="file" 
          name={ input.name }
          style={ { display: 'none' } }
          accept={ accept }
          onChange={ this.onChange }
          ref={ el => this.fileInput = el }
        />
      </div>
    );
  }
}
