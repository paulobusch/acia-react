import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

import SlidesReducer from './slides/slide-reducer';
import PostsReducer from './posts/post-reducer';
import authReducer from './auth/auth-reducer';
import MediasReducer from './medias/media-reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  toastr: toastrReducer,
  slides: SlidesReducer,
  posts: PostsReducer,
  medias: MediasReducer
});

export default rootReducer;
