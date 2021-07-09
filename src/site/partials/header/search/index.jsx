import './search.css';

import React, { Component } from 'react';
import { Field, Form, reduxForm } from 'redux-form';

import SubmitButton from './../../../../common/buttons/submit/index';
import Input from './../../../../common/fields/input/index';

class Search extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.onSearch(values.search);
    setTimeout(() => this.props.initialize({ search: '' }), 200);
  }

  render() {
    const { handleSubmit, show } = this.props;

    return (
      <Form id="search-form" onSubmit={ handleSubmit(this.submit) } className={ show ? 'open' : '' }>
        <Field name="search" type="text" placeholder="Termo de busca"
          component={ Input }
        />
        <SubmitButton text="BUSCAR" fill/>
      </Form>
    );
  }
}

export default reduxForm({ form: 'search-form' })(Search);
