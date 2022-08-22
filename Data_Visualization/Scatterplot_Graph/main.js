
const formatoTiempo = d3.timeFormat("%M:%S");

//Fetch a la api
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')

    .then((data) => {

        //Pasa a Fecha todos los datos

        const anyos = yearToDate(data, "Year");     //Años en formato fecha

        const times = timeToDate(data, 'Time');     //Tiempos en formato fecha

        //Creación del svg

        //Definición de altura
        const [h, w] = [400, 1300];

        const padding = 80;

        const espLeg = 255;    //Almacena el espacio que ocupa la legenda

        //Creación del svg
        var svg = d3.select('main')
            .append('svg')
            .attr('width', w)
            .attr('height', h)

        //Definición del tooltip

        var tooltip = d3.select('svg')
            .append('text')
            .attr('id', 'tooltip')
            .style('opacity', 0)
            .attr('height', 60)
            .attr('width', 60)
            .attr('fill', 'black')

        //Creación de escalas

        const xScale = d3.scaleTime()                                          //Crea la escala
            .domain([addAnyos(d3.min(anyos)), addAnyos(d3.max(anyos), 1)])     //Dominio, entre el menor y mayor, mas y menos uno
            .range([padding, w - padding - espLeg]);                           //Define el rango

        const yScale = d3.scaleTime()                                          //Crea la escala
            .domain([d3.min(times), d3.max(times)])                            //Genera el dominio
            .range([h - padding, padding]);

        //Creación de Ejes

        //OX
        const ejeX = d3.axisBottom(xScale);                             //Define la variable que almacena el eje

        svg.append('g')                                                 //Añadimos la g
            .attr('transform', "translate(0," + (h - padding) + ")")    //Añadimos la propiedad tranform
            .attr('id', "x-axis")                                       //Añadimos la id
            .call(ejeX);                                                //Llamamos al eje X


        //OY    
        const ejeY = d3.axisLeft(yScale)
            .tickFormat(formatoTiempo);                                 //Define el formato que han de tener los ticks

        svg.append('g')                                                 //Añade la g, necesaria para los ejes
            .attr("transform", "translate(" + padding + ',0)')          //Añade el paddin g
            .attr('id', 'y-axis')                                       //Añade la id
            .call(ejeY);                                                //Llama al eje Y

        //Añadir circulos
        svg.selectAll('circle')
            .data(data)                                                 //Coge los datos
            .enter()                                                    //Inicia la repetición
            .append('circle')                                           //Añade el circulo
            .attr('cx', (d, i) => xScale(anyos[i]))                     //Posición en eje X
            .attr('cy', (d, i) => yScale(times[i]))                     //Posición en eje Y
            .attr('r', 5)                                               //Almacena el radio de los puntos
            .attr('data-xvalue', (d, i) => anyos[i])                    //Valor en X sin escala
            .attr('data-yvalue', (d, i) => times[i].toISOString())      //Valor en Y sin escala,hay que hacerlo porque te lo pide el corrector
            .attr('fill', (d) => (d.Doping === '') ? 'red' : 'green')   //Pinta en función del color
            .attr('ori', (d) => (d.Doping === '') ? 'red' : 'green')    //Almacena el color originals
            .attr('class', 'dot')                                       //Clase dot
            .attr('opacity', 0.8)                                       //Transparencia del circulos
            .attr('count', (d, i) => i)                                 //Almacena el valor de la i
            .attr('stroke', '#000')                                     //Borde Negro
            .on('mouseover', handleMouseOver)                           //Cuando el ratón este encima
            .on('mouseout', handleMouseOut);                             //Ratón fuera

        function handleMouseOver(event, d) {

            // const texto = d.Name + ((d.Nationality === undefined) ? (' (' + d.Nacionality + ')') : '');
            const texto = d.Name + ' (' + d.Nationality + ')';

            //Obtine el elemento actual
            const dot = d3.select(event.currentTarget);


            dot.attr('fill', 'orange')                      //Tiñe de naranja el círculo
                .attr('r', 10);                             //Agranda el círculo

            //Almacena el valor del contador  
            const i = dot.attr('count');

            tooltip.style('opacity', 1)                     //Hace sólido el tooltip
                .attr('y', (yScale(times[i]) + 5))          //Y 
                .attr('x', (xScale(anyos[i]) + 20))         //X 
                .attr('data-year', dot.attr('data-xvalue')) //Año
                .text(texto);                             //Texto
        }

        function handleMouseOut(event, d) {

            //Almacena el punto
            const dot = d3.select(event.currentTarget);

            dot.attr('fill', dot.attr('ori'))       //Pone al original el color
                .attr('r', 5);                      //Pone el radio a 5

            tooltip.style('opacity', 0);            //Oculta el tooltip
        }


        //Leyenda

        //Tamaño de cada cuadrado
        const tamanyoCuadrados = 20;

        const posicionInicial = 60;
        //Almacena todo lo que forma parte de la leyenda 

        var seccionesLeyenda = [
            { color: 'red', y: posicionInicial, text: 'Without doping allegations' },
            { color: 'green', y: posicionInicial + 30, text: 'With doping allegations' }
        ];

        //Funcion que crea un bloqueen la leyenda
        var crearBloqueLeyenda = (s) => {
            svg.append('rect')                                  //Crea Rectangulo
                .attr('width', tamanyoCuadrados)                //Forma de cuadrado
                .attr('height', tamanyoCuadrados)               //Forma de cuadrado
                .attr('fill', s.color)                          //Color
                .attr('x', w - espLeg)                          //Posición en X
                .attr('y', s.y)                                 //Posición en Y
                .attr('stroke', '#000');                        //Borde Negro


            svg.append('text')                                  //Crea texto
                .attr('x', w - espLeg + 25)                     //Posición en X
                .attr('id', 'legend')                           //Id
                .attr('y', s.y + 15)                            //Posición en Y
                .text(s.text)                                   //Texto

        }

        seccionesLeyenda.map(crearBloqueLeyenda);     //Crea todas las secciñones de la leyenda


    });

//Funciones

//Crea un array con todas las valores de una propiedad de un bojeto
function yearToDate(arrob, prop) {


    const data = arrob.map((x) => new Date(x[prop], 1));   //Crea la fecha, insertamos el uno para que el constructor funcione bien

    return data;
}

function timeToDate(arr, prop) {

    const data = arr.map((x) => {


        var [min, seg] = x[prop].split(':');

        return new Date(0, 0, 0, 0, min, seg);
    });

    return data;
}

//Se le introduce una fecha y resta anyos

function addAnyos(fecha, anyos = -1) {
    var nFecha = new Date(fecha.getTime());

    nFecha.setFullYear(nFecha.getFullYear() + anyos);

    return nFecha;
}

function addSeconds(fecha, seg = -30) {
    var nFecha = new Date(fecha.getTime());

    nFecha.setSeconds(nFecha.getSeconds() + seg);

    return nFecha;
}