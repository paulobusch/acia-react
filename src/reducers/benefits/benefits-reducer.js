import { BENEFITS_FETCHED, BENEFITS_DELETED } from './benefits-action-types'; 

export default function BenefitsReducer(state = [], action) {
  switch(action.type) {
    case BENEFITS_FETCHED: 
      return action.payload;
    case BENEFITS_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
