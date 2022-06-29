import React, { Component } from 'react';


class QuoteBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quote: undefined,
        }

        this.nuevaCuota = this.nuevaCuota.bind(this);
        this.reproducirSonido = this.reproducirSonido.bind(this);

    }

    nuevaCuota() {

        const numeroMaximo = this.state.quotes.length

        this.props.cambioColor();

        this.setState({ quote: this.state.quotes[this.props.numeroAleatorio(numeroMaximo)] });

    }

    componentDidMount() {

        fetch("https://type.fit/api/quotes")
            .then(response => response.json())
            .then(data => {
                this.setState({ quotes: data, quote: data[this.props.numeroAleatorio(data.length)] });
            });

    }

    reproducirSonido() {

        var audio = new Audio("tweet.mp3");

        audio.play();
    }


    render() {


        if (this.state.quote === undefined) {
            return (<></>)
        }
        else {



            const autor = (this.state.quote.author === null) ? "Anonimus" : "By " + this.state.quote.author;

            return (<div id="quote-box" className='container-fluid' >


                <div id="text">


                    "{this.state.quote.text}"

                </div>

                <div id='parte-derecha'>

                    <a id="tweet-quote" target="_blank" rel="noreferrer" href="https://twitter.com/intent/tweet" onMouseEnter={this.reproducirSonido}>
                        <i className="fa-brands fa-twitter-square"></i>
                    </a>

                    <div id="author">
                        {autor}
                    </div>

                    <button id="new-quote" className="btn btn-outline-light" onClick={this.nuevaCuota}>

                        <i className="fa-solid fa-arrows-rotate"></i> Change Quote

                    </button>
                </div>
            </div>);
        }
    }
}

export default QuoteBox;