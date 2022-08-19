//Se ocupa de generar toda la estructura de datos y html de svg en javascript


//Crea el tooltip


d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')

    .then((data) => {

        //Declaración de las variables del tamaño
        const [h, w] = [500, 1000];

        const padding = 60;         //Declaración de padding

        //Saca el tamaño de cada columna
        const tamanyoColumnas = w / data.data.length;

        console.log('tamanyoColumnas :>> ', tamanyoColumnas);

        //Pasa las fechas a objeto fecha

        const arrayFechas = data.data.map((x) => new Date(x[0]));

        console.log('arrayFechas :>> ', arrayFechas);
        //Creación del svg

        const svg = d3.select("body")   //Desde body añadimos un svg
            .append("svg")             //Añade svg
            .attr('width', w)          //Grosor
            .attr('height', h);         //Altura


        //Definición del tooltip


        var tooltip = d3.select('svg')
            .append('text')
            .attr('id', 'tooltip')
            .style('opacity', 0)
            .attr('height', 40)
            .attr('width', 60)
            .attr('fill', 'blue')

        //Definición de Escalas

        //x

        //Coge el anyo de la fecha y lo devuelve en formato numérico


        const xScale = d3.scaleTime()   //Escala de Tiempo
            .domain([arrayFechas[0], arrayFechas[arrayFechas.length - 1]])  //Cogemos el último y el primero porque el tiempo siempre va de mayor a menor y la api lo entrega ordenado

            .range([padding, w - padding]);

        //Y

        const yScale = d3.scaleLinear()     //Crea la escala linear
            .domain([0, d3.max(data.data, (d) => d[1])]) //Dominio escala, de 0 a el máximo dentro de datos
            .range([h - padding, padding]); //El rango que tiene que ocupar

        //Creación de Ejes

        //OY

        //Definición del eje

        const yAxis = d3.axisLeft(yScale);      //Crea la variable que almacena el eje

        //Implementación del eje

        svg.append('g')     //Añade la g, necesaria para los ejes
            .attr("transform", "translate(" + padding + ',0)')
            .attr('id', 'y-axis')    //Añade la id
            .call(yAxis);

        //OX

        const xAxis = d3.axisBottom(xScale);

        //Implementación
        svg.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .attr('id', 'x-axis')    //Añade la id
            .call(xAxis);

        //Añadir los datos al gráfico
        var indi;

        var bar = svg.selectAll("rect")
            .data(data.data)   //Coge los datos
            .enter()            //Inicializa com el bucle
            .append('rect')
            //Atributos
            //Tamaño y posición
            .attr('y', (d) => yScale(d[1])) //Y valor
            .attr('x', (d, i) => {
                indi = i;
                return xScale(arrayFechas[i])

            })  //X lo sabemos poe el año  
            .attr('width', tamanyoColumnas)
            .attr("height", (d) => h - yScale(d[1]) - padding)
            //.attr("height", (d) => d[1])


            .attr("fill", "blue")       //Rellenamos de azul el contenido
            .attr('class', 'bar')
            .attr('data-date', (d) => d[0])
            .attr('data-gdp', (d) => d[1])    //Clase

            .on('mouseover', (event, d) => {

                tooltip.style('opacity', 1)
                    .attr('y', yScale(d[1] / 2)) //Y valor
                    .attr('x', xScale(arrayFechas[indi]))

                    .attr('data-date', d[0])


                    .text("Heldo")
            }).on('mouseout', () => {

                tooltip.style('opacity', 0)

            })
        ///////////////////////////


    });

