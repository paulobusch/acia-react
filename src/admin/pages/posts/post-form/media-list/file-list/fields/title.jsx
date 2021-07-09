import React from 'react';
import { Field } from 'redux-form';

import Input from './../../../../../../../common/fields/input/index';

export default function Title(props) {
  const { index } = props;

  return (
    <Field type="text" placeholder="Informe a descrição"
      component={ Input } name={ `files[${index}].title` }
    />
  );
}
