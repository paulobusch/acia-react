import React from 'react';
import { Field } from 'redux-form';

import File from './../../../../../../../common/fields/file/index';

export default function FileInput(props) {
  const { index } = props;

  return (
    <Field button="Selecionar" placeholder="Selecione um arquivo"
      component={ File } accept="application/pdf" name={ `files[${index}].file` } 
    />
  );
}
