import React, { Component } from 'react';
import EditTimeButton from './EditTimeButton';


class Selector extends Component {
    constructor(props) {
        super(props);


        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }


    //Suma a el tiempo el valor que se ha añadido
    editar(t) {

        //Coge los minutos y les suma el nuevo valor a anyadir

        var min = this.props.tiempo + t;

        //Si el número esta entre cero 
        if (min <= 60 && min > 0) {
            this.props.handleClick(min);
        }
    }

    //invoca editar con 1 como input
    increment() {

        this.editar(1);
    }


    //invoca editar con -1 como input
    decrement() {
        this.editar(-1);
    }



    render() {

        //Almacena la variable Tipo

        const tipo = this.props.tipo;

        //Genera los ids de las etiquetas

        const idH2 = tipo + "-label";

        const idIn = tipo + '-increment';

        const idDe = tipo + '-decrement';

        const idLe = tipo + '-length';


        //Clases

        const clasesIn = 'increment fa-solid fa-plus';

        const clasesDe = 'decrement fa-solid fa-minus';

        //Contenidos

        const conH2 = tipo + " Length";



        return (
            // Es un grid que los pone en función dek css
            <div className='selector'>

                {/* Etiquta  */}
                <h2 id={idH2} className="label">{conH2}</h2>

                {/* Botones  */}

                <EditTimeButton nid={idIn} clases={clasesIn} handleClick={this.increment} />
                <EditTimeButton nid={idDe} clases={clasesDe} handleClick={this.decrement} />

                <div id={idLe} className='length'>{this.props.tiempo}</div>


            </div>);
    }
}


Selector.defaultProps = {

    tiempo: 1
}

export default Selector;