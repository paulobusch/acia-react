import { LAW_SUIT_FETCHED, LAW_SUIT_DELETED } from './law-suit-action-types';

export default function LawSuitReducer(state = [], action) {
  switch(action.type) {
    case LAW_SUIT_FETCHED:
      return action.payload;
    case LAW_SUIT_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
