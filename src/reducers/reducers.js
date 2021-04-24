import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

import LawSuitReducer from './law-suits/law-suit-action-reducer';

const rootReducer = combineReducers({
  form: formReducer,
  toastr: toastrReducer,
  lawSuits: LawSuitReducer
});

export default rootReducer;
