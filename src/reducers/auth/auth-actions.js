import { toastr } from 'react-redux-toastr';

import { hashHistory } from 'react-router';
import firebaseInstance from '../../firebase/index';
import { 
  LOGIN, LOGOUT, LOADING, 
  FORGOT_PASSWORD_EMAIL_LOADED,
  FORGOT_PASSWORD_EMAIL_LOADING,
  FORGOT_PASSWORD_EMAIL_SENDED 
} from './auth-action-types';
import firebase from 'firebase/app';
import 'firebase/auth';

export function listenSessionChanged() {
  return dispatch => {
    dispatch({ type: LOADING });
    firebaseInstance.auth().onAuthStateChanged(user => {
      const currentHref = location.hash.substr(2);
        if (user) {
          const userData = { id: user.uid, email: user.email };
          dispatch({ type: LOGIN, payload: userData }); 
          if (currentHref != 'admin/slides') hashHistory.push('/admin/slides');
        } else {
          dispatch({ type: LOGOUT });
          if (currentHref != 'login') hashHistory.push('/login');
        }        
      }
    );
  }
}

export function login(values, completed) {
  return () => {
    firebaseInstance.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebaseInstance.auth().signInWithEmailAndPassword(values.email, values.password).then(() => {
      if (completed) completed(true);
    })
    .catch(e => {
      toastr.error('Erro', 'Usuário/Senha inválidos');
      if (completed) completed(false);
    });
  }
}

export function logout(completed) {
  return () => {
    firebaseInstance.auth().signOut().then(() => {
      if (completed) completed(true);
    })
    .catch(e => {
      toastr.error('Erro', 'Falha ao realizar logout');
      if (completed) completed(false);
    });
  }
}

export function forgotPassword(values) {
  return dispatch => {
    dispatch({ type: FORGOT_PASSWORD_EMAIL_LOADING });

    firebaseInstance.auth().sendPasswordResetEmail(values.email).then(() => {
      toastr.success('Sucesso', `Email enviado com sucesso, verifique sua caixa de entrada!`);
      dispatch({ type: FORGOT_PASSWORD_EMAIL_SENDED });
      dispatch({ type: FORGOT_PASSWORD_EMAIL_LOADED });
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao enviar email de redifinição!`);
      dispatch({ type: FORGOT_PASSWORD_EMAIL_LOADED });
      throw error;
    });
  }
}

export function changePasswordWithResetCode(code, password, completed) {
  return dispatch => {
    firebaseInstance.auth().confirmPasswordReset(code, password)
      .then(() => {
        toastr.success('Sucesso', `Senha alterada com sucesso!`);
        dispatch(logout());
        completed(true);
      })
      .catch(error => {
        toastr.error('Erro', `Falha ao alterar senha!`);
        completed(false);
        throw error;
      });
  }
}

export function validateResetCode(code, completed) {
  return () => {
    firebaseInstance.auth().verifyPasswordResetCode(code).then(email => {
      completed({ success: true, email });
    })
    .catch(error => {
      completed({ success: false });
      throw error;
    });
  }
}
