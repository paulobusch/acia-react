import React from 'react';

import { withRouter } from 'react-router';

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
import { connect } from 'react-redux';
import { removeBatch, getAllByFilter } from './../../../../reducers/boards/board-actions';
import { BOARD_TREASURER, BOARD_VICE_PRESIDENCY } from '../../../../reducers/boards/board-type';
import { BOARD_SECRETARY, BOARD_DIRECTOR } from './../../../../reducers/boards/board-type';
import { bindActionCreators } from 'redux';

class BoardTabs extends TabsController {
  constructor(props) {
    super(props, 'presidency');

    this.state = { ...this.state, loadingRemove: false, showConfirmRemove: false };
    this.confirmRemove = this.confirmRemove.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.removeBatch = this.removeBatch.bind(this);
    this.afterRemove = this.afterRemove.bind(this);
  }

  render() {
    return (
      <Tabs>
        <TabsHeader>
          <TabHeader onClick={ this.changeTab } target="presidency" current={ this.state.tabActive } title="Presidência"/>
          <TabHeader onClick={ this.changeTab } target="vice-presidency" current={ this.state.tabActive } title="Vice Presidência"/>
          <TabHeader onClick={ this.changeTab } target="secretaries" current={ this.state.tabActive } title="Secretários"/>
          <TabHeader onClick={ this.changeTab } target="treasurers" current={ this.state.tabActive } title="Tesoureiros"/>
          <TabHeader onClick={ this.changeTab } target="directors" current={ this.state.tabActive } title="Diretores"/>
          <TabActions>
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
      </Tabs>
    );
  }

  modalRemoveBatch() {
    const modalActions = [
      { text: 'CANCELAR', pallet: { fill: '#c8c8c8', text: 'black' }, click: this.closeModal.bind(this) },
      { text: 'REMOVER', pallet: { fill: 'red', text: 'white' }, loading: this.state.loadingRemove, click: this.confirmRemove.bind(this) }
    ];

    return ( 
      <Modal title="Confirmação" 
        actions={ modalActions } show={ this.state.showConfirmRemove } 
        onClose={ this.closeModal }
      >
        Deseja realmente remover todos os registros da listagem?
      </Modal>
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
    this.setState({ ...this.state, showConfirmRemove: false });
  }

  getType() {
    if (this.state.tabActive === 'vice-presidency') return BOARD_VICE_PRESIDENCY;
    if (this.state.tabActive === 'secretaries') return BOARD_SECRETARY;
    if (this.state.tabActive === 'treasurers') return BOARD_TREASURER;
    if (this.state.tabActive === 'directors') return BOARD_DIRECTOR;
    throw new Error ('Not implemented');
  }
}

const tabs = withRouter(BoardTabs);
const mapStateToProps = state => ({ boards: state.boards });
const mapDispatchToProps = dispatch => bindActionCreators({ removeBatch, getAllByFilter }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(tabs);
