import { toastr } from 'react-redux-toastr';

import ActionsStorageBase from '../actions-storage-base';
import { BOARD_PRESIDENCY } from './board-type';

class BoardActions extends ActionsStorageBase {
  constructor() {
    super('boards', 'BOARD', 'board-form', true);
  }
  
  getPresident(completed) {
    return () => {
      this.getCollection().where('type', '==', BOARD_PRESIDENCY).get()
        .then(result => {
          const [ president ] = result.docs.map(d => ({ id: d.id, ...d.data() }));
          
          if (!president.image) {
            if (completed) completed(true, president);
            return;
          }

          this.getFile(president.image).getDownloadURL()
            .then(url => {
              president.imageUrl = url;
              if (completed) completed(true, president);
            })
            .catch((error) => {
              toastr.error('Erro', `Falha ao carregar imagem!`);
              if (completed) completed(false);
              throw error;
            });
        })
        .catch((error) => {
          toastr.error('Erro', `Falha ao carregar Registros!`);
          if (completed) completed(false);
          throw error;
        });
    };
  }
}

const actionsInstance = new BoardActions();

export function submitForm(){ return actionsInstance.submitForm(); }
export function getAll(completed){ return actionsInstance.getAll(completed); }
export function getPresident(completed){ return actionsInstance.getPresident(completed); }
export function getAllByFilter(filters, completed){ return actionsInstance.getAllByFilter(filters, completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(data, completed){ return actionsInstance.remove(data, completed); }
export function updateOrderBulk(list, completed){ return actionsInstance.updateOrderBulk(list, completed); }
