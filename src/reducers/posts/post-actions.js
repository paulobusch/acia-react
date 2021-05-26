import { toastr } from 'react-redux-toastr';

import ActionsStorageBase from '../actions-storage-base';
import { POST_ACTION, POST_ARTICLE, POST_NEWS } from './post-type';

class PostActions extends ActionsStorageBase {
  constructor() {
    super('posts', 'POST', 'post-form', false);
  }

  getAllByFilter(filters, completed) {
    return dispatch => {
      let filtred = this.getCollection();
      if (filters) {
        const { search, type } = filters;
        if (type)
          filtred = filtred.where('type', '==', type);
        if (search) {
          filtred = filtred.where('title', '>=', search);
          filtred = filtred.where('title', '<=', search + '~');
        }
      }
      filtred.get().then(result => {
        const mapped = result.docs.map(d => ({ id: d.id, ...d.data() }));
        mapped.map(d => d.createdAt = d.createdAt.toDate());
        const list = this.sortAsc 
          ? mapped.sort((a, b) => a.order - b.order)
          : mapped.sort((a, b) => b.order - a.order);
        const listWithImage = list.filter(item => item.image);
        const urlTasks = listWithImage.map(item => this.getFile(item.image).getDownloadURL());
        Promise.all(urlTasks).then(urlResults => {
          for (const index in listWithImage){
            listWithImage[index].imageRef = listWithImage[index].image;
            listWithImage[index].image = urlResults[index];
          }
          dispatch({ type: `${this.prefixType}_FETCHED`, payload: list });
          if (completed) completed(true, list);
        });
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao carregar Registros!`);
        if (completed) completed(false);
        throw error;
      });
    };
  }

  mapTypeToTitle(type) {
    switch (type) {
      case POST_ACTION: return 'ACIA EM AÇÃO';
      case POST_ARTICLE: return 'ARTIGOS';
      case POST_NEWS: return 'NOTÍCIAS';
      default: return 'POSTAGENS';
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
