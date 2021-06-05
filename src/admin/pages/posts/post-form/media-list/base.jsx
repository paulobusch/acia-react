import './media-list.css';

import React, { Component } from 'react';

export default class MediaListBase extends Component {
  constructor(props, title, name) {
    super(props);

    this.title = title;
    this.name = name;
    this.remove = this.remove.bind(this);
  }

  list() { }

  isMainMedia(meida) { }

  componentWillMount() {
    this.configure();
  }
  
  configure() {    
    this.tableActions = [
      { icon: 'trash-alt', title: 'Remover', color: 'red', click: this.remove, show: media => !this.isMainMedia(media) }
    ];

    this.tablePallet = {
      text: 'black',
      fill: '#a7d2ff'
    };
  }

  render() {
    return (
      <fieldset className="media-container">
        <legend>{ this.title }</legend>
        { this.list() }
      </fieldset>
    );
  }
  
  remove(media, index) {
    if (this.isMainMedia(media)) return false;
    this.props.arrayRemove('post-form', this.name, index);
  }
}
