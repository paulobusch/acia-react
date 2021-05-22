import { toastr } from 'react-redux-toastr';
import { initialize } from 'redux-form';

import ActionsStorageBase from '../actions-storage-base';
import NewId from './../../common/random/random-id';

class BenefitActions extends ActionsStorageBase {
  constructor() {
    super('benefits', 'BENEFIT', 'benefit-form', false);
  }
  
  loadForm(id, completed) {
    return dispatch => {
      this.getCollection().doc(id).get().then(doc => {
        const data = { id: doc.id, ...doc.data() };
        const tasksGetUrl = data.accrediteds.map(item => this.getFile(item.image).getDownloadURL());
        Promise.all(tasksGetUrl)
          .then(urlResults => {
            for (const accredited of data.accrediteds){
              const index = data.accrediteds.indexOf(accredited);
              accredited.imageRef = accredited.image;
              accredited.image = urlResults[index];
            }
            dispatch(initialize(this.formId, data));
            if (completed) completed(true);
          })
          .catch((error) => {
            toastr.error('Erro', `Falha ao obter imagems!`);
            if (completed) completed(false);
            throw error;
          });        
      })
      .catch((error) => { 
        toastr.error('Erro', `Falha ao carregar registro!`); 
        if (completed) completed(false);
        throw error;
      });
    };
  }
  
  create(values, completed) {
    return () => {
      this.getCollection().orderBy('order', 'desc').limit(1).get().then(doc => { 
        const maxOrder = doc.size > 0 ? doc.docs[0].data().order : 0;
        const tasksUpload = values.accrediteds.map(accredited => {
          const file = accredited.image;
          const name = `${NewId()}${this.getExtension(file.name)}`;
          accredited.image = this.getPath(name);
          return this.getFile(accredited.image).put(file);
        });
        Promise.all(tasksUpload)
          .then(() => {
            const item = Object.assign(new Object(), values);
            item.createdAt = new Date();
            item.order = maxOrder + 1;
            this.getCollection()
              .add(item)
              .then(() => {
                toastr.success('Sucesso', `Registro cadastrado com sucesso!`);
                if (completed) completed(true);
              })
              .catch((error) => {
                toastr.error('Erro', `Falha ao criar registro!`);
                if (completed) completed(false);
                throw error;
              });
          })
          .catch((error) => {
            toastr.error('Erro', `Falha ao enviar imagem!`);
            if (completed) completed(false);
            throw error;
          });
      });
    };
  }
  
  update(values, completed) {
    return () => {
      for (const accredited of values.accrediteds) {
        if (accredited.image instanceof File) continue;
        accredited.image = accredited.imageRef || accredited.image
      }

      const tasksUpload = values.accrediteds
        .filter(a => a.image instanceof File)
        .map(accredited => {
          const file = accredited.image;
          const name = `${NewId()}${this.getExtension(file.name)}`;
          accredited.image = this.getPath(name);
          return this.getFile(accredited.image).put(file);
        });

      Promise.all(tasksUpload)
        .then(() => {
          this.getCollection()
            .doc(values.id)
            .update(values)
            .then(() => {
              toastr.success('Sucesso', `Registro atualizado com sucesso!`);
              if (completed) completed(true);
            })
            .catch((error) => {
              toastr.error('Erro', `Falha ao atualizar registro!`);
              if (completed) completed(false);
              throw error;
            });
        })
        .catch((error) => {
          toastr.error('Erro', `Falha ao enviar imagem!`);
          if (completed) completed(false);
          throw error;
        });
    };
  }
}

const actionsInstance = new BenefitActions();

export function submitForm(){ return actionsInstance.submitForm(); }
export function getAll(completed){ return actionsInstance.getAll(completed); }
export function getAllByFilter(filters, completed){ return actionsInstance.getAllByFilter(filters, completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(data, completed){ return actionsInstance.remove(data, completed); }
