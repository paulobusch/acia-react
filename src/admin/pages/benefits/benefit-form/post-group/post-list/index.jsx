import React, { Component } from 'react';
import Table from '../../../../../../common/table';
import Image from './../../../../../../common/fields/image/index';

export default class PostList extends Component {
  render() {    
    const tableColumns = [
      { prop: 'image', label: 'Imagem', flex: 5, template: Image },
      { prop: 'title', label: 'Título', flex: 95 }
    ];
    
    const tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove }
    ];

    const tablePallet = {
      text: 'black',
      fill: '#a7d2ff'
    };

    return (
      <Table pallet={ tablePallet } rows={ this.props.posts }
        columns={ tableColumns } actions={ tableActions }
        emptyMessage="Nenhum Post Cadastrado" 
      />
    );
  }
}
