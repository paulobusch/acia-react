import './image.css';

import React, { Component } from 'react';

import { fileToBase64 } from './../api/file';

export default class Image extends Component {
  constructor(props) {
    super(props);

    this.state = { imageUrl: null };
  }

  componentWillMount() {
    this.loadImageUrl();
  }

  componentDidUpdate() {
    this.loadImageUrl();
  }

  loadImageUrl(){
    const { image } = this.props.row;
    
    if (this.image === image) return;
    this.image = image;
    if (image instanceof File) {
      return fileToBase64(image, base64 => {
        this.setState({ imageUrl: base64 });
      });
    }
  
    this.setState({ imageUrl: image || '/images/acia/default.png' });
  }

  render() {
    const { height } = this.props;
    return (
      <div className="card-image" style={ { 
        height: height ? height : '50px', 
        backgroundImage: this.state.imageUrl ? `url('${this.state.imageUrl}')` : false 
      } }></div>
    );
  }
}
