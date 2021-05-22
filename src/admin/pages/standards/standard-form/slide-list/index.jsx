import './slide-list.css';

import React, { Component } from 'react';
import Row from './../../../../../common/row/index';
import Table from './../../../../../common/table/index';

export default class SlideList extends Component {
  render() {
    return (
      <Row>
        <fieldset className="slides-container">
          <legend>Slides</legend>
          { this.list() }
        </fieldset>
      </Row>
    );
  }

  list() {
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
      />
    );
  }
}
