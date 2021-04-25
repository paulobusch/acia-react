import ActionsStorageBase from '../actions-storage-base';

class PostActions extends ActionsStorageBase {
  constructor() {
    super('posts', 'POST', 'post-form', false);
  }
}

const actionsInstance = new PostActions();

export function submitForm(){ return actionsInstance.submitForm(); }
export function getAll(completed){ return actionsInstance.getAll(completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(data, completed){ return actionsInstance.remove(data, completed); }
export function updateOrderBulk(list){ return actionsInstance.updateOrderBulk(list); }
