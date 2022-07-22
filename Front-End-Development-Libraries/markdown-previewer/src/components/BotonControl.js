import React, { Component } from 'react';

//Crea los botones de la barra de control, estan diseñados para para renderizar un componente en de font awosome, se le introduce c omo propiedad la classe del botón, además de la función que se tiene que ejecutar cuando se pulse el botón; además se le añade la pista del voton de arriba
class BotonControl extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.props.handleClick.bind(this);

    }



    render() {

        //Clases Orginales de los botones

        const clasesOriginales = "boton-control";

        const classes = this.props.classes + " " + clasesOriginales;    //Suma las calses originales

        //Coge la pista del padre

        const text = this.props.title;


        return (<button onClick={this.handleClick} title={text} className={classes} />);
    }
}

//Pone las propiedades originales a valores inecesarios
BotonControl.defaultProps = {

    classes: " ",
    title: " ",
    handleClick: () => { }
}

export default BotonControl;