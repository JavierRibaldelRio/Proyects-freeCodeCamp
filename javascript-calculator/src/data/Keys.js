//Genera las teclas de la calculadora que no son nñumeros

import { sum, res, mul, div, igu, dec } from '../data/Operators'


//Clase tecla que generar ela rraya de las otras
class Key {

    constructor(area, cont) {

        this.area = area;
        this.cont = cont;
    }
}

const keys = [
    new Key('add', sum),
    new Key('subtract', res),
    new Key('multiply', mul),
    new Key('divide', div),
    new Key('equals', igu),
    new Key('decimal', dec),
    new Key('clear', 'AC')];

export default keys;