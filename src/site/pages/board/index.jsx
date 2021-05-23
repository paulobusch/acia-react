import './board.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAll } from '../../../reducers/boards/board-actions';
import Loading from './../../../common/loading/index';
import { BOARD_PRESIDENT, BOARD_VICE_PRESIDENCY, BOARD_SECRETARY, BOARD_TREASURER, BOARD_DIRECTOR } from './../../../reducers/boards/board-type';
import Row from './../../../common/row/index';

class BoardDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.type = this.props.router.params.type;
    this.afterLoad = this.afterLoad.bind(this);
  }

  componentWillMount() {
    this.props.getAll(this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        boards: list,
        president: list.find(l => l.type === BOARD_PRESIDENT)
      });
    }
  }

  render() {
    return (
      <div id="board">
        { this.container() }
      </div>
    );
  }

  container() {
    const { loading, president } = this.state;
    if (loading) return <Loading style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    const { yearStart, yearEnd } = president;
    return (
      <div>
        <h2>DIRETORIA { yearStart } - { yearEnd }</h2>
        { this.principal() }
        <hr />
        { this.directors() }
      </div>
    );
  }

  principal() {
    const { president, boards } = this.state;

    const vicePresidency = boards.filter(b => b.type === BOARD_VICE_PRESIDENCY);
    const secretaries = boards.filter(b => b.type === BOARD_SECRETARY);
    const treasurers = boards.filter(b => b.type === BOARD_TREASURER);

    const imageUrl = president.image || 'images/users/default-avatar.png';

    return (
      <div className="principal">
        <div className="president">
          <img className="image" src={ imageUrl } alt="Foto do presidente"></img>
          <h4 className="role-name">Presidente</h4>
          <h4 className="name">{ president.name }</h4>
        </div>
        <div>
          { vicePresidency.map((v, i) => this.role(v, i + 1, 'Vice Presidente')) }
        </div>
        <div>
          { secretaries.map((s, i) => this.role(s, i + 1, 'Secretário')) }
          { treasurers.map((t, i) => this.role(t, i + 1, 'Tesoureiro')) }
        </div>
      </div>
    );
  }

  role(data, position, type) {
    return (
      <div key={ position } className="role">
        <div className="position">{ position }º { type }</div>
        <div className="name">{ data.name }</div>
      </div>
    );
  }

  directors() {
    const { boards } = this.state;
    const directors = boards.filter(b => b.type === BOARD_DIRECTOR);
    
    return (
      <div className="directors">
        <h2>DIRETORIA ADMINISTRATIVA</h2>
        <div className="detail">Órgão de Direção, Administração e Execução da ACIA ({ directors.length } membros)</div>
        <div className="directors-list">
          <div className="header-list">
            <div>NOME</div>
            <div>EMPRESA</div>
            <div>CARGO</div>
          </div>
          { directors.map(d => this.director(d)) }
        </div>  
      </div>
    );
  }

  director(data) {
    return (
      <div key={ data.id } className="director">
        <div>{ data.name }</div>
        <div className="company"><span className="label">EMPRESA:&nbsp;</span>{ data.company }</div>
        <div className="office">{ data.office }</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAll }, dispatch);
export default connect(null, mapDispatchToProps)(withRouter(BoardDetail));
