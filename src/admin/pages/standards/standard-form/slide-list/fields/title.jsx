import React from 'react';
import { Field } from 'redux-form';

import Input from './../../../../../../common/fields/input/index';

export default function Title(props) {
  const { index, row } = props;

  return (
    <Field type="text" placeholder="Informe o título"
      component={ Input } name={ `slides[${index}].title` }
    />
  );
}
