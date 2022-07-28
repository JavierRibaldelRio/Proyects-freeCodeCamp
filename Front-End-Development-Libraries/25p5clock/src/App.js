import Selector from './components/Selector';
import './styles';

import React, { Component } from 'react';
import Timer from './components/Timer';




class App extends Component {


  constructor(props) {
    super(props);

    this.state = { tSession: 25, tBreak: 5, break: false };

    this.fetchSession = this.fetchSession.bind(this);
    this.fetchBreak = this.fetchBreak.bind(this);

    this.finTimer = this.finTimer.bind(this);

  }

  fetchSession(t) {

    this.setState({ tSession: t });
  }

  fetchBreak(t) {

    this.setState({ tBreak: t });
  }


  finTimer() {

    this.setState({ break: !this.state.break })
  }

  render() {

    var timerLabel = this.state.break ? "break" : "session";

    var timerMinutos = this.state.break ? this.state.tBreak : this.state.tSession;


    return (
      <div className="App">

        <Selector tipo={'session'} tiempo={this.state.tSession} handleClick={this.fetchSession} />

        <Selector tipo={'break'} tiempo={this.state.tBreak} handleClick={this.fetchBreak} />


        <Timer label={timerLabel} minutos={timerMinutos} handleEnd={this.finTimer} />
      </div>
    );
  }
}
export default App;
