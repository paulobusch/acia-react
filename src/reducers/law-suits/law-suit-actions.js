import { LAW_SUIT_FETCHED } from './law-suit-action-types';
import { toastr } from 'react-redux-toastr';

import ActionsBase from '../actions-base';

class LawSuitActions extends ActionsBase {
  constructor() {
    super('lawSuits', 'LAW_SUIT', 'law-suit-form');
  }
  
  getById(id, completed) {
    return () => {
      this.getCollection().doc(id).get().then(doc => {
        const data = { id: doc.id, ...doc.data() };
        if (completed) completed(true, data);
      })
      .catch((error) => { 
        toastr.error('Erro', `Falha ao carregar registro!`); 
        if (completed) completed(false);
        throw error;
      });
    };
  }

  search(term, completed) {
    return dispatch => {
      this.getCollection()
        .orderBy('code')
        .startAt(term)
        .get().then(result => {
        const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => b.createdAt - a.createdAt);
        dispatch({ type: LAW_SUIT_FETCHED, payload: list });
        if (completed) completed(true);
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao carregar registros!`);
        if (completed) completed(false);
        throw error;
      });
    };
  }
}

const actionsInstance = new LawSuitActions();

export function submitForm(){ return actionsInstance.submitForm(); }
export function getAll(completed){ return actionsInstance.getAll(completed); }
export function getById(id, completed){ return actionsInstance.getById(id, completed); }
export function search(term, completed){ return actionsInstance.search(term, completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(id, completed){ return actionsInstance.remove(id, completed); }
