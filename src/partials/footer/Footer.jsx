import './Footer.css';

import React from 'react';

export default props => (
  <footer className="footer">
    <ul className="main-list">
      <li>
        <ul className="block-list">
          <li><img src="images/acia/logo-acia-white.png"/></li>
          <li><a href="#">FALE COM UM ATENDENTE</a></li>
          <li><a href="#">POLÍTICA DE PRIVACIDADE</a></li>
          <li><a href="#">OUVIDORIA</a></li>
          <li>
            <a href="#">
              R. Manoel D'abadia, 335 - St. Central, <br />
              Anápolis - GO, 75020-030
            </a>
          </li>
        </ul>
      </li>
      <li>
        <h2>EMPRESAS</h2>
        <ul className="block-list">
          <li><a href="#">CERTIFICADO DIGITAL</a></li>
          <li><a href="#">CONSULTORIA JURÍDICA</a></li>
          <li><a href="#">CARTÃO DE VANTAGENS</a></li>
          <li><a href="#">ACIA CRED</a></li>
        </ul>
      </li>
      <li>
        <h2>INSTITUCIONAL</h2>
        <ul className="block-list">
          <li><a href="#">ACIA TEC</a></li>
        </ul>
      </li>
      <li>
        <h2>ANÁPOLIS</h2>
        <ul className="block-list">
          <li><a href="#">ACIA TEC</a></li>
        </ul>
      </li>
      <li>
        <h2>RECEBA NOVIDADES</h2>
        <input type="email" name="email" placeholder="escreva seu email..."/>
        <ul className="social-list">
          <li><a href="#"><i className="fab fa-facebook"></i></a></li>
          <li><a href="#"><i className="fab fa-twitter-square"></i></a></li>
          <li><a href="#"><i className="fab fa-instagram"></i></a></li>
          <li><a href="#"><i className="fab fa-youtube"></i></a></li>
        </ul>
      </li>
    </ul>
  </footer>
);
