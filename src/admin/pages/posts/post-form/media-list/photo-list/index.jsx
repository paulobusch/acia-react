import React from 'react';
import { arrayInsert, arrayRemove } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NewId from './../../../../../../common/random/random-id';
import Table from './../../../../../../common/table/index';
import Image from './fields/image';
import Title from './fields/title';
import MediaListBase from './../base';

class PhotoList extends MediaListBase {
  constructor(props) {
    super(props, 'Imagens', 'photos');
  }

  list() {
    this.tableColumns = [
      { prop: 'image', label: 'Imagem', verticalAlign: 'top', flex: 50, template: Image },
      { prop: 'title', label: 'Título', verticalAlign: 'top', flex: 50, template: Title }
    ];

    const { photos } = this.props;

    if (!photos.some(s => !s.image || !s.title))
      photos.push({ id: NewId(), image: null, title: '' });

    return (
      <Table pallet={ this.tablePallet } rows={ photos }
        columns={ this.tableColumns } actions={ this.tableActions }
      />
    );
  }

  isMainMedia(photo) {
    if (this.props.photos.length === 1) return true;
    return !photo.image || !photo.title;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch);
export default connect(null, mapDispatchToProps)(PhotoList); 
