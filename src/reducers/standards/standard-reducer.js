import { STANDARD_FETCHED, STANDARD_DELETED } from './standard-action-types'; 

export default function StandardsReducer(state = [], action) {
  switch(action.type) {
    case STANDARD_FETCHED: 
      return action.payload;
    case STANDARD_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
