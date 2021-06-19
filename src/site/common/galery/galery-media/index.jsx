import './galery-media.css';
import React from 'react';

import ButtonPrev from '../actions/button-prev';
import ButtonNext from '../actions/button-next';
import GaleryBase from '..';
import { MEDIA_PHOTO, MEDIA_VIDEO } from '../../../../reducers/medias/media-type';

export default class GaleryMedia extends GaleryBase {
  constructor(props) {
    super(props);

    this.state = { ...this.state, cardsTake: 4 };
  }

  getTake() {
    if (window.innerWidth > 1000) return 4;
    if (window.innerWidth > 800) return 3;
    if (window.innerWidth > 580) return 2;
    return 1;
  }

  getTypeClass(type) {
    if (this.props.type === MEDIA_PHOTO) return 'photo';
    if (this.props.type === MEDIA_VIDEO) return 'video';
    return '';
  }

  galery() {
    return (
      <div className={ `galery galery-media ${this.getTypeClass(this.props.type)} split-${this.state.cardsTake}` }>
        <div className="content">
          <div className="cards" style={ this.listStyles() }>
            { this.props.cards.map((p) => this.props.card({ key: p.id, ...p })) }
          </div>
        </div>
        <div className="actions">
            <ButtonPrev disabled={ this.state.prevDisabled } onClick={ this.prevCard } />
            <ButtonNext disabled={ this.state.nextDisabled } onClick={ this.nextCard } />
        </div>
      </div>
    );
  }
}
