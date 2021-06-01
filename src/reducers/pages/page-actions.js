import ActionsBase from '../actions-base';

class PageActions extends ActionsBase {
  constructor() {
    super('pages', 'PAGE', 'page-form');
  }
}

const actionsInstance = new PageActions();

export function submitForm(){ return actionsInstance.submitForm(); }
export function getAll(completed){ return actionsInstance.getAll(completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(data, completed){ return actionsInstance.remove(data, completed); }
