import './search.css';

import React, { Component } from 'react';
import { Field, Form, reduxForm } from 'redux-form';

import SubmitButton from './../../../../common/buttons/submit/index';
import Input from './../../../../common/fields/input/index';
import required from './../../../../common/validators/required';

class Search extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.onSearch(values.search);
  }

  render() {
    const { handleSubmit, show } = this.props;

    return (
      <Form id="search-form" onSubmit={ handleSubmit(this.submit) } className={ show ? 'open' : '' }>
        <Field name="search" type="text" placeholder="Termo de busca"
          component={ Input } validate={ required }
        />
        <SubmitButton text="BUSCAR" fill/>
      </Form>
    );
  }
}

export default reduxForm({ form: 'search-form' })(Search);
