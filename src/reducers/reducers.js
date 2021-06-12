import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

import SlidesReducer from './slides/slide-reducer';
import PostsReducer from './posts/post-reducer';
import authReducer from './auth/auth-reducer';
import MediasReducer from './medias/media-reducer';
import BenefitsReducer from './benefits/benefits-reducer';
import ServicesReducer from './services/service-reducer';
import StandardsReducer from './standards/standard-reducer';
import BoardsReducer from './boards/board-reducer';
import UsersReducer from './users/user-reducer';
import PagesReducer from './pages/page-reducer';
import SearchReducer from './search/search-reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  toastr: toastrReducer,
  slides: SlidesReducer,
  posts: PostsReducer,
  medias: MediasReducer,
  benefits: BenefitsReducer,
  services: ServicesReducer,
  standards: StandardsReducer,
  boards: BoardsReducer,
  users: UsersReducer,
  pages: PagesReducer,
  search: SearchReducer
});

export default rootReducer;
