import Selector from './components/Selector';
import './styles';

import React, { Component } from 'react';
import Timer from './components/Timer';

//Almacena el estado inicial
const INICIALSTATE = { tSession: 25, tBreak: 5, break: false, desactivado: false };



class App extends Component {


  constructor(props) {
    super(props);

    this.state = INICIALSTATE;

    this.fetchSession = this.fetchSession.bind(this);
    this.fetchBreak = this.fetchBreak.bind(this);

    this.finTimer = this.finTimer.bind(this);
    this.reset = this.reset.bind(this);

    this.invertirBotones = this.invertirBotones.bind(this);

  }


  //Funciones

  //Coge el tiempo de la sesión
  fetchSession(t) {

    this.setState({ tSession: t });
  }

  //Coge el tiempo de descanso
  fetchBreak(t) {

    this.setState({ tBreak: t });
  }

  //Se ejecuta cuando se acaba el temporizador
  finTimer() {

    this.setState({ break: !this.state.break })
  }

  //Desactivar botones

  invertirBotones() {

    this.setState({ desactivado: !this.state.desactivado })
  }


  //Se ejecuta cuando se desea resetear

  reset() {

    this.setState(INICIALSTATE);
  }

  render() {

    var timerLabel = this.state.break ? "break" : "session";

    var timerMinutos = this.state.break ? this.state.tBreak : this.state.tSession;


    return (
      <div className="App">

        <Selector tipo={'session'} tiempo={this.state.tSession} handleClick={this.fetchSession} desactivado={this.state.desactivado} />

        <Selector tipo={'break'} tiempo={this.state.tBreak} handleClick={this.fetchBreak} desactivado={this.state.desactivado} />


        <Timer label={timerLabel} minutos={timerMinutos} handleEnd={this.finTimer} reset={this.reset} invertirBotones={this.invertirBotones} />
      </div>
    );
  }
}
export default App;
