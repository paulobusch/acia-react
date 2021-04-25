import { POST_FETCHED, POST_DELETED } from './post-action-types'; 

export default function PostsReducer(state = [], action) {
  switch(action.type) {
    case POST_FETCHED: 
      return action.payload;
    case POST_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
