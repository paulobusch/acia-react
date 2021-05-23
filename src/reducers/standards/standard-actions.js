import ActionsStorageBase from '../actions-storage-base';

class StandardActions extends ActionsStorageBase {
  constructor() {
    super('standards', 'STANDARD', 'standard-form', true);
  }

  getAll(completed) {
    return dispatch => {
      this.getCollection().get().then(result => {
        const mapped = result.docs.map(d => ({ id: d.id, ...d.data() }));
        mapped.map(d => d.createdAt = d.createdAt.toDate());
        const list = this.sortAsc 
          ? mapped.sort((a, b) => a.order - b.order)
          : mapped.sort((a, b) => b.order - a.order);

        const slides = this.getSlides(list);
        const tasksGetUrl = slides.map(item => this.getFile(item.image).getDownloadURL());
        Promise.all(tasksGetUrl).then(urlResults => {
          for (const slide of slides){
            const index = slides.indexOf(accredited);
            slide.imageRef = slide.image;
            slide.image = urlResults[index];
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
  
  loadForm(id, completed) {
    return dispatch => {
      this.getCollection().doc(id).get().then(doc => {
        const data = { id: doc.id, ...doc.data() };
        const tasksGetUrl = data.slides.map(item => this.getFile(item.image).getDownloadURL());
        Promise.all(tasksGetUrl)
          .then(urlResults => {
            for (const slide of data.slides){
              const index = data.slides.indexOf(slide);
              slide.imageRef = slide.image;
              slide.image = urlResults[index];
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
        const tasksUpload = values.slides.map(slide => {
          const file = slide.image;
          const name = `${NewId()}${this.getExtension(file.name)}`;
          slide.image = this.getPath(name);
          return this.getFile(slide.image).put(file);
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
      for (const slide of values.slides) {
        if (slide.image instanceof File) {
          delete slide.imageRef;
          continue;
        } 
        slided.image = slide.imageRef || slide.image;
        delete slide.imageRef;
      }

      const tasksUpload = values.slides
        .filter(a => a.image instanceof File)
        .map(slide => {
          const file = slide.image;
          const name = `${NewId()}${this.getExtension(file.name)}`;
          slide.image = this.getPath(name);
          return this.getFile(slide.image).put(file);
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
  
  getSlides(standards) {
    const slides = [];
    if (!standards || standards.length === 0) return slides;
    for (const standard of standards) {
      for (const slide of standard.slides) {
        slides.push(slide);
      }
    }

    return slides;
  }
}

const actionsInstance = new StandardActions();

export function submitForm(){ return actionsInstance.submitForm(); }
export function getAll(completed){ return actionsInstance.getAll(completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(data, completed){ return actionsInstance.remove(data, completed); }
export function updateOrderBulk(list){ return actionsInstance.updateOrderBulk(list); }
