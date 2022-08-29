
//Fetch a la api
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')

    .then((data) => {

        //VAriables

        var h = 480, w = 200 + 5 * data.monthlyVariance.length / 12, padding = 70;

        //Almacena el formato del eje X
        const formatoEjeX = d3.format('.0f');

        //Almacena el formato del eje Y

        const formatoMes = d3.timeFormat('%B');


        //Formatea los datos

        var meses = [];     //Almacena todos los meses

        var datos = data.monthlyVariance.map((x) => {

            var mes = new Date(0, x.month - 1, 0, 0, 0, 0, 0);

            meses.push(mes);

            return { anyo: x.year, mes: mes, varianza: Number(x.variance) };

        });

        console.info('meses :>> ', meses);


        //Almacena la temperatura base
        const baseTemperature = Number(data.baseTemperature);
        //Sacada datos import(wantes

        const rectWidth = 5;

        const rectHeight = 22;
        var svg = d3.select('main').
            append('svg')
            .attr('height', h)
            .attr('width', w);


        d3.select('#cabeceras')
            .append('h2')
            .attr('id', 'description')
            .text("Base Temperature: " + baseTemperature + "º");     //Añade la cabecera


        //Escalas

        //X

        const xScale = d3.scaleLinear()
            .domain([d3.min(datos, (d) => d.anyo), d3.max(datos, (d) => d.anyo)])
            .range([padding, w - padding]);


        //Y.  

        const yScale = d3.scaleTime()
            .domain([new Date(0, 12, 0, 0, 0, 0, 0), d3.min(meses)])
            .range([h - padding, padding]);

        //Color

        //Crea la escala del color
        const escalaColor = d3.scaleLinear()
            .domain([d3.min(datos, (d) => d.varianza), 0, d3.max(datos, (d) => d.varianza)])
            .range(['blue', '#feff01', 'red']);



        //Ejesa

        //OX

        const xAxis = d3.axisBottom(xScale)
            .tickFormat(formatoEjeX);           //Evita la coma

        //Implementación
        svg.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .attr('id', 'x-axis')    //Añade la id
            .call(xAxis);


        //Oy
        const yAxis = d3.axisLeft(yScale).tickFormat(formatoMes);

        console.log('yAxis :>> ', yAxis);


        svg.append('g')     //Añade la g, necesaria para los ejes
            .attr("transform", "translate(" + padding + ',0)')
            .attr('id', 'y-axis')    //Añade la id
            .call(yAxis);

        console.log(escalaColor(1));



        svg.selectAll('rect')
            .data(datos)
            .enter()
            .append('rect')
            .attr('class', 'cell')
            .attr('x', (d) => xScale(d.anyo) - rectWidth / 2)
            .attr('y', (d) => yScale(d.mes) - rectHeight / 2)
            .attr('width', rectWidth)
            .attr('height', rectHeight)
            .attr('data-month', (d, i) => data.monthlyVariance[i].month - 1)
            .attr('data-year', (d, i) => data.monthlyVariance[i].year)
            .attr('data-temp', (d, i) => data.monthlyVariance[i].varianza + baseTemperature)
            .attr('fill', (d) => escalaColor(d.varianza));





    });
