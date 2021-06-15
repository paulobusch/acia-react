import React from 'react';
import { Field } from 'redux-form';

import Input from '../../../../../../common/fields/input/index';

export default function Link(props) {
  const { index } = props;

  return (
    <Field type="text" placeholder="Informe o link"
      component={ Input } name={ `slides[${index}].link` }
    />
  );
}
