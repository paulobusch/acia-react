import { toastr } from 'react-redux-toastr';
import { extractTextFromHtml } from '../../common/api/html';

import ActionsStorageBase from '../actions-storage-base';
import { SEARCH_CONVENANT, SEARCH_POST, SEARCH_SERVICE } from './search-type';

class SearchActions extends ActionsStorageBase {
  constructor() {
    super();
  }

  getAll(completed) {
    return () => {
      Promise.all([
        this.getCollection('posts').get(),
        this.getCollection('services').get(),
        this.getCollection('benefits').get()
      ]).then(results => {
        const [ postsResult, servicesResult, benefitsResult ] = results;
        const documents = [...postsResult.docs, ...servicesResult.docs, ...benefitsResult.docs];
        const mapped = documents
          .map(d => ({ id: d.id, ...d.data() }))
          .map(d => {
            function getType() {
              if (postsResult.docs.some(p => p.id === d.id)) return SEARCH_POST;
              if (servicesResult.docs.some(p => p.id === d.id)) return SEARCH_SERVICE;
              if (benefitsResult.docs.some(p => p.id === d.id)) return SEARCH_CONVENANT;
            }
            const type = getType();
            return ({ 
              id: d.id, 
              createdAt: d.createdAt.toDate(),
              order: d.order,
              title: d.title,
              image: d.image,
              icon: d.icon,
              description: extractTextFromHtml(d.description || d.text),
              link: this.getLink(type, d),
              type: type
            })
          });
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

  getLink(type, document) {
    if (type === SEARCH_POST) return `/#/posts/view/${document.id}`;
    if (type === SEARCH_CONVENANT) return `/#/benefits/${document.id}`;
    if (type === SEARCH_SERVICE) return document.link;
  }
}

const actionsInstance = new SearchActions();
export function getAll(completed){ return actionsInstance.getAll(completed); }
