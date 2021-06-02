import './standards.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, Form } from 'redux-form';
import { withRouter, hashHistory } from 'react-router';

import { getAllByFilter, mapTypeToTitle } from '../../../reducers/benefits/benefits-actions';
import Loading from '../../../common/loading/index';
import Input from './../../../common/fields/input/index';
import Message from './../../../common/message/index';

class Standards extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.type = this.props.router.params.type;
    this.title = mapTypeToTitle(this.type);
    this.afterLoad = this.afterLoad.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    this.props.getAllByFilter({ type: this.type }, this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        standards: list
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

  searchForm() {
    const { handleSubmit } = this.props;
    
    return (
      <Form id="search-standards" onSubmit={ handleSubmit(this.search) }>
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
    this.props.getAllByFilter({ type: this.type, search: this.state.search }, this.afterLoad);
  }

  list() {
    const { standards, loading } = this.state;
    if (loading) return <Loading style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    if (!standards || standards.length === 0) return <Message style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    return standards.map(a => this.standard(a));
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
