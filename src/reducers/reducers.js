import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

import LawSuitReducer from './law-suits/law-suit-reducer';
import SlidesReducer from './slides/slide-reducer';
import PostsReducer from './posts/post-reducer';
import authReducer from './auth/auth-reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  toastr: toastrReducer,
  lawSuits: LawSuitReducer,
  slides: SlidesReducer,
  posts: PostsReducer
});

export default rootReducer;
