import './style';
import React, { Component } from 'react';
import PanelControl from './components/PanelControl';
import DrumPads from './components/DrumPads';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { contenidoDisplay: '' };

    this.editarDisplay = this.editarDisplay.bind(this);

  }


  //Edita el estado
  editarDisplay(nuevoDisplay) {

    this.setState({ contenidoDisplay: nuevoDisplay });

  }


  render() {


    return (
      <div id='drum-machine'>

        <DrumPads editarDisplay={this.editarDisplay} />


        <PanelControl contenidoDisplay={this.state.contenidoDisplay} />
      </div >
    );
  }
}

export default App;
