import { toastr } from 'react-redux-toastr';
import { initialize } from 'redux-form';

import ActionsStorageBase from '../actions-storage-base';
import NewId from './../../common/random/random-id';
import { BENEFIT_AGREEMENT, BENEFIT_HEALTH } from './benefits-type';

class BenefitActions extends ActionsStorageBase {
  constructor() {
    super('benefits', 'BENEFIT', 'benefit-form', false);
  }

  mapTypeToTitle(type) {
    switch (type) {
      case BENEFIT_AGREEMENT: return 'GUIA DE CONVÊNIOS';
      case BENEFIT_HEALTH: return 'REDE DE CONVÊNIOS';
      default: throw Error('Not implemented');
    }
  }
  
  getAccrediteds(benefits) {
    const accrediteds = [];
    if (!benefits || benefits.length === 0) return accrediteds;
    for (const benefit of benefits) {
      for (const accredited of benefit.accrediteds) {
        accrediteds.push(accredited);
      }
    }

    return accrediteds;
  }

  getAccreditedById(id, completed){
    return () => {
      this.getCollection()
      .where('accreditedIds', 'array-contains', id)
      .get().then(result => {
        const [ beneffit ] = result.docs.map(d => ({ id: d.id, ...d.data() }));
        const accredited = beneffit.accrediteds.find(a => a.id === id);
        this.getFile(accredited.image).getDownloadURL().then(url => {
          accredited.imageRef = accredited.image;
          accredited.image = url;
          if (completed) completed(true, accredited);
        });
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao carregar Registro!`);
        if (completed) completed(false);
        throw error;
      });
    };
  }
  
  getById(id, completed) {
    return () => {
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
            if (completed) completed(true, data);
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

        dispatch({ type: `${this.prefixType}_FETCHED`, payload: list });
        if (completed) completed(true, list);
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao carregar Registros!`);
        if (completed) completed(false);
        throw error;
      });
    };
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
            item.accreditedIds = values.accrediteds.map(a => a.id);
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
      values.accreditedIds = values.accrediteds.map(a => a.id);
      for (const accredited of values.accrediteds) {
        if (accredited.image instanceof File) {
          delete accredited.imageRef;
          continue;
        } 
        accredited.image = accredited.imageRef || accredited.image;
        delete accredited.imageRef;
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
export function getById(id, completed){ return actionsInstance.getById(id, completed); }
export function getAccreditedById(id, completed){ return actionsInstance.getAccreditedById(id, completed); }
export function getAllByFilter(filters, completed){ return actionsInstance.getAllByFilter(filters, completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(data, completed){ return actionsInstance.remove(data, completed); }
export function mapTypeToTitle(type){ return actionsInstance.mapTypeToTitle(type); }
export function getAccrediteds(benefits){ return actionsInstance.getAccrediteds(benefits); }
