import { initialize, submit } from 'redux-form';
import { toastr } from 'react-redux-toastr';

import firebaseInstance from '../firebase/index';
import NewId from './../common/random/random-id';
import 'firebase/firestore';
import 'firebase/storage';

export default class ActionsStorageBase {
  constructor(
    collectionName,
    prefixType,
    formId,
    sortAsc
  ) {
    this.collectionName = collectionName;
    this.prefixType = prefixType;
    this.formId = formId;
    this.sortAsc = sortAsc;
  }
  
  getById(id, completed) {
    return () => {
      this.getCollection().doc(id).get().then(doc => {
        const data = { id: doc.id, ...doc.data() };
        if (data.image) {
          this.getFile(data.image).getDownloadURL().then(url => {
            data.imageRef = data.image;
            data.image = url;
            if (completed) completed(true, data);
          })
          return;
        }
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
          if (completed) completed(true);
        });
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao carregar Registros!`);
        if (completed) completed(false);
        throw error;
      });
    };
  }
  
  getAllByFilter(filters, completed) {
    return dispatch => {
      let filtred = this.getCollection();

      for (const prop in filters)
        filtred = filtred.where(prop, '==', filters[prop]);

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
          if (completed) completed(true);
        });
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
        dispatch(initialize(this.formId, data));
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
      this.getCollection().orderBy('order', 'desc').limit(1).get().then(doc => { 
        const maxOrder = doc.size > 0 ? doc.docs[0].data().order : 0;
        const save = path => {
          if (path) values.image = path;
          if (values.imageUrl) delete values.imageUrl;
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
        }
        
        if (values.image instanceof File) {
          const name = `${NewId()}${this.getExtension(values.image.name)}`;
          const path = this.getPath(name);
          this.getFile(path).put(values.image)
            .then(() => save(path))
            .catch((error) => {
              toastr.error('Erro', `Falha ao enviar imagem!`);
              if (completed) completed(false);
              throw error;
            });
          return;
        }

        save(values.image);
      });
    };
  }
  
  update(values, completed) {
    return dispatch => {
      const save = path => {
        if (path) values.image = path;
        if (values.imageUrl) delete values.imageUrl;
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
      }
      
      if (values.image instanceof File) {
        const name = `${NewId()}${this.getExtension(values.image.name)}`;
        const path = this.getPath(name);
        this.getFile(path).put(values.image)
          .then(() => save(path))
          .catch((error) => {
            toastr.error('Erro', `Falha ao enviar imagem!`);
            if (completed) completed(false);
            throw error;
          });
        return;
      }

      save(values.image);
    };
  }
  
  remove(values, completed) {
    return dispatch => {
      this.getCollection().doc(values.id).delete().then(doc => {
        dispatch({ type: `${this.prefixType}_DELETED`, payload: values.id });
        if (completed) completed(true);
        if (values.imageRef) {
          this.getFile(values.imageRef)
            .delete().then()
            .catch(() => {
              toastr.error('Erro', `Falha ao remover imagem!`);
              if (completed) completed(false);
            });
        }
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao remover registro!`);
        if (completed) completed(false);
        throw error;
      });
    };
  }

  updateOrderBulk(list, completed) {
    return dispatch => {
      var batch = firebaseInstance.firestore().batch();
  
      for (const item of list) {
        const record = this.getCollection().doc(item.id);
        batch.update(record, { order: item.order });
      }
      
      return batch.commit().then(() => {
        toastr.success('Sucesso', `Ordem atualizada com sucesso!`);
        if (completed) completed(true);
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao atualizar ordem!`);
        if (completed) completed(false);
        throw error;
      });
    };
  }

  getCollection() {
    return firebaseInstance.firestore().collection(this.collectionName);
  }

  getPath(fileName) {
    return `images/${this.collectionName}/${fileName}`;
  }

  getFile(path) {
    return firebaseInstance.storage().ref(path);
  }

  getExtension(fileName) {
    if (!fileName || fileName.search('.') === -1) return '';
    return fileName.substr(fileName.indexOf('.'));
  }
}
