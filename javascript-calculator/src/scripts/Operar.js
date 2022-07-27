//Se le introducen los dos números, primero y segundo, después la operación que tiene que realizar y cuantos decimales tiene que dejar decimas tiene que dejar

import { sum, res, mul, div } from "../data/Operators";

function operar(a, b, op, de) {

    //Saca el resultado sin calcular
    let resultado = calcular();

    //Redondea el resultado y lo devulve

    let resultadoRedondeado = redondear(resultado);

    console.log(resultadoRedondeado);

    return resultadoRedondeado;

    //Función que calcula la operacion
    function calcular() {

        var sol;

        //Opera 
        switch (op) {
            case sum:
                sol = a + b;

                break;

            case res:

                sol = a - b;
                break;

            case mul:
                sol = a * b;
                break;

            case div:

                sol = a / b;

            default:
                break;
        }

        //Devuelve la solución

        return sol;
    }

    //Redondea num a tantos decimales según de
    function redondear(num) {

        //Por tanto hay que poder multiplicar el número para que las unidades sea el nú.ero que haya que redondear
        const nivelDecimales = Math.pow(10, de);

        //Multiplica el número por el nivel de decimales, lo redondea y después lo divide entre el nivel de Decimales
        return Math.round(nivelDecimales * num) / nivelDecimales;

    }


}

export default operar;