import React, { Component } from 'react';


class QuoteBox extends Component {

    constructor(props) {
        super(props);

        //Crea un estado con una cuota indefinida
        this.state = { quote: undefined };

        //Funciones
        this.nuevaCuota = this.nuevaCuota.bind(this);
        this.reproducirSonido = this.reproducirSonido.bind(this);

    }

    //Genera una nueva cuota y su correspondiente cmabio de color en la interfaz
    nuevaCuota() {

        //Intercambia el color de la App
        this.props.cambioColor();


        //Saca el número máximo de cuotas
        const numeroMaximo = this.state.quotes.length;


        //Sacaa aleatoriamente la nueva cuato y la guarda en el estado
        this.setState({ quote: this.state.quotes[this.props.numeroAleatorio(numeroMaximo)] });

    }

    //Se ejecuta al montar el componente
    componentDidMount() {


        //Extrae las quotas de esta url
        fetch("https://type.fit/api/quotes")
            .then(response => response.json())
            .then(data => {
                //Elige una cuota aleatoriamente
                this.setState({ quotes: data, quote: data[this.props.numeroAleatorio(data.length)] });
            });

    }


    //Reproduce el sonido de Twiter
    reproducirSonido() {

        //Crea un nuevo audio y lo guarda
        var audio = new Audio("tweet.mp3");
        //Lo reproduce
        audio.play();
    }


    render() {

        // No hay quota, no devulve nada

        if (this.state.quote === undefined) {
            return (<></>)
        }
        else {

            //Si el autor es desconocido lo asigna a Anonimus, si es conocido le añade la preposición by
            const autor = (this.state.quote.author === null) ? "Anonimus" : "By " + this.state.quote.author;

            return (

                <div id="quote-box" className='container-fluid' >

                    {/* La cuota en si */}
                    <div id="text">


                        "{this.state.quote.text}"

                    </div>

                    {/* El Botón de nueva cuato, el de twiter y el autor  */}

                    <div id='parte-derecha'>

                        <a id="tweet-quote" target="_blank" rel="noreferrer" href="https://twitter.com/intent/tweet" onMouseEnter={this.reproducirSonido}>
                            <i className="fa-brands fa-twitter-square"></i>
                        </a>

                        <div id="author">
                            {autor}
                        </div>

                        <button id="new-quote" className="btn btn-outline-light" onClick={this.nuevaCuota}>

                            {/* Símbolo  de cambiar de Awosome */}
                            <i className="fa-solid fa-arrows-rotate"></i>

                            Change Quote
                        </button>
                    </div>
                </div>);
        }
    }
}

export default QuoteBox;