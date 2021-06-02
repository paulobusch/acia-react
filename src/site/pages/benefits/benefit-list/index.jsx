import './benefit-list.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, Form } from 'redux-form';
import { withRouter } from 'react-router';

import { getById, getAccrediteds, mapTypeToTitle } from '../../../../reducers/benefits/benefits-actions';
import Loading from '../../../../common/loading/index';
import BenefitCard from './benefit-card/index';
import Input from './../../../../common/fields/input/index';
import Message from './../../../../common/message/index';

class BenefitList extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.id = this.props.router.params.id;
    this.afterLoad = this.afterLoad.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    this.props.getById(this.id, this.afterLoad);
  }

  afterLoad(success, data) {
    if (success) {
      const accrediteds = getAccrediteds([data]); 
      this.setState({
        ...this.state,
        title: mapTypeToTitle(data.type),
        loading: false,
        fullAccrediteds: accrediteds,
        filtredAccrediteds: accrediteds
      });
    }
  }

  render() {
    return (
      <div id="benefit-list">
        <h2>{ this.state.title }</h2>
        { this.searchForm() }
        <div className="benefits">
          { this.list() }
        </div>
      </div>
    );
  }

  searchForm() {
    const { handleSubmit } = this.props;
    
    return (
      <Form id="search-benefits" onSubmit={ handleSubmit(this.search) }>
        <Field name="search" type="text" placeholder="Termo de busca" autoComplete="off"
          action={ { icon: 'fas fa-search', onClick: this.search } } 
          onchange={ this.onSearch } component={ Input }
        />
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
    this.setState({ 
      ...this.state, loading: false,
      filtredAccrediteds: this.state.fullAccrediteds
        .filter(a => a.title.toLowerCase().search(this.state.search.toLowerCase()) !== -1)
    });
  }

  list() {
    const { filtredAccrediteds, loading } = this.state;
    if (loading) return <Loading block style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    if (!filtredAccrediteds || filtredAccrediteds.length === 0) return <Message style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    return filtredAccrediteds.map(a => <BenefitCard key={ a.id } { ...a }/>);
  }
}

const form = reduxForm({ form: 'search-benefits-from' })(withRouter(BenefitList));
const mapDispatchToProps = dispatch => bindActionCreators({ getById }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(form));
