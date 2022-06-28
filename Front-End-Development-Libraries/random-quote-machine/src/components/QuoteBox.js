import React, { Component } from 'react';


class QuoteBox extends Component {

    constructor(props) {
        super(props);
        this.state = { quote: undefined }

        this.nuevaCuota = this.nuevaCuota.bind(this);

    }


    numeroAleatorio(maxim) {
        return Math.floor(Math.random() * maxim);
    }

    nuevaCuota() {

        const numeroMaximo = this.state.quotes.length

        this.setState({ quote: this.state.quotes[this.numeroAleatorio(numeroMaximo)] });

    }


    componentDidMount() {

        fetch("https://type.fit/api/quotes")
            .then(response => response.json())
            .then(data => {

                this.setState({ quotes: data, quote: data[this.numeroAleatorio(data.length)] });

            });
    }


    render() {

        if (this.state.quote === undefined) {
            return (<></>)
        }
        else {
            const autor = (this.state.quote.author === null) ? "Anonimus" : "By " + this.state.quote.author;

            return (<div id="quote-box" className='container-fluid'>


                <div id="text">
                    "{this.state.quote.text}"

                </div>

                <div id='parte-derecha'>



                    <a id="tweet-quote" target="_top" href="www.twitter.com/intent/tweet">
                        <i class="fa-brands fa-twitter-square"></i>
                    </a>

                    <div id="author">
                        {autor}
                    </div>

                    <button id="new-quote" className="btn btn-primary" onClick={this.nuevaCuota}>

                        <i class="fa-solid fa-arrows-rotate"></i> Change Quote

                    </button>


                </div>
            </div>);
        }
    }
}

export default QuoteBox;