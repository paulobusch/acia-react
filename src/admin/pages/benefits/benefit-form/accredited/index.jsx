import './accredited.css';

import React, { Component } from 'react';
import { arrayInsert, arrayRemove, arraySplice, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccreditedList from './accredited-list';
import AccreditedForm from './accredited-form';
import NewId from './../../../../../common/random/random-id';

class Accredited extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.remove = this.remove.bind(this);
    this.select = this.select.bind(this);
  }

  submit(values) {
    if (!values.id) {
      values.id = NewId();
      this.props.arrayInsert('benefit-form', 'accrediteds', 0, values);
      return;
    }
    const { accrediteds } = this.props;
    const index = accrediteds.findIndex(a => a.id === values.id);
    this.props.arrayRemove('benefit-form', 'accrediteds', index);
    this.props.arrayInsert('benefit-form', 'accrediteds', index, values);
  }

  remove(values) {
    const { accrediteds } = this.props;
    const index = accrediteds.indexOf(values);
    this.props.arrayRemove('benefit-form', 'accrediteds', index);
  }

  select(values) {
    this.props.initialize('accredited-form', values);
  }

  render() {
    const { accrediteds } = this.props;

    return (
      <fieldset className="accredited">
        <legend>Conveniados</legend>
        <AccreditedForm onSubmit={ this.submit }/>
        <hr />
        <AccreditedList 
          onRemove={ this.remove }
          onSelect={ this.select } 
          accrediteds={ accrediteds }/>
      </fieldset>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ initialize, arrayInsert, arrayRemove, arraySplice }, dispatch);
export default connect(null, mapDispatchToProps)(Accredited);
