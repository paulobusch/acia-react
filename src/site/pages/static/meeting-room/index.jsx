import './meeting-room.css'

import React from 'react';
import PhotoCard from './../../medias/photos/photo-card/index';

export default function MeetingRoom() {
  const images = [
    '/images/meeting-room/sala-reunioes01.jpg',
    '/images/meeting-room/sala-reunioes02.jpg',
    '/images/meeting-room/sala-reunioes03.jpg',
    '/images/meeting-room/sala-reunioes04.jpg',
    '/images/meeting-room/sala-reunioes05.jpg',
    '/images/meeting-room/sala-reunioes06.jpg'
  ];

  return (
    <div id="static-meeting-room">
      <h2 className="main-title">SALA DE REUNIÕES</h2>
      <p>
        A ACIA ( Associação Comercial e Industrial de Anápolis) dispõe de uma sala de reuniões, confortável e ideal para a 
        realizaçãp de vários tipos de eventos.
      </p>
      <p>
        O espaço possui capacidade para 60 pessoas, ar condicionado, equipamento de data show, sistema de  som e microfones.
      </p>
      <div className="photos">
        { images.map((image, i) => <PhotoCard key={ i } image={ image }/>) }
      </div>
    </div >
  );
}
