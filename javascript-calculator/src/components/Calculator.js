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


        this.state = { display: 0, digitos: [], resultado: 0, operacion: null, decimalUsado: false, negativo: false };

    }

    //Pone los valores del estado en el punto de partida
    reiniciar() {

        this.setState({ display: 0, digitos: [], resultado: 0, operacion: null, decimalUsado: false });
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


        if (i === 0 && this.state.digitos.length === 0) {


        } else {

            this.anyadirANumero(i);

        }

    }

    handleClickSimbolos(i) {

        //Si se trata del borra
        console.log('hola');


        if (i === "AC") {

            this.reiniciar();
        }

        //Si se trata del punto decimal
        else if (i === dec && this.state.decimalUsado === false) {

            //Ponemos un cero por si no hay nada en el string, ya que no se puede empezar por 0

            if (this.state.digitos.length === 0) {

                this.setState({ digitos: [0] });

            }

            //Pone el punto en el display y en el estado
            this.anyadirANumero(dec);

            this.setState({ decimalUsado: true });

        } else if (i === res && this.state.digitos.length === 0) {

            this.setState({ digitos: ['-'], negativo: true });

        }
        else if (i !== dec) {



            //En el momento en el que se presiona un símbolo se opera
            if (this.state.operacion === null || (JSON.stringify(this.state.digitos) === JSON.stringify([res]))) {

                this.setState({ operacion: i, digitos: [] });

            }
            else {
                var resultado = this.state.resultado;

                const numero = Number(this.state.digitos.join(''));

                //Opera y redondea

                resultado = operar(resultado, numero, this.state.operacion, 4);


                this.setState({ resultado: resultado, digitos: [], display: resultado, decimalUsado: false });

                if (i === igu) {

                    this.setState({ operacion: null })

                } else {

                    this.setState({ operacion: i });
                }

            }
        }

    }

    //Si es un símbolo

    //this.setState({ operacion: i });


    //Si se trata de una operación


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