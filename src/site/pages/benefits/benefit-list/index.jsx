import './benefit-list.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, Form } from 'redux-form';
import { withRouter } from 'react-router';

import { getById, getAccrediteds } from '../../../../reducers/benefits/benefits-actions';
import Loading from '../../../../common/loading/index';
import BenefitCard from './benefit-card/index';
import Input from './../../../../common/fields/input/index';
import Message from './../../../../common/message/index';
import Row from './../../../../common/row/index';
import Select from './../../../../common/fields/select/index';
import required from './../../../../common/validators/required';
import { BENEFIT_SORT_DATE, BENEFIT_SORT_TITLE } from './../../../../reducers/benefits/benefits-sort';

class BenefitList extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, sort: BENEFIT_SORT_DATE };
    this.id = this.props.router.params.id;
    this.afterLoad = this.afterLoad.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSort = this.onSort.bind(this);
    this.search = this.search.bind(this);
    this.props.initialize({ sort: this.state.sort });
  }

  componentWillMount() {
    this.props.getById(this.id, this.afterLoad);
  }

  afterLoad(success, data) {
    if (success) {
      const accrediteds = getAccrediteds([data]); 
      this.setState({
        ...this.state,
        loading: false,
        allAccrediteds: accrediteds,
        filtredAccrediteds: this.applyFilter(accrediteds)
      });
    }
  }

  render() {
    return (
      <div id="benefit-list">
        <h2>REDE DE CONVÊNIOS</h2>
        { this.searchForm() }
        <div className="benefits">
          { this.list() }
        </div>
      </div>
    );
  }

  applyFilter(accrediteds) {
    if (this.state.search) 
      return accrediteds.filter(a => a.title.toLowerCase().search(this.state.search.toLowerCase()) !== -1)
    return accrediteds;
  }

  applySort(accrediteds) {
    const { sort } = this.state;
    if (!sort) return accrediteds;
    if (sort === BENEFIT_SORT_DATE) return accrediteds;
    if (sort === BENEFIT_SORT_TITLE) return accrediteds.sort((a, b) => a.title.localeCompare(b.title));
    return accrediteds;
  }
  
  applyPagination(list) {
    return list.slice(0, this.state.page * TAKE);
  }

  searchForm() {
    const { handleSubmit } = this.props;
    const sortOptions = [BENEFIT_SORT_DATE, BENEFIT_SORT_TITLE];
    return (
      <Form id="search-benefits" onSubmit={ handleSubmit(this.search) }>
        <Row className="row-fields">
          <Field name="search" className="field-radio field-shadow" type="text" placeholder="Termo de busca" autoComplete="off"
            action={ { icon: 'fas fa-search', onClick: this.search } } 
            onchange={ this.onSearch } component={ Input }
            flex="80"
          />
          <Field name="sort" className="field-radio field-shadow" title="Ordenação" flex="20" 
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
      ...this.state, loading: false, page: 1
    }, () => {
      this.setState({ 
        ...this.state, 
        filtredAccrediteds: this.applySort(this.applyFilter(this.state.allAccrediteds))
      }); 
    });
  }

  list() {
    const { filtredAccrediteds, loading } = this.state;
    if (loading) return <Loading block style={ { paddingTop: 'calc(38vh - 250px)' } }/>;
    if (filtredAccrediteds.length === 0) return <Message style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    return (
      <div>
        <div className="benefit-cards">
          { filtredAccrediteds.map(a => <BenefitCard key={ a.id } { ...a }/>) }
        </div>
      </div>
    );
  }
}

const form = reduxForm({ form: 'search-benefits-from' })(withRouter(BenefitList));
const mapDispatchToProps = dispatch => bindActionCreators({ getById }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(form));
