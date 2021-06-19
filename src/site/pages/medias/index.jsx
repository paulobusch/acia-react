import './medias.css';

import React, { Component } from 'react';
import { Link } from 'react-router';

import Loading from './../../../common/loading/index';
import Message from './../../../common/message/index';
import { mapTypeToTitle } from '../../../reducers/medias/media-actions';

const TAKE = 8;
export default class MediaListBase extends Component {
  constructor(props, type) {
    super(props);

    this.type = type;
    this.title = mapTypeToTitle(this.type);
    this.state = { loading: true, page: 1 };
    this.afterLoad = this.afterLoad.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  card(props) { }

  componentWillMount() {
    this.props.getAll(this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      const cards = this.applyFilter(list);
      this.setState({
        ...this.state,
        loading: false,
        allCards: cards,
        paginatedCards: this.applyPagination(cards)
      });
    }
  }

  applyFilter(list) {
    return list.filter(m => m.type === this.type);
  }

  applyPagination(list) {
    return list.slice(0, this.state.page * TAKE);
  }

  nextPage() {
    this.setState({
      ...this.state,
      page: this.state.page + 1
    }, () => {
      this.setState({
        ...this.state,
        paginatedCards: this.applyPagination(this.state.allCards)
      }); 
    });
  }

  render() {
    return (
      <div id="media-list">
        <h2>{ this.title }</h2>
        { this.cards() }
      </div>
    );
  }

  cards() {
    const { paginatedCards, loading } = this.state;
    if (loading) return <Loading style={ { paddingTop: 'calc(38vh - 250px)' } }/>;
    if (paginatedCards.length === 0) return <Message />;

    return (
      <div>
        <div className="media-cards">
          { paginatedCards.map(p => this.card(p)) }
        </div>
        { this.buttonLoadMore() }
      </div>
    );
  }

  buttonLoadMore() {
    const records = this.state.page * TAKE;
    if (this.state.allCards.length <= records) return false;
    if (this.state.allCards.length === this.state.paginatedCards.length) return false;
    return (<Link onClick={ this.nextPage } className="link-load-more">Carregar mais</Link>);
  }
}
