import ActionsStorageBase from '../actions-storage-base';

class MediaActions extends ActionsStorageBase {
  constructor() {
    super('medias', 'MEDIA', 'media-form', false);
  }
}

const actionsInstance = new MediaActions();

export function submitForm(){ return actionsInstance.submitForm(); }
export function getAllByFilter(filters, completed){ return actionsInstance.getAllByFilter(filters, completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(data, completed){ return actionsInstance.remove(data, completed); }
