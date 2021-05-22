import React, { Component } from 'react';
import Table from '../../../../../../common/table';
import Image from '../../../../../../common/image';

export default class AccreditedList extends Component {
  render() {    
    const { accrediteds, onRemove, onSelect } = this.props;

    const tableColumns = [
      { prop: 'image', label: 'Imagem', flex: 5, template: Image },
      { prop: 'title', label: 'Título', flex: 35 },
      { prop: 'phone', label: 'Telefone', flex: 30 },
      { prop: 'responsible', label: 'Responsável', flex: 30 }
    ];
    
    const tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: onRemove }
    ];

    const tablePallet = {
      text: 'black',
      fill: '#a7d2ff'
    };

    return (
      <Table pallet={ tablePallet } rowClick={ onSelect } rows={ accrediteds }
        columns={ tableColumns } actions={ tableActions }
        emptyMessage="Nenhum Conveniado Cadastrado" 
      />
    );
  }
}
