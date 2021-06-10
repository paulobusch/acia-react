import './standards.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, Form } from 'redux-form';
import { withRouter, hashHistory } from 'react-router';

import Loading from '../../../common/loading/index';
import Input from './../../../common/fields/input/index';
import Message from './../../../common/message/index';
import { getAllByFilter, mapTypeToTitle } from '../../../reducers/benefits/benefits-actions';
import { STANDARD_SORT_COUNT, STANDARD_SORT_DATE, STANDARD_SORT_TITLE } from './../../../reducers/standards/standard-sort';
import Row from './../../../common/row/index';
import Select from './../../../common/fields/select/index';
import required from './../../../common/validators/required';

class Standards extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, sort: STANDARD_SORT_DATE };
    this.type = this.props.router.params.type;
    this.title = mapTypeToTitle(this.type);
    this.afterLoad = this.afterLoad.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSort = this.onSort.bind(this);
    this.search = this.search.bind(this);
    this.props.initialize({ sort: this.state.sort });
  }

  componentWillMount() {
    this.props.getAllByFilter({ type: this.type }, this.afterLoad);
  }

  componentWillUpdate() {
    if (this.type === this.props.router.params.type) return;
    this.type = this.props.router.params.type;
    this.title = mapTypeToTitle(this.type);
    this.setState({ ...this.state, loading: true });
    this.props.getAllByFilter({ type: this.type }, this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        fullStandards: list,
        filtredStandards: this.applySort(this.applyFilter(list))
      });
    }
  }

  render() {
    return (
      <div id="standard-list">
        <h2>{ this.title }</h2>
        { this.searchForm() }
        <div className="standards">
          { this.list() }
        </div>
      </div>
    );
  }

  applyFilter(standards) {
    if (this.state.search) 
      return standards.filter(a => a.title.toLowerCase().search(this.state.search.toLowerCase()) !== -1)
    return standards;
  }

  applySort(standards) {
    const { sort } = this.state;
    if (!sort) return standards;
    if (sort === STANDARD_SORT_TITLE) return standards.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === STANDARD_SORT_DATE) return standards.sort((a, b) => a.createdAt - b.createdAt);
    if (sort === STANDARD_SORT_COUNT) 
      return standards.sort((a, b) => (b.accrediteds ? b.accrediteds.length : 0) - (a.accrediteds ? a.accrediteds.length : 0));
    return standards;
  }

  searchForm() {
    const { handleSubmit } = this.props;
    const sortOptions = [STANDARD_SORT_DATE, STANDARD_SORT_TITLE, STANDARD_SORT_COUNT];
    return (
      <Form id="search-standards" onSubmit={ handleSubmit(this.search) }>
        <Row className="row-fields">
          <Field name="search" type="text" placeholder="Termo de busca" autoComplete="off"
            action={ { icon: 'fas fa-search', onClick: this.search } } 
            onchange={ this.onSearch } component={ Input }
            flex="80"
          />
          <Field name="sort" title="Ordenação" flex="20" 
            onchange={ this.onSort } component={ Select } options={ sortOptions} validate={ required }
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

  onSort(ev) {
    this.setState({ ...this.state, sort: ev }, () => this.search());
  }
  
  search() {
    if (this.searchId) {
      clearTimeout(this.searchId); 
      this.searchId = null;
    }
    this.setState({ 
      ...this.state, loading: false,
      filtredStandards: this.applySort(this.applyFilter(this.state.fullStandards))
    });
  }

  list() {
    const { filtredStandards, loading } = this.state;
    if (loading) return <Loading style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    if (!filtredStandards || filtredStandards.length === 0) return <Message style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    return filtredStandards.map(a => this.standard(a));
  }

  standard(data) {
    const { accrediteds, title } = data;
    return (
      <div className="standard" key={ data.id } onClick={ () => hashHistory.push(`/benefits/${data.id}`) }>
        <div className="title">{ title }</div>
        <div className="count" title="Conveniados">{ accrediteds ? accrediteds.length : 0 }</div>
      </div>
    );
  }
}

const form = reduxForm({ form: 'search-standards-from' })(withRouter(Standards));
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(form));
