import './benefit-list.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAllByFilter, getAccrediteds, mapTypeToTitle } from '../../../../reducers/benefits/benefits-actions';
import Loading from '../../../../common/loading/index';
import BenefitCard from './benefit-card/index';

class BenefitList extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.type = this.props.router.params.type;
    this.title = mapTypeToTitle(this.type);
    this.afterLoad = this.afterLoad.bind(this);
  }

  componentWillMount() {
    this.props.getAllByFilter({ type: this.type }, this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        accrediteds: getAccrediteds(list)
      });
    }
  }

  render() {
    return (
      <div id="benefit-list">
        <h2>{ this.title }</h2>
        <div className="benefits">
          { this.list() }
        </div>
      </div>
    );
  }

  list() {
    const { accrediteds, loading } = this.state;
    if (loading) return <Loading block style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    return accrediteds.map(a => <BenefitCard key={ a.id } { ...a }/>);
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(BenefitList));
