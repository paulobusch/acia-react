import './law-suit-search.css';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Message from '../../../../common/message';
import Row from '../../../../common/row';
import { search } from '../../../../reducers/law-suits/law-suit-actions';
import Loading from '../../../../common/loading/index';
import { formatDate } from '../../../../common/formatters/date';
import { withRouter } from 'react-router';

class LawSuitSearch extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false, search: null };
    this.search = this.search.bind(this);
    this.afterLoad = this.afterLoad.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  toggleLoading(loading) {
    this.setState({ 
      ...this.state, 
      loading: loading
    });
  }

  search() {
    this.searchId = null;
    this.toggleLoading(true);
    this.props.search(this.state.search, this.afterLoad);
  }

  afterLoad(success) {
    if (success) this.toggleLoading(false);
  }

  onSearch(ev) {
    this.setState({
      ...this.state,
      search: ev.target.value
    });
    if (this.searchId) clearTimeout(this.searchId);
    this.searchId = setTimeout(() => this.search(), 500);
  }

  render() {
    return (
      <div id="law-suit-search">
        <Row justify="center">
          <div className="form-field" style={ { flexBasis: '50%' } }>
            <div className="field-icon-right">
              <i className="icon fas fa-search" onClick={ this.search }></i>
              <input onChange={ this.onSearch } 
                type="text" className="form-control" 
                placeholder="Informe o código do processo"/>
            </div>
          </div>
        </Row>
        { this.list() }
      </div>
    );   
  }

  goToLawSuit(id) {
    const url = `law-suit/view/${id}`;
    this.props.router.push(url);
  }

  list() {
    if (this.state.loading) 
      return <Loading />;
    
    const { lawSuits } = this.props;
    if (!lawSuits || !lawSuits.length) {
      if (this.state.search && !this.searchId)
        return <Message message={ this.props.emptyMessage || 'Nenhum registro encontrado' } />;
      return false;
    } 

    const lawSuitsItems = lawSuits.map(lawSuit => {
      return (
        <li key={ lawSuit.id } onClick={ () => this.goToLawSuit(lawSuit.id) } className="law-suit-item">
          <div className="code">{ lawSuit.code }</div>
          <div className="name">{ lawSuit.name }</div>
          <div className="date">{ formatDate(lawSuit.date) }</div>
        </li>
      );
    });

    return (<ul className="law-suit-list">{ lawSuitsItems }</ul>);
  }
}

const mapStateToProps = state => ({ lawSuits: state.lawSuits }); 
const mapDispatchToProps = dispatch => bindActionCreators({ search }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LawSuitSearch));
