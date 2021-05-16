import { MEDIA_FETCHED, MEDIA_DELETED } from './media-action-types'; 

export default function MediasReducer(state = [], action) {
  switch(action.type) {
    case MEDIA_FETCHED: 
      return action.payload;
    case MEDIA_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
