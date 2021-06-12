import './services.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, Form } from 'redux-form';
import { withRouter } from 'react-router';

import { getAll } from '../../../reducers/services/service-actions';
import Loading from '../../../common/loading/index';
import Input from '../../../common/fields/input/index';
import Message from '../../../common/message/index';
import ServiceCard from './../home/sections/services/service-card/ServiceCard';

class Services extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.afterLoad = this.afterLoad.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    this.props.getAll(this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        fullServices: list,
        filtredServices: list
      });
    }
  }

  render() {
    return (
      <div id="service-list">
        <h2>SERVIÇOS</h2>
        { this.searchForm() }
        <div className="services">
          { this.list() }
        </div>
      </div>
    );
  }

  searchForm() {
    const { handleSubmit } = this.props;
    
    return (
      <Form id="search-services" onSubmit={ handleSubmit(this.search) }>
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
      filtredServices: this.state.fullServices
        .filter(a => a.title.toLowerCase().search(this.state.search.toLowerCase()) !== -1)
    });
  }

  list() {
    const { filtredServices, loading } = this.state;
    if (loading) return <Loading style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    if (!filtredServices || filtredServices.length === 0) return <Message style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    return (
      <div className="services-cards">
        { filtredServices.map(s => <ServiceCard key={ s.id } { ...s }>{ s.description }</ServiceCard>) }
      </div>
    );
  }
}

const form = reduxForm({ form: 'search-services-from' })(withRouter(Services));
const mapDispatchToProps = dispatch => bindActionCreators({ getAll }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(form));
