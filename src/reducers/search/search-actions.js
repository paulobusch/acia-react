import { toastr } from 'react-redux-toastr';
import { extractTextFromHtml } from '../../common/api/html';
import { MENU_INSTITUCIONAL, MENU_PADRAO, MENU_VANTAGENS_ACIA } from '../../site/partials/header/menus';

import ActionsStorageBase from '../actions-storage-base';
import { SEARCH_SORT_DATE, SEARCH_SORT_TITLE } from './search-sort';
import { SEARCH_BENEFIT, SEARCH_CONVENANT, SEARCH_MENU, SEARCH_POST, SEARCH_SERVICE } from './search-type';

class SearchActions extends ActionsStorageBase {
  constructor() {
    super();
  }

  getAll(search, sort, completed) {
    return () => {
      if (!search) 
        return completed(true, null);

      Promise.all([
        this.getCollection('posts').get(),
        this.getCollection('services').get(),
        this.getCollection('benefits').get()
      ]).then(results => {
        const [ postsResult, servicesResult, benefitsResult ] = results;
        const documents = [...postsResult.docs, ...servicesResult.docs, ...benefitsResult.docs];
        let mapped = documents
          .map(d => ({ id: d.id, ...d.data() }));
        
        for (const document of benefitsResult.docs) {
          const benefit = { id: document.id, ...document.data() };
          if (!benefit.accrediteds) continue;
          for (const accredited of benefit.accrediteds)
            mapped.push(accredited);
        }

        const menus = [...MENU_VANTAGENS_ACIA, ...MENU_INSTITUCIONAL, ...MENU_PADRAO]
          .map(m => ({ ...m, title: m.parent ? `${m.parent} > ${m.title}` : m.title }));
        mapped.push(...menus);

        mapped = mapped
          .map(d => {
            function getType() {
              if (postsResult.docs.some(p => p.id === d.id)) return SEARCH_POST;
              if (servicesResult.docs.some(p => p.id === d.id)) return SEARCH_SERVICE;
              if (benefitsResult.docs.some(p => p.id === d.id)) return SEARCH_CONVENANT;
              if (menus.some(p => p.id === d.id)) return SEARCH_MENU;
              return SEARCH_BENEFIT;
            }
            const type = getType();
            const description = extractTextFromHtml(d.description || d.text); 
            return ({ 
              id: d.id, 
              createdAt: d.createdAt ? d.createdAt.toDate() : new Date(),
              title: d.title,
              image: d.image,
              icon: d.icon,
              description: description,
              search: d.title + description + (d.responsible || ''),
              link: this.getLink(type, d),
              type: type
            })
          });

        const list = this.applySort(this.applyFilter(mapped, search), sort);
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

  applyFilter(records, search) {
    let result = records;
    if (search) 
      result = result.filter(a => a.search.toLowerCase().search(search.toLowerCase()) !== -1);
    else
      result = null;
    return result;
  }

  applySort(records, sort) {
    if (!sort || !records) return records;
    if (sort === SEARCH_SORT_DATE) return records.sort((a, b) => a.createdAt - b.createdAt);
    if (sort === SEARCH_SORT_TITLE) return records.sort((a, b) => (a.title || '').localeCompare(b.title));
    return records;
  }

  getLink(type, document) {
    if (type === SEARCH_POST) return `/#/posts/view/${document.id}`;
    if (type === SEARCH_CONVENANT) return `/#/benefits/${document.id}`;
    if (type === SEARCH_BENEFIT) return `/#/benefits/view/${document.id}`;
    if (type === SEARCH_SERVICE) return document.link;
    if (type === SEARCH_MENU) return document.link;
  }
}

const actionsInstance = new SearchActions();
export function getAll(search, sort, completed){ return actionsInstance.getAll(search, sort, completed); }
