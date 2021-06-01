import { PAGE_FETCHED, PAGE_DELETED } from './page-action-types'; 

export default function PagesReducer(state = [], action) {
  switch(action.type) {
    case PAGE_FETCHED: 
      return action.payload;
    case PAGE_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
