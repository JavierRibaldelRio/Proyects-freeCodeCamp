import './App.css';
import QuoteBox from './components/QuoteBox';
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);

    //Almacena los posibles colores
    this.state = {
      colores: [
        '#663F46', '#00Bb2D', '#e8C138', '#FE5E41', '#344966', '#9D8420',
        '#E9aaa9', '#355834', '#DF367C', '#FCA17D', '#0F5257', '#CC5803',
        '#BCD1BA', '#81F495', '#878E88'
      ]
    };

    this.numeroAleatorio = this.numeroAleatorio.bind(this);
    this.nuevoColor = this.nuevoColor.bind(this);

  }

  numeroAleatorio(maxim) {
    return Math.floor(Math.random() * maxim);
  }

  nuevoColor() {

    this.setState({ color: this.state.colores[this.numeroAleatorio(this.state.colores.length)] });
  }

  componentDidMount() {

    this.nuevoColor();
  }

  render() {

    const estilo = {
      backgroundColor: this.state.color,
      transition: "all ease",

      transitionDuration: '1.75s',
    }



    return (
      <div className="App container-fluid" style={estilo} >
        <QuoteBox color={this.state.color} cambioColor={this.nuevoColor} numeroAleatorio={this.numeroAleatorio} />
      </div>
    );
  }
}

export default App;
