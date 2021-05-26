import './field-base.css';

import React, { Component } from 'react';
import { copyToClipboard } from './../api/clipboard';

export default class FieldBase extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  field() { }

  getStyle() {
    const { flex, px } = this.props;
    if (px) return { witdth: `${px}px` };
    if (flex) return { flexBasis: `${flex}%` };
    return { }; 
  }

  errors() {
    const { meta: { touched, error }, readOnly } = this.props;
    if (!touched || !error || readOnly) return false;
    return <div className="error-message">{ error }</div>;
  }

  orientation() {
    const { orientation } = this.props;
    if (!orientation) return false;
    return <div className="orientation-message">{ orientation }</div>;
  }

  render() {
    const { label, name, className } = this.props;
    const errors = this.errors();

    return (
      <div 
        className={ `form-field ${errors ? 'has-error' : ''} ${className || ''}` }
        style={ this.getStyle() }
      >
        { label ? <label htmlFor={ name }>{ label }</label> : false }
        { this.fieldWithIcon() }
        { this.orientation() }
        { errors }
      </div>
    );
  }

  fieldWithIcon() {
    const { icon } = this.props;
    const field = this.field();
    const actions = this.actions();
    if (!icon && actions.length === 0) return field;
    return (
      <div className={ `field-icon-right ${ icon ? 'field-icon' : '' }` }>
        { icon && <i className={ `icon fas fa-${icon}` }></i> }
        { field }
        { actions }
      </div>
    );
  }

  actions() {
    const { copyClipboard, action } = this.props;
    const actions = [];
    if (copyClipboard)
      actions.push(<i key="copy" className="icon icon-right fas fa-copy" onClick={ this.copyContent.bind(this) }></i>);
    if (action)
      actions.push(<i key={ action.icon } className={ `icon icon-right ${action.icon}` } onClick={ action.onClick }></i>);

    return actions;
  }

  copyContent() {
    copyToClipboard(this.props.input.value);
    this.inputRef.select();
  }

  handleOnChange(ev) {
    const { input, onchange } = this.props;
    input.onChange(ev);
    if (onchange) onchange(ev);
  }
}
