import './galery-post.css';
import React from 'react';

import PostCard from '../../../pages/home/sections/posts/shared/post-card';
import ButtonPrev from '../actions/button-prev';
import ButtonNext from '../actions/button-next';
import GaleryBase from '..';

export default class GaleryPost extends GaleryBase {
  galery() {
    return (
      <div className="galery galery-posts">
        <div className="content">
          <div className="cards" style={ this.listStyles() }>
            { this.props.cards.map((p) => <PostCard key={ p.id } { ...p }/>) }
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
