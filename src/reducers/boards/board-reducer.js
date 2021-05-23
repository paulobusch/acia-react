import { BOARD_FETCHED, BOARD_DELETED } from './board-action-types'; 

export default function BoardsReducer(state = [], action) {
  switch(action.type) {
    case BOARD_FETCHED: 
      return action.payload;
    case BOARD_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
