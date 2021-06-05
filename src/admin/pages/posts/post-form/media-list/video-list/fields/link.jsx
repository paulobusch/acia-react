import React from 'react';
import { Field } from 'redux-form';

import Input from './../../../../../../../common/fields/input/index';
import urlYoutube from './../../../../../../../common/validators/url/url-youtube';
import url from './../../../../../../../common/validators/url/url';

export default function LinkYoutube(props) {
  const { index } = props;

  return (
    <Field type="text" placeholder="Informe o link"
      component={ Input } name={ `videos[${index}].link` }
      validate={ [url, urlYoutube] }
    />
  );
}
