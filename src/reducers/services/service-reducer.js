import { SERVICE_FETCHED, SERVICE_DELETED } from './service-action-types'; 

export default function ServicesReducer(state = [], action) {
  switch(action.type) {
    case SERVICE_FETCHED: 
      return action.payload;
    case SERVICE_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
