import ActionsStorageBase from './../actions-storage-base';

class ServiceActions extends ActionsStorageBase {
  constructor() {
    super('services', 'SERVICE', 'service-form', true);
  }
}

const actionsInstance = new ServiceActions();

export function submitForm(){ return actionsInstance.submitForm(); }
export function getAll(completed){ return actionsInstance.getAll(completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(data, completed){ return actionsInstance.remove(data, completed); }
export function updateOrderBulk(list){ return actionsInstance.updateOrderBulk(list); }
