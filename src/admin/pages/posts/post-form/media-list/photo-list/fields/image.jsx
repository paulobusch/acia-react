import React from 'react';
import { Field } from 'redux-form';

import File from './../../../../../../../common/fields/file/index';

export default function Image(props) {
  const { index } = props;

  return (
    <Field className="image-field" button="Selecionar" placeholder="Selecione uma imagem"
      component={ File } name={ `photos[${index}].image` } 
    />
  );
}
