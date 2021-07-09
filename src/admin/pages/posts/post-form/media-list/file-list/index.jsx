import React from 'react';
import { arrayInsert, arrayRemove } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NewId from './../../../../../../common/random/random-id';
import Table from './../../../../../../common/table/index';
import File from './fields/file';
import Title from './fields/title';
import MediaListBase from './../base';

class FileList extends MediaListBase {
  constructor(props) {
    super(props, 'Anexos', 'files');
  }

  list() {
    this.tableColumns = [
      { prop: 'file', label: 'Arquivo', verticalAlign: 'top', flex: 50, template: File },
      { prop: 'title', label: 'Descrição', verticalAlign: 'top', flex: 50, template: Title }
    ];

    const { files } = this.props;

    if (!files.some(s => !s.file || !s.title))
      files.push({ id: NewId(), file: null, title: '' });

    return (
      <Table pallet={ this.tablePallet } rows={ files }
        columns={ this.tableColumns } actions={ this.tableActions }
      />
    );
  }

  isMainMedia(photo) {
    if (this.props.files.length === 1) return true;
    return !photo.file || !photo.title;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch);
export default connect(null, mapDispatchToProps)(FileList); 
