import ActionsBase from '../actions-base';

class LawSuitActions extends ActionsBase {
  constructor() {
    super('lawSuits', 'LAW_SUIT', 'law-suit-form');
  }
}

const actionsInstance = new LawSuitActions();

export function submitForm(){ return actionsInstance.submitForm(); }
export function getAll(completed){ return actionsInstance.getAll(completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(id, completed){ return actionsInstance.remove(id, completed); }
