import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { extractTextFromHtml } from './../../../../common/api/html';
import { getAll, remove } from '../../../../reducers/pages/page-actions';
import { copyToClipboard } from './../../../../common/api/clipboard';
import ListBase from '../../../partials/list-base';
import Resume from './../../../../common/resume/index';

class PageList extends ListBase {
  constructor(props) {
    super(props);

    this.title = 'Páginas';
    this.className = 'page-list';
    this.copyLink = this.copyLink.bind(this);
  }

  configure() {
    this.tableColumns = [
      { prop: 'title', label: 'Título', flex: 30 },
      { prop: 'content', label: 'Conteúdo', flex: 70, template: props => Resume({ text: extractTextFromHtml(props.row.content) }) }
    ];
    this.tableActions.unshift({ icon: 'link', title: 'Copiar Link', color: 'var(--primary)', click: this.copyLink });
  }

  copyLink(page) {
    copyToClipboard(this.generateLink(page));
  }

  generateLink(page) {
    return `${location.host}/#/page/${page.id}`;
  }
  
  getList() {
    return this.props.pages;
  }
}

const mapStateToProps = state => ({ pages: state.pages });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, remove }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageList));
