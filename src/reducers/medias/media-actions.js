import ActionsStorageBase from '../actions-storage-base';
import { MEDIA_PHOTO, MEDIA_VIDEO } from './media-type';

class MediaActions extends ActionsStorageBase {
  constructor() {
    super('medias', 'MEDIA', 'media-form', false);
  }

  mapTypeToTitle(type) {
    switch (type) {
      case MEDIA_PHOTO: return 'FOTOS';
      case MEDIA_VIDEO: return 'VÍDEOS';
      default: throw Error('Not implemented');
    }
  }
}

const actionsInstance = new MediaActions();

export function submitForm(){ return actionsInstance.submitForm(); }
export function getAll(completed){ return actionsInstance.getAll(completed); }
export function getAllByFilter(filters, completed){ return actionsInstance.getAllByFilter(filters, completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(data, completed){ return actionsInstance.remove(data, completed); }
export function mapTypeToTitle(type){ return actionsInstance.mapTypeToTitle(type); }