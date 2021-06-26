import './standards.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, Form } from 'redux-form';
import { withRouter, hashHistory } from 'react-router';

import Loading from '../../../common/loading/index';
import Input from './../../../common/fields/input/index';
import Message from './../../../common/message/index';
import { getAllByFilter } from '../../../reducers/benefits/benefits-actions';
import Row from './../../../common/row/index';
import Select from './../../../common/fields/select/index';
import required from './../../../common/validators/required';
import { BENEFIT_AGREEMENT, BENEFIT_ALL, BENEFIT_HEALTH } from './../../../reducers/benefits/benefits-type';

class Standards extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, type: BENEFIT_ALL };
    this.afterLoad = this.afterLoad.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.search = this.search.bind(this);
    this.props.initialize({ type: this.state.type });
  }

  componentWillMount() {
    this.props.getAllByFilter({ }, this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        allStandards: list,
        filtredStandards: this.applyFilter(list)
      });
    }
  }

  render() {
    return (
      <div id="standard-list">
        <h2>REDE DE CONVÊNIOS</h2>
        { this.searchForm() }
        <div className="standards">
          { this.list() }
        </div>
      </div>
    );
  }

  applyFilter(standards) {
    let result = standards;
    if (this.state.search)
      result = result.filter(a => a.title.toLowerCase().search(this.state.search.toLowerCase()) !== -1);
    if (this.state.type && BENEFIT_ALL !== this.state.type) 
      result = result.filter(a => a.type === this.state.type);
    return result;
  }

  searchForm() {
    const { handleSubmit } = this.props;
    const types = [BENEFIT_ALL, BENEFIT_AGREEMENT, BENEFIT_HEALTH];
    return (
      <Form id="search-standards" onSubmit={ handleSubmit(this.search) }>
        <Row className="row-fields">
          <Field name="search" className="field-radio field-shadow" type="text" placeholder="Termo de busca" autoComplete="off"
            action={ { icon: 'fas fa-search', onClick: this.search } } 
            onchange={ this.onSearch } component={ Input }
            flex="75"
          />
          <Field name="type" className="field-radio field-shadow" title="Tipo" flex="25" 
            onchange={ ev => this.setState({ ...this.state, type: ev }, () => this.search()) } 
            component={ Select } options={ types} validate={ required }
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
    this.setState({ 
      ...this.state, loading: false, page: 1
    }, () => {
      this.setState({ 
        ...this.state, filtredStandards: this.applyFilter(this.state.allStandards)
      }); 
    });
  }

  list() {
    const { filtredStandards, loading } = this.state;
    if (loading) return <Loading style={ { paddingTop: 'calc(38vh - 250px)' } }/>;
    if (filtredStandards.length === 0) return <Message style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    return (
      <div>
        <div className="standard-cards">
          { filtredStandards.map(a => this.standard(a)) }
        </div>
      </div>
    );
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
