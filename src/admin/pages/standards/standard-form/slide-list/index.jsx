import './slide-list.css';

import React, { Component } from 'react';
import { arrayInsert, arrayRemove } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Row from './../../../../../common/row/index';
import Table from './../../../../../common/table/index';
import Slide from './fields/slide';
import Title from './fields/title';
import NewId from './../../../../../common/random/random-id';
import Link from './fields/link';

class SlideList extends Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  componentWillMount() {
    this.configure();
  }
  
  configure() {    
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove, show: slide => !this.isMainSlide(slide) }
    ];

    this.tablePallet = {
      text: 'black',
      fill: '#a7d2ff'
    };
  }

  render() {
    return (
      <Row>
        <fieldset className="slides-container">
          <legend>Slides</legend>
          { this.list() }
        </fieldset>
      </Row>
    );
  }

  list() {
    this.tableColumns = [
      { prop: 'image', label: 'Imagem', verticalAlign: 'top', flex: 30, template: Slide },
      { prop: 'title', label: 'Título', verticalAlign: 'top', flex: 35, template: Title },
      { prop: 'link', label: 'Link', verticalAlign: 'top', flex: 35, template: Link }
    ];

    const { slides } = this.props;

    if (!slides.some(s => !s.image || !s.title))
      slides.push({ id: NewId(), image: null, title: '' });

    return (
      <Table pallet={ this.tablePallet } rows={ slides }
        columns={ this.tableColumns } actions={ this.tableActions }
      />
    );
  }
  
  remove(slide, index) {
    if (this.isMainSlide(slide)) return false;
    this.props.arrayRemove('standard-form', 'slides', index);
  }

  isMainSlide(slide) {
    if (this.props.slides.length === 1) return true;
    return !slide.image || !slide.title;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch);
export default connect(null, mapDispatchToProps)(SlideList); 
