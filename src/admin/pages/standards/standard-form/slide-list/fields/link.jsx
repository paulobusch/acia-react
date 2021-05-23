import React from 'react';
import { Field } from 'redux-form';

import Input from '../../../../../../common/fields/input/index';
import url from './../../../../../../common/validators/url/url';

export default function Link(props) {
  const { index, row } = props;

  return (
    <Field type="text" placeholder="Informe o link"
      component={ Input } name={ `slides[${index}].link` }
      validate={ url }
    />
  );
}
