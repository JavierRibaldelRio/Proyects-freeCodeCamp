import React, { Component } from 'react';
import CalcButton from './CalButton';
import Display from './Display';
import Numbers from './Numbers';
import keys from '../data/Keys';
import operar from '../scripts/Operar';

import { sum, res, mul, div, igu, dec } from '../data/Operators'


class Calculator extends Component {
    constructor(props) {
        super(props);


        this.handleClickSimbolos = this.handleClickSimbolos.bind(this);     //Se ejecuta cuando se presiona algun símbolo

        //Al presionar algun número este se añade directamente al número que ya tenemos guardado
        this.handleClickNumeros = this.handleClickNumeros.bind(this);


        this.state = { display: 0, digitos: [], resultado: 0, operacion: null };

    }

    //Pone los valores del estado en el punto de partida
    reiniciar() {

        this.setState({ display: 0, digitos: [], resultado: 0, operacion: null, });
    }

    //Añade al número el . o el dígito introducido
    anyadirANumero(char) {

        const ni = this.state.digitos.concat(char);

        this.setState({ digitos: ni, display: ni.join('') });

    }

    handleClickNumeros(i) {


        if (this.state.operacion === null) {

            this.setState({ operacion: sum, resultado: 0 })
        }

        if (i > 0 || this.state.digitos.length > 0) {
            this.anyadirANumero(i);

        }

    }

    handleClickSimbolos(i) {

        //Si el símbolo es AC reinicia la app
        if (i === "AC") {

            this.reiniciar();
        }

        //Si se trata del punto decimal y no esta incluido en la otra
        else if (i === dec && !this.state.display.includes('.')) {

            //Ponemos un cero por si no hay nada en el string, ya que no se puede empezar por 0

            if (this.state.digitos.length === 0) {

                this.anyadirANumero(0);

            }

            //Pone el punto en el display y en el estado
            this.anyadirANumero(dec);


        }

        //Si el símbolo es - y la longitud es 0 añadimos el menos
        else if (i === res && this.state.digitos.length === 0) {

            this.anyadirANumero(res)
        }

        else if (i !== dec) {

            //Almacena el operador que luego se utilizará para la figuiente operación

            let simbolo = (i === igu) ? null : i;

            //Siempre que sepamos la operación y la respuesta no sea igual a digitos. O el único valor que haya en digitos sea el símbolo de menos
            if (this.state.operacion !== null && JSON.stringify(this.state.digitos) !== JSON.stringify([res])) {

                //Saca el resultado almacenado
                var resultado = this.state.resultado;

                //Saca el nuevo número
                const numero = Number(this.state.digitos.join(''));

                //Opera y redondea

                resultado = operar(resultado, numero, this.state.operacion, 4);


                this.setState({ resultado: resultado, display: resultado });

            }

            //Genera los estados
            this.setState({ digitos: [], operacion: simbolo })

        }

    }



    render() {


        var teclas = keys.map((x) => <CalcButton key={JSON.stringify(x)} area={x.area} contenido={x.cont} handleClick={this.handleClickSimbolos} />);

        return (<div id="calculator">
            {/* Display */}

            <Display value={this.state.display} />

            {teclas}


            {/* Numeros */}
            <Numbers handleClick={this.handleClickNumeros} />


        </div>);
    }
}

export default Calculator;