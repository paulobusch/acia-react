import './board-list.css';
import React from 'react';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, reduxForm, submit, Field, reset } from 'redux-form';

import TabsController from './../../../../common/tabs/controller';
import Tabs from './../../../../common/tabs/index';
import TabsHeader from './../../../../common/tabs/headers/index';
import TabHeader from './../../../../common/tabs/headers/header/index';
import TabsContent from './../../../../common/tabs/contents/index';
import TabContent from './../../../../common/tabs/contents/content/index';
import PresidencyForm from './presidency/index';
import VicePresidencyList from './vice-presidency/index';
import SecretaryList from './secretary/index';
import TreasurerList from './treasurer/index';
import DirectorList from './director/index';
import Modal from '../../../../common/modal';
import TabAction from '../../../../common/tabs/headers/actions/action/index';
import TabActions from './../../../../common/tabs/headers/actions/index';
import required from './../../../../common/validators/required';
import File from './../../../../common/fields/file/index';
import Select from './../../../../common/fields/select/index';
import { removeBatch, getAllByFilter, importBatch } from './../../../../reducers/boards/board-actions';
import { BOARD_TREASURER, BOARD_VICE_PRESIDENCY } from '../../../../reducers/boards/board-type';
import { BOARD_SECRETARY, BOARD_DIRECTOR } from './../../../../reducers/boards/board-type';
import { BOARD_IMPORT_CREATE, BOARD_IMPORT_OVERWRITE } from './../../../../reducers/boards/import/board-operation';

class BoardTabs extends TabsController {
  constructor(props) {
    super(props, 'presidency');

    this.state = { ...this.state, 
      loadingRemove: false,
      loadingImport: false, 
      showConfirmRemove: false,
      showImport: false
    };
    this.confirmRemove = this.confirmRemove.bind(this);
    this.confirmImport = this.confirmImport.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeImportModal = this.closeImportModal.bind(this);
    this.removeBatch = this.removeBatch.bind(this);
    this.import = this.import.bind(this);
    this.afterRemove = this.afterRemove.bind(this);
    this.afterImport = this.afterImport.bind(this);
  }

  render() {
    return (
      <Tabs>
        <TabsHeader>
          <TabHeader onClick={ this.changeTab } target="presidency" current={ this.state.tabActive } title="Presid??ncia"/>
          <TabHeader onClick={ this.changeTab } target="vice-presidency" current={ this.state.tabActive } title="Vice Presid??ncia"/>
          <TabHeader onClick={ this.changeTab } target="secretaries" current={ this.state.tabActive } title="Secret??rios"/>
          <TabHeader onClick={ this.changeTab } target="treasurers" current={ this.state.tabActive } title="Tesoureiros"/>
          <TabHeader onClick={ this.changeTab } target="directors" current={ this.state.tabActive } title="Diretores"/>
          <TabActions>
            <TabAction onClick={ this.import } icon="upload" color="white" title="Importar"/>
            { this.state.tabActive !== 'presidency' && <TabAction onClick={ this.removeBatch } icon="trash-alt" color="white" title="Remover Todos"/> }
          </TabActions>
        </TabsHeader>
        <TabsContent>
          <TabContent id="presidency" current={ this.state.tabActive }>
            <PresidencyForm/>
          </TabContent>
          <TabContent id="vice-presidency" current={ this.state.tabActive }>
            <VicePresidencyList/>
          </TabContent>
          <TabContent id="secretaries" current={ this.state.tabActive }>
            <SecretaryList/>
          </TabContent>
          <TabContent id="treasurers" current={ this.state.tabActive }>
            <TreasurerList/>
          </TabContent>
          <TabContent id="directors" current={ this.state.tabActive }>
            <DirectorList />
          </TabContent>
        </TabsContent>
        { this.modalRemoveBatch() }
        { this.modalImport() }
      </Tabs>
    );
  }

  modalRemoveBatch() {
    const modalActions = [
      { text: 'CANCELAR', pallet: { fill: '#c8c8c8', text: 'black' }, click: this.closeModal.bind(this) },
      { text: 'REMOVER', pallet: { fill: 'red', text: 'white' }, loading: this.state.loadingRemove, click: this.confirmRemove.bind(this) }
    ];

    return ( 
      <Modal title="Confirma????o" 
        actions={ modalActions } show={ this.state.showConfirmRemove } 
        onClose={ this.closeModal }
      >
        Deseja realmente remover todos os registros da listagem?
      </Modal>
    );
  }

  modalImport() {
    const modalActions = [
      { 
        text: 'CANCELAR', 
        pallet: { fill: '#c8c8c8', text: 'black' }, 
        click: this.closeImportModal.bind(this) 
      },
      { 
        text: 'IMPORTAR',
        pallet: { fill: '#0276cd', text: 'white' }, 
        loading: this.state.loadingImport, 
        click: () => this.props.dispatch(submit('import-form'))
      }
    ];

    const operations = [BOARD_IMPORT_OVERWRITE, BOARD_IMPORT_CREATE];
    const { handleSubmit } = this.props;

    return ( 
      <Modal id="modal-import" title="Importa????o" actions={ modalActions } 
        show={ this.state.showImport } onClose={ this.closeImportModal }>
        <Form id="import-form" onSubmit={ handleSubmit(this.confirmImport) }>
          <Field name="file" label="Arquivo" button="Selecionar" placeholder="Selecione o arquivo" accept=".xlsx"
            component={ File } validate={ required } orientation={ this.importFileOrientation() }
          />
          <Field name="operation" label="Opera????o"
            component={ Select } options={ operations } validate={ required }
          />
        </Form>
      </Modal>
    );
  }

  importFileOrientation() {
    return (
      <div>
        Os dados devem ser inseridos na&nbsp;
        <a href="/documents/Diretoria - Importa????o.xlsx" target="_blank">planilha de importa????o</a>
      </div>
    );
  }

  removeBatch() {
    this.setState({ ...this.state, showConfirmRemove: true });
  }

  confirmRemove() {
    this.setState({ ...this.state, loadingRemove: true });
    this.props.removeBatch(this.props.boards, this.afterRemove);
  }
  
  afterRemove(success) {
    if (success) {
      const type = this.getType();
      this.closeModal();
      this.props.getAllByFilter({ type });
    }
  }

  closeModal() {
    this.setState({ ...this.state, loadingRemove: false, showConfirmRemove: false });
  }

  import() {
    this.setState({ ...this.state, showImport: true });
  }

  confirmImport(values) {
    this.setState({ ...this.state, loadingImport: true });
    this.props.importBatch(values, this.afterImport);
  }
  
  afterImport(success) {
    if (success) {
      const type = this.getType();
      this.closeImportModal();
      if (type) this.props.getAllByFilter({ type });
      return;
    }

    this.setState({ ...this.state, loadingImport: false });
  }

  closeImportModal() {
    this.setState({ ...this.state, loadingImport: false, showImport: false });
    this.props.dispatch(reset('import-form'));
  }

  getType() {
    if (this.state.tabActive === 'vice-presidency') return BOARD_VICE_PRESIDENCY;
    if (this.state.tabActive === 'secretaries') return BOARD_SECRETARY;
    if (this.state.tabActive === 'treasurers') return BOARD_TREASURER;
    if (this.state.tabActive === 'directors') return BOARD_DIRECTOR;
  }
}

const form = reduxForm({ form: 'import-form' })(withRouter(BoardTabs));
const mapStateToProps = state => ({ boards: state.boards });
const mapDispatchToProps = dispatch => bindActionCreators({ removeBatch, getAllByFilter, importBatch }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(form);

