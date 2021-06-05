import React from 'react';
import { arrayInsert, arrayRemove } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NewId from './../../../../../../common/random/random-id';
import Table from './../../../../../../common/table/index';
import Title from './fields/title';
import LinkYoutube from './fields/link';
import MediaListBase from './../base';

class VideoList extends MediaListBase {
  constructor(props) {
    super(props, 'Vídeos', 'videos');
  }

  list() {
    this.tableColumns = [
      { prop: 'link', label: 'Vídeo', verticalAlign: 'top', flex: 50, template: LinkYoutube },
      { prop: 'title', label: 'Título', verticalAlign: 'top', flex: 50, template: Title }
    ];

    const { videos } = this.props;

    if (!videos.some(s => !s.link || !s.title))
      videos.push({ id: NewId(), link: null, title: '' });

    return (
      <Table pallet={ this.tablePallet } rows={ videos }
        columns={ this.tableColumns } actions={ this.tableActions }
      />
    );
  }

  isMainMedia(video) {
    if (this.props.videos.length === 1) return true;
    return !video.link || !video.title;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch);
export default connect(null, mapDispatchToProps)(VideoList); 
