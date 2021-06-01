import { initialize, submit } from 'redux-form';
import { toastr } from 'react-redux-toastr';

import firebaseInstance from './../firebase/index';
import 'firebase/firestore';

export default class ActionsBase {
  constructor(
    collectionName,
    prefixType,
    formId
  ) {
    this.collectionName = collectionName;
    this.prefixType = prefixType;
    this.formId = formId;
  }
  
  getById(id, completed) {
    return () => {
      this.getCollection().doc(id).get().then(doc => {
        const data = { id: doc.id, ...doc.data() };
        if (completed) completed(true, data);
      })
      .catch((error) => { 
        toastr.error('Erro', `Falha ao carregar registro!`); 
        if (completed) completed(false);
        throw error;
      });
    };
  }

  getAll(completed) {
    return dispatch => {
      this.getCollection().get().then(result => {
        const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => b.createdAt - a.createdAt);
        list.map(d => d.createdAt = d.createdAt.toDate());
        dispatch({ type: `${this.prefixType}_FETCHED`, payload: list });
        if (completed) completed(true);
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao carregar registros!`);
        if (completed) completed(false);
        throw error;
      });
    };
  }
  
  loadForm(id, completed) {
    return dispatch => {
      this.getCollection().doc(id).get().then(doc => {
        dispatch(initialize(this.formId, { id: doc.id, ...doc.data() }));
        if (completed) completed(true);
      })
      .catch((error) => { 
        toastr.error('Erro', `Falha ao carregar registro!`); 
        if (completed) completed(false);
        throw error;
      });
    };
  }
  
  submitForm() {
    return submit(this.formId);
  }
  
  create(values, completed) {
    return dispatch => {
        values.createdAt = new Date();
        this.getCollection()
          .add(values)
          .then(() => {
            toastr.success('Sucesso', `Registro cadastrado com sucesso!`);
            dispatch(this.getAll());
            if (completed) completed(true);
          })
          .catch((error) => {
            toastr.error('Erro', `Falha ao criar registro!`);
            if (completed) completed(false);
            throw error;
          });
    };
  }
  
  update(values, completed) {
    return dispatch => {
      this.getCollection()
        .doc(values.id)
        .update(values)
        .then(() => {
          toastr.success('Sucesso', `Registro atualizado com sucesso!`);
          dispatch(this.getAll());
          if (completed) completed(true);
        })
        .catch((error) => {
          toastr.error('Erro', `Falha ao atualizar registro!`);
          if (completed) completed(false);
          throw error;
        });
    };
  }
  
  remove(values, completed) {
    return dispatch => {
      this.getCollection().doc(values.id).delete().then(() => {
        dispatch({ type: `${this.prefixType}_DELETED`, payload: values.id });
        if (completed) completed(true);
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao remover registro!`);
        if (completed) completed(false);
        throw error;
      });
    };
  }

  getCollection() {
    return firebaseInstance.firestore().collection(this.collectionName);
  }
}
