import ActionsBase from './../actions-base';

import { toastr } from 'react-redux-toastr';
import firebaseInstance from './../../firebase/index';
import 'firebase/auth';

class UserActions extends ActionsBase {
  constructor() {
    super('users', 'USER', 'user-form');
  }

  create(values, completed) {
    return dispatch => {
      firebaseInstance.auth().createUserWithEmailAndPassword(values.email, values.password).then(result => {
        values.createdAt = new Date();
        values.accountId = result.user.uid;
        delete values.password;
  
        this.getCollection().add(values)
          .then(() => {
            toastr.success('Sucesso', `Usuário cadastrado com sucesso!`);
            dispatch(this.getAll());
            if (completed) completed(true);
          })
          .catch((error) => {
            toastr.error('Erro', `Falha ao criar ${type}!`);
            if (completed) completed(false);
            throw error;
          });
      })
      .catch(error => {
        switch(error.code) {
          case 'auth/email-already-in-use':
            toastr.error('Erro', `Este email já está sendo usado por outra conta!`);
            break;
          default:
            toastr.error('Erro', `Falha ao criar ${type}!`);
            break;
        }
        if (completed) completed(false);
      });
    };
  }
}

const actionsInstance = new UserActions();

export function submitForm(){ return actionsInstance.submitForm(); }
export function getAll(completed){ return actionsInstance.getAll(completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(data, completed){ return actionsInstance.remove(data, completed); }
