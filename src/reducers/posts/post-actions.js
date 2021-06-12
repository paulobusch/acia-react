import { toastr } from 'react-redux-toastr';

import ActionsStorageBase from '../actions-storage-base';
import { POST_ACTION, POST_ARTICLE } from './post-type';
import NewId from './../../common/random/random-id';

class PostActions extends ActionsStorageBase {
  constructor() {
    super('posts', 'POST', 'post-form', false);
  }
  
  getById(id, completed) {
    return () => {
      this.getCollection().doc(id).get().then(doc => {      
        const data = { id: doc.id, ...doc.data() };
        const tasksGetUrl = (data.photos || []).map(item => this.getFile(item.image).getDownloadURL());
        if (data.image) tasksGetUrl.push(this.getFile(data.image).getDownloadURL());
        Promise.all(tasksGetUrl)
          .then(urlResults => {
            for (const photo of (data.photos || [])){
              const index = data.photos.indexOf(photo);
              photo.imageRef = photo.image;
              photo.image = urlResults[index];
            }
            if (data.image) {
              data.imageRef = data.image;
              data.image = urlResults[urlResults.length - 1];
            }
            if (completed) completed(true, data);
          })
          .catch((error) => {
            toastr.error('Erro', `Falha ao obter imagems!`);
            if (completed) completed(false, data);
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
  
  create(data, completed) {
    return () => {
      const values = this.mapPost(data);
      this.getCollection().orderBy('order', 'desc').limit(1).get().then(doc => { 
        const maxOrder = doc.size > 0 ? doc.docs[0].data().order : 0;
        const tasksUpload = values.photos.map(photo => {
          const file = photo.image;
          const name = `${NewId()}${this.getExtension(file.name)}`;
          photo.image = this.getPath(name);
          return this.getFile(photo.image).put(file);
        });
        if (values.image instanceof File) {
          const file = values.image;
          const name = `${NewId()}${this.getExtension(file.name)}`;
          values.image = this.getPath(name);
          tasksUpload.push(this.getFile(values.image).put(file));
        }
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
  
  update(data, completed) {
    return () => {
      const values = this.mapPost(data);
      for (const photo of values.photos) {
        if (photo.image instanceof File) {
          delete photo.imageRef;
          continue;
        } 
        photo.image = photo.imageRef || photo.image;
        delete photo.imageRef;
      }

      const tasksUpload = values.photos
        .filter(a => a.image instanceof File)
        .map(photo => {
          const file = photo.image;
          const name = `${NewId()}${this.getExtension(file.name)}`;
          photo.image = this.getPath(name);
          return this.getFile(photo.image).put(file);
        });

      if (values.image instanceof File) {
        const file = values.image;
        const name = `${NewId()}${this.getExtension(file.name)}`;
        values.image = this.getPath(name);
        tasksUpload.push(this.getFile(values.image).put(file));
      }
      
      if (values.imageUrl) delete values.imageUrl;

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

  mapTypeToTitle(type) {
    switch (type) {
      case POST_ACTION: return 'ACIA EM AÇÃO';
      case POST_ARTICLE: return 'ARTIGOS';
      default: return 'POSTAGENS';
    }
  }

  mapPost(data) {
    const post = Object.assign(new Object(), data);
    post.photos = post.photos || [];
    post.videos = post.videos || [];
    post.photos = post.photos.filter(r => r.image || r.title);
    post.videos = post.videos.filter(r => r.link || r.title);
    return post;
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
