import './list-base.css';

import React, { Component } from 'react';

import Card from '../card';
import CardContent from '../card/card-content';
import CardHeader from '../card/card-header';

import Table from '../../../common/table';
import Modal from '../../../common/modal';
import FixedButton from '../../../common/buttons/fixed';
import { getRouteWithoutParams } from './../../../common/router/index';

const INITIAL_STATE = { loading: true, loadingRemove: false, selected: null, showConfirmRemove: false };

export default class ListBase extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.closeModal = this.closeModal.bind(this);
    this.afterRemove = this.afterRemove.bind(this);
    this.afterLoad = this.afterLoad.bind(this);
    this.goEdit = this.goEdit.bind(this);
    this.goNew = this.goNew.bind(this);
    this.movedRow = this.movedRow.bind(this);
    this.afterUpdateOrder = this.afterUpdateOrder.bind(this);
    this.useDrag = !!this.props.updateOrderBulk;
  }

  componentWillMount() {
    this.toggleLoading(true);
    this.props.getAll(this.afterLoad);
  }

  afterLoad(success) {
    if (success) this.toggleLoading(false);
  }

  confirmRemove() {
    this.toggleLoadingRemove(true);
    this.props.remove(this.state.selected, this.afterRemove);
  }
  
  afterRemove(success) {
    this.toggleLoadingRemove(false);
    if (success) {
      this.setState({ 
        ...this.state, 
        selected: null,
        showConfirmRemove: false 
      });
    }
  }

  toggleLoading(loading) {
    this.setState({ 
      ...this.state, 
      loading: loading
    });
  }

  toggleLoadingRemove(loading) {
    this.setState({ 
      ...this.state, 
      loadingRemove: loading
    });
  }

  closeModal() {
    this.setState({ ...this.state, showConfirmRemove: false });
  }

  remove(slide) {
    this.setState({ ...this.state, 
      selected: slide,
      showConfirmRemove: true
    });
  }

  goEdit(id) {
    const { router } = this.props;
    const url = `${getRouteWithoutParams(router)}/edit/${id}`;
    router.push(url);
  }

  goNew() {
    const { router } = this.props;
    const url = `${getRouteWithoutParams(router)}/new`;
    router.push(url);
  }
  
  movedRow(sourceIndex, targetIndex) { 
    if (sourceIndex === targetIndex) return;
    const list = this.getList();
    let rowsToUpdate = [];

    const sourceRow = list[sourceIndex];
    const targetRow = list[targetIndex];

    const increment = this.sort === 'desc' ? +1 : -1;
    sourceRow.order = targetRow.order;
    if (sourceIndex < targetIndex) {
      rowsToUpdate = list.slice(sourceIndex + 1, targetIndex + 1);
      for (const row of rowsToUpdate)
        row.order += increment;
    } else {
      rowsToUpdate = list.slice(targetIndex, sourceIndex);
      for (const row of rowsToUpdate)
        row.order -= increment;
    }
      
    rowsToUpdate.push(sourceRow);
    this.props.updateOrderBulk(rowsToUpdate, this.afterUpdateOrder);
  }

  afterUpdateOrder(success) { 
    this.props.getAll(this.afterLoad);
  }

  configure() { }
  
  getList() { }

  render() {    
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove.bind(this) }
    ];

    this.configure();
    return (
      <div className={ `list ${this.className ? this.className : ''}` }>
        { this.title ? this.card() : this.table() }
        { this.modal() }
        <FixedButton title="Cadastrar" onClick={ this.goNew } icon="plus" color="var(--primary)"/>
      </div>
    );    
  }

  modal() {
    const modalActions = [
      { text: 'CANCELAR', pallet: { fill: '#c8c8c8', text: 'black' }, click: this.closeModal.bind(this) },
      { text: 'REMOVER', pallet: { fill: 'red', text: 'white' }, loading: this.state.loadingRemove, click: this.confirmRemove.bind(this) }
    ];

    return ( 
      <Modal title="Confirmação" 
        actions={ modalActions } show={ this.state.showConfirmRemove } 
        onClose={ this.closeModal }
      >
        Deseja realmente remover o registro?
      </Modal>
    );
  }

  table() {
    const list = this.getList();
    
    const tablePallet = {
      text: 'black',
      fill: '#a7d2ff'
    };

    return (
      <Table rowClick={ row => this.goEdit(row.id) } loading={ this.state.loading }
        drag={ this.useDrag } movedRow={ this.movedRow } pallet={ tablePallet } rows={ list }
        columns={ this.tableColumns } actions={ this.tableActions } 
      />
    );
  }

  card() {
    return (
      <Card>
        <CardHeader>
          <h2>{ this.title }</h2>
        </CardHeader>
        <CardContent padding="0">
          { this.table() }
        </CardContent>
      </Card>
    );
  }
}
