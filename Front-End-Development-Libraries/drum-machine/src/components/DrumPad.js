import React, { Component } from 'react';
import reproducirElementAudio from '../script.js/ReproducirAudioElemento';


class DrumPad extends Component {
    constructor(props) {
        super(props);

        this.state = { pulsado: false };

        this.reproducirAudio = this.reproducirAudio.bind(this);

        this.handlePress = this.handlePress.bind(this);
    }


    invertirBoton() {

        this.setState({ pulsado: !this.state.pulsado });

    }

    //Reproduce el audio, mandal el display y cambia el color del boton
    reproducirAudio() {

        this.invertirBoton();

        setTimeout(this.invertirBoton.bind(this), 300);

        //Hace al elemento audio reproducir el src
        reproducirElementAudio(this.props.instrumento.letra);

        //Envia el nombre al display
        this.props.editarDisplay(this.props.instrumento.nombre);


    }

    //Al presiona cada tecla

    handlePress(e) {

        if (e.keyCode === this.props.instrumento.codigoLetra) {
            this.reproducirAudio();
        }
    }

    //Se ejecuta cuando se monta el componente
    componentDidMount() {
        //Le añade a toda la web que cuando se ejecuta el disparador ( 1er input) , se ejecutara la segunda orden

        document.addEventListener('keydown', this.handlePress);

        //Dice que el boton esta pulsado



    }

    render() {

        const ins = this.props.instrumento; //Almacena el instrumento

        //Crea la variable clase

        let clase = 'drum-pad ';

        //Si esta pulsado añade la clase de pulsado
        clase = clase + ((this.state.pulsado) ? 'al-pulsar' : '');

        //Pedimos el
        var audio = require('../audio/' + ins.letra + '.mp3')

        return (<div className={clase} id={ins.nombre} onClick={this.reproducirAudio}>


            <audio id={ins.letra} className='clip' src={audio} />

            {ins.letra}

        </div >);
    }
}

export default DrumPad;