import React, { Component } from 'react';
import poner0 from '../scripts/PonerCero';
import TimerDashboard from './TimerDashboard';

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = { parado: true, minutos: 0, segundos: 0 };

        this.startStop = this.startStop.bind(this);

    }

    //Funciones del Componente


    //Cuando se monta el componente crae el intercalo
    componentDidMount() {

        this.crearIntervalo();

    }
    componentDidUpdate(prevProps) {


        //Si el tipo de temporizador a variado
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {

            //Elimina el antiguo intervalo
            clearInterval(this.intervalo)

            //Crea el nuevo Intercalo
            this.crearIntervalo();

        }

    }

    componentWillUnmount() {
        clearInterval(this.intervalo);
    }



    //Cambia el estado del juego
    startStop() {

        this.setState({ parado: !this.state.parado });        //Invierte el vqalor de parado

    }

    //Prepara el intervalo y lo pone en marcha
    crearIntervalo() {
        this.setState({ minutos: this.props.minutos, });

        this.intervalo = setInterval(() => {

            //Restamos un segundo
            if (!this.state.parado) {

                var [minutos, segundos] = [this.state.minutos, this.state.segundos];

                if (0 < segundos) {
                    segundos--;
                }

                if (segundos === 0) {


                    if (minutos === 0) {

                        //Sis se acaba
                        clearInterval(this.intervalo);

                        this.props.handleEnd();
                    }
                    else {

                        //Si el segundo es igual a menos
                        minutos--;

                        segundos = 59;
                    }

                }
                this.setState({ minutos: minutos, segundos: segundos });
            }
        }, 1000);
    }



    render() {

        var min = poner0(this.state.minutos);


        var seg = poner0(this.state.segundos);


        var tiempo = min + ":" + seg;

        return (<div>

            <div id='timer-label'>
                {this.props.label}
            </div>

            <div id='time-left'>

                {tiempo}
            </div>


            <TimerDashboard pausado={this.state.parado} handleStartStop={this.startStop} handleReset={this.reset} />

        </div>);
    }
}

Timer.defaultProps = {


    label: "session"
}

export default Timer;