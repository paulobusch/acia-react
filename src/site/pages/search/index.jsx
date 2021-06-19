import './search.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Field, Form, reduxForm } from 'redux-form';

import { getAll } from '../../../reducers/search/search-actions';
import Loading from './../../../common/loading/index';
import Input from './../../../common/fields/input/index';
import Message from './../../../common/message/index';
import Row from './../../../common/row/index';
import Select from './../../../common/fields/select/index';
import required from './../../../common/validators/required';
import SearchCard from './search-card/index';
import { SEARCH_SORT_DATE, SEARCH_SORT_TITLE } from './../../../reducers/search/search-sort';

class SearchList extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      loading: !!this.props.router.location.query.query, 
      search: this.props.router.location.query.query,
      sort: SEARCH_SORT_DATE
    };
    this.afterLoad = this.afterLoad.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.search = this.search.bind(this);
    if (this.state.search || this.state.sort) 
      this.props.initialize({ search: this.state.search, sort: this.state.sort });
  }

  componentWillMount() {
    this.props.getAll(this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        fullRecords: list,
        filtredRecords: this.state.search ? this.applySort(this.applyFilter(list)) : null
      });
    }
  }

  toggleLoading(loading) {
    this.setState({ 
      ...this.state, 
      loading: loading
    });
  }

  render() {
    return (
      <div id="search-list">
        <h2>PESQUISA</h2>
        { this.searchForm() }
        <div className="records">
          { this.list() }
        </div>
      </div>
    );
  }

  applyFilter(records) {
    let result = records;
    if (this.state.search) 
      result = result.filter(a => (a.title || '').toLowerCase().search(this.state.search.toLowerCase()) !== -1
        || (a.description || '').toLowerCase().search(this.state.search.toLowerCase()) !== -1
      );
    else
      result = null;
    return result;
  }

  applySort(records) {
    const { sort } = this.state;
    if (!sort || !records) return records;
    if (sort === SEARCH_SORT_DATE) return records.sort((a, b) => a.createdAt - b.createdAt);
    if (sort === SEARCH_SORT_TITLE) return records.sort((a, b) => (a.title || '').localeCompare(b.title));
    return records;
  }

  searchForm() {
    const { handleSubmit } = this.props;
    const sortOptions = [SEARCH_SORT_TITLE, SEARCH_SORT_DATE];

    return (
      <Form id="search-records" onSubmit={ handleSubmit(this.search) }>
        <Row className="row-fields">
          <Field name="search" className="field-radio field-shadow" type="text" placeholder="Termo de busca" autoComplete="off"
            action={ { icon: 'fas fa-search', onClick: this.search } } 
            onchange={ this.onSearch } component={ Input }
            flex="80"
          />
          <Field name="sort" className="field-radio field-shadow" title="Ordenação" flex="20" 
            onchange={ ev => this.setState({ ...this.state, sort: ev }, () => this.search()) } 
            component={ Select } options={ sortOptions} validate={ required }
          />
        </Row>
      </Form>
    );
  }

  onSearch(ev) {
    this.setState({
      ...this.state,
      search: ev.target.value
    });
    if (this.searchId) clearTimeout(this.searchId);
    this.searchId = setTimeout(() => this.search(), 500);
  }
  
  search() {
    if (this.searchId) {
      clearTimeout(this.searchId); 
      this.searchId = null;
    }
    this.toggleLoading(true);
    this.setState({ 
      ...this.state, loading: false,
      filtredRecords: this.applySort(this.applyFilter(this.state.fullRecords))
    });
  }

  list() {
    const { filtredRecords, loading } = this.state;
    if (loading) return <Loading block style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    if (!filtredRecords) return false;
    if (filtredRecords.length === 0) return <Message style={ { paddingTop: 'calc(38vh - 250px)' } }/>;
    return filtredRecords.map(p => <SearchCard key={ p.id } { ...p }/>);
  }   
}

const form = reduxForm({ form: 'search-content-from' })(withRouter(SearchList));
const mapDispatchToProps = dispatch => bindActionCreators({ getAll }, dispatch);
export default connect(null, mapDispatchToProps)(form);
