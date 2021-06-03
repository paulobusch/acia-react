import './services.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getAll } from '../../../../../reducers/services/service-actions';
import Section from '../../../../common/section/Section';
import ServiceCard from './service-card/ServiceCard';

class ServicesSection extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.afterLoad = this.afterLoad.bind(this);
  }

  componentWillMount() {
    this.props.getAll(this.afterLoad);
  }

  afterLoad(success) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  render() {
    const limit = 6;
    const { loading } = this.state;
    const { services } = this.props;
    if (loading) return false;
    if (services.length === 0) return false;

    return (
      <Section id="services">
        <div className="services">
          { services.slice(0, limit).map(s => <ServiceCard key={ s.id } { ...s }>{ s.description }</ServiceCard>) }
        </div>
        { !loading && services.length > limit && <Link to="services" className="link-view-all">Ver Todos</Link> }
      </Section>
    );    
  }
}

const mapStateToProps = state => ({ services: state.services });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ServicesSection);
