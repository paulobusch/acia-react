import React from 'react';
import { Field } from 'redux-form';

import File from '../../../../../../common/fields/file/index';

export default function Slide(props) {
  const { index } = props;

  return (
    <Field className="image-field" button="Selecionar" placeholder="Selecione um slide"
      component={ File } name={ `slides[${index}].image` } 
    />
  );
}
