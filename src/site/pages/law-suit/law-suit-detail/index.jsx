import './law-suit-detail.css';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Loading from '../../../../common/loading/index';
import { getById } from '../../../../reducers/law-suits/law-suit-actions';
import { withRouter } from 'react-router';
import { formatDate } from './../../../../common/formatters/date';

class LawSuitDetail extends Component {
  constructor(props) {
    super(props);

    this.id = this.getId();
    this.state = { loading: true, lawSuit: null };
    this.afterLoad = this.afterLoad.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    this.props.getById(this.id, this.afterLoad);
  }

  getId() {
    const { router } = this.props;
    const { pathname } = router.location;
    const regex = /\/view\//;
    const index = pathname.search(regex);
    if (index === -1) return null;
    return pathname.substring(index).replace(regex, '');
  }

  afterLoad(success, data) {
    if (success) {    
      this.setState({ 
        ...this.state, 
        lawSuit: data,
        loading: false
      });
    }
  }

  render() {
    return (<div id="law-suit-detail">{ this.detail() }</div>);   
  }

  detail() {
    if (this.state.loading || !this.state.lawSuit) 
      return <Loading />;

    const { lawSuit } = this.state;
    return (
      <div>
        <h2>Detalhes do Processo</h2>
        <div className="details">
          <div><strong>Código: </strong>{ lawSuit.code }</div>
          <div><strong>Nome: </strong>{ lawSuit.name }</div>
          <div><strong>Data: </strong>{ formatDate(lawSuit.date) }</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getById }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(LawSuitDetail));
