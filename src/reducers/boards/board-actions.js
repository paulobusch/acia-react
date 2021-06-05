import { toastr } from 'react-redux-toastr';
import readXlsxFile from 'read-excel-file';

import ActionsStorageBase from '../actions-storage-base';
import firebaseInstance from '../../firebase/index';
import { BOARD_PRESIDENT } from './board-type';
import { BOARD_IMPORT_OVERWRITE } from './import/board-operation';
import { 
  BOARD_IMPORT_TYPE, BOARD_IMPORT_PRESIDENT, BOARD_IMPORT_DIRECTOR, BOARD_IMPORT_SECRETARY, 
  BOARD_IMPORT_VICE_PRESIDENCY, BOARD_IMPORT_TREASURER 
} from './import/board-sheets';

class BoardActions extends ActionsStorageBase {
  constructor() {
    super('boards', 'BOARD', 'board-form', true);
  }
  
  getPresident(completed) {
    return () => {
      this.getCollection().where('type', '==', BOARD_PRESIDENT).get()
        .then(result => {
          const [ president ] = result.docs.map(d => ({ id: d.id, ...d.data() }));
          
          if (!president || !president.image) {
            if (completed) completed(true, president);
            return;
          }

          this.getFile(president.image).getDownloadURL()
            .then(url => {
              president.imageUrl = url;
              if (completed) completed(true, president);
            })
            .catch((error) => {
              toastr.error('Erro', `Falha ao carregar imagem!`);
              if (completed) completed(false);
              throw error;
            });
        })
        .catch((error) => {
          toastr.error('Erro', `Falha ao carregar Registros!`);
          if (completed) completed(false);
          throw error;
        });
    };
  }

  importBatch(data, completed) {
    return () => {
      const { file, operation } = data;
      readXlsxFile(file, { getSheets: true }).then((sheets) => {
        const expectedSheets = Object.keys(BOARD_IMPORT_TYPE);
        if (!sheets.some(s => expectedSheets.indexOf(s.name) !== -1)) {
          toastr.error('Erro', `Arquivo inválido, use a planilha modelo para realizar a importação!`);
          return completed(false);
        }
        const importSheets = sheets.filter(s => expectedSheets.indexOf(s.name) !== -1).map(s => s.name);
        const readTasks = importSheets.map(s => readXlsxFile(file, { sheet: s }));
        Promise.all(readTasks).then(results => {
          this.getCollection().orderBy('order', 'desc').limit(1).get().then(doc => { 
            let order = doc.size > 0 ? doc.docs[0].data().order : 0;
            var batch = firebaseInstance.firestore().batch();
            let sheet = BOARD_IMPORT_PRESIDENT;
            let index = importSheets.indexOf(sheet);
            if (index !== -1) {
              const rows = results[index].slice(1);
              const type = BOARD_IMPORT_TYPE[sheet];
              const values = rows.map(r => r[1]);
              if (values.some(v => !v)) {
                toastr.error('Erro', `A planilha "${sheet}" deve ter informações válidas`);
                return completed(false);
              }
              
              const [name, yearStart, yearEnd] = values;
              this.getCollection().where('type', '==', type).get().then(result => {
                const [ president ] = result.docs.map(d => ({ id: d.id, ...d.data() }));
                const record = this.getCollection().doc(president.id);
                batch.update(record, { name, yearStart, yearEnd });
              });
            }

            const execBatchImport = sheet => {
              index = importSheets.indexOf(sheet);
              if (index !== -1) {
                const rows = results[index].slice(1);
                const type = BOARD_IMPORT_TYPE[sheet];
                if (operation === BOARD_IMPORT_OVERWRITE) {
                  this.getCollection().where('type', '==', type).get().then(result => {
                    for (const doc of result.docs) batch.delete(doc.ref);
                  });
                }
    
                const records = rows.map(row => {
                  const [name, company, office] = row;
                  if (sheet === BOARD_IMPORT_DIRECTOR)
                    return { name, company, office, createdAt: new Date() };
                  return { name, createdAt: new Date() };
                });
                for (const record of records) {
                  const newRef = this.getCollection().doc();
                  batch.set(newRef, { ...record, type, order: order++ });
                }
                if (operation === BOARD_IMPORT_OVERWRITE && records.length === 0) {
                  toastr.error('Erro', `A planilha "${sheet}" deve ter registros para importar`);
                  return false;
                }
                if (records.some(r => !r.name)) {
                  toastr.error('Erro', `A planilha "${sheet}" deve ter registros válidos para importar`);
                  return false;
                }
                if (sheet === BOARD_IMPORT_DIRECTOR && records.some(r => !r.name || !r.company || !r.office)) {
                  toastr.error('Erro', `A planilha "${sheet}" deve ter registros válidos para importar`);
                  return false;
                }
                return true;
              }
            }

            let success = execBatchImport(BOARD_IMPORT_VICE_PRESIDENCY);
            success = success && execBatchImport(BOARD_IMPORT_SECRETARY);
            success = success && execBatchImport(BOARD_IMPORT_TREASURER);
            success = success && execBatchImport(BOARD_IMPORT_DIRECTOR);
            if (!success) return completed(false);
        
            setTimeout(() => {
              batch.commit().then(() => {
                toastr.success('Importação', `Importação realizada com sucesso`);
                completed(true);
              }).catch((error) => {
                toastr.error('Erro', `Falha ao realizar importação!`);
                completed(false);
                throw error;
              });
            }, 1000);

          });
        })
        .catch(error => {
          toastr.error('Erro', `Erro ao ler arquivo, use a planilha modelo para realizar a importação!`);
          completed(false);
          throw error;
        });
      });
    };
  }

  removeBatch(list, completed) {
    return () => {
      var batch = firebaseInstance.firestore().batch();
  
      for (const item of list) {
        const record = this.getCollection().doc(item.id);
        batch.delete(record);
      }
      
      return batch.commit().then(() => {
        if (completed) completed(true);
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao remover registros!`);
        if (completed) completed(false);
        throw error;
      });
    };
  }
}

const actionsInstance = new BoardActions();

export function submitForm(){ return actionsInstance.submitForm(); }
export function getAll(completed){ return actionsInstance.getAll(completed); }
export function getPresident(completed){ return actionsInstance.getPresident(completed); }
export function getAllByFilter(filters, completed){ return actionsInstance.getAllByFilter(filters, completed); }
export function loadForm(id, completed){ return actionsInstance.loadForm(id, completed); }
export function create(data, completed){ return actionsInstance.create(data, completed); }
export function update(data, completed){ return actionsInstance.update(data, completed); }
export function remove(data, completed){ return actionsInstance.remove(data, completed); }
export function importBatch(data, completed){ return actionsInstance.importBatch(data, completed); }
export function removeBatch(type, completed){ return actionsInstance.removeBatch(type, completed); }
export function updateOrderBulk(list, completed){ return actionsInstance.updateOrderBulk(list, completed); }
