import { BENEFIT_FETCHED, BENEFIT_DELETED } from './benefits-action-types'; 

export default function BenefitsReducer(state = [], action) {
  switch(action.type) {
    case BENEFIT_FETCHED: 
      return action.payload;
    case BENEFIT_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
