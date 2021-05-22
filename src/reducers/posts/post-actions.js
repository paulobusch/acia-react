import ActionsStorageBase from '../actions-storage-base';
import { POST_ACTION, POST_ARTICLE, POST_NEWS } from './post-type';

class PostActions extends ActionsStorageBase {
  constructor() {
    super('posts', 'POST', 'post-form', false);
  }

  mapTypeToTitle(type) {
    switch (type) {
      case POST_ACTION: return 'ACIA EM AÇÃO';
      case POST_ARTICLE: return 'ARTIGOS';
      case POST_NEWS: return 'NOTÍCIAS';
      default: throw Error('Not implemented');
    }
  }
}

const actionsInstance = new PostActions();

export function submitForm(){ return actionsInstance.submitForm(); }
export function getAll(completed){ return actionsInstance.getAll(completed); }
export function getById(id, completed){ return actionsInstance.getById(id, completed); }
export function getAllByFilter(filters, completed){ return actionsInstance.getAllByFilter(filters, completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(data, completed){ return actionsInstance.remove(data, completed); }
export function updateOrderBulk(list, completed){ return actionsInstance.updateOrderBulk(list, completed); }
export function mapTypeToTitle(type){ return actionsInstance.mapTypeToTitle(type); }
