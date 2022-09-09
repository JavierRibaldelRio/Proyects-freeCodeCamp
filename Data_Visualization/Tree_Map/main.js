//Crea el svg

const h = 700;

const w = 1300;


var svg = d3.select('main')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

var tooltip = d3.select('body')
    .append('p')
    .attr('id', 'tooltip')
    .style('opacity', 0)
    .style('z-index', 99)
    .style('position', 'absolute')
    .attr('fill', 'black')


d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
    .then((data) => {


        // Da valor al título
        const name = data.name;

        const datos = data.children;

        d3.select("h2")
            .text(name);

        // Le da la forma de cluster
        const root = d3.hierarchy(data).sum((d) => Number(d.value)).sort((a, b) => b.height - a.height || b.value - a.value);

        //Coge los dominios y los rangos

        const dominio = datos.map((x) => x.name).sort();

        //Almacena el rango

        const rango = []

        const cociente = 1 / dominio.length;


        for (var i = 1; i < dominio.length + 1; i++) {

            rango.push(d3.interpolateTurbo(cociente * i));

        }

        //Crea la escala de color

        const escalaColor = d3.scaleOrdinal()
            .domain(dominio)
            .range(rango);

        // Crea el treemap
        d3.treemap()
            .size([w, h])
            .padding(2)(root);

        var zelda = svg
            .selectAll('g')
            .data(root.leaves())
            .enter()
            .append('g')
            .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

        zelda
            .append('rect')
            .attr('class', 'tile')
            .attr('width', (d) => d.x1 - d.x0)
            .attr('height', (d) => d.y1 - d.y0)
            .attr('data-name', (d) => d.data.name)
            .attr('data-value', (d) => d.data.value)
            .attr('data-category', (d) => d.data.category)
            .attr('fill', (d) => escalaColor(d.data.category))
            .on('mouseover', handleMouseOver)                           //Cuando el ratón este encima
            .on('mouseout', handleMouseOut);

        zelda
            .append('text')
            .selectAll('tspan')
            .data((d) => d.data.name.split(' '))
            .enter()
            .append('tspan')
            .attr('y', (d, i) => 15 + i * 12)
            .attr('x', 5)
            .attr('font-size', "15px")
            .text((d) => d);

        //Creación de leyenda


        var svf = d3.select('footer')
            .append('svg')
            .attr('height', 80)
            .attr('width', 1000)
            .attr('id', 'svg');

        svf.append("g")
            .attr('id', 'legend')
            .attr("transform", "translate(20,20)");


        var legendLinear = d3.legendColor()
            .cells(dominio)
            .title('Device')
            .labels(({ i }) => dominio[i])     //Añade el símbolo de porcentaje a la etiqueta
            .shapePadding(40)
            .orient('horizontal')                                        // Añade el padding
            .scale(escalaColor);

        svf.select("#legend")
            .call(legendLinear);

        svf.selectAll('rect')
            .attr('class', "legend-item");

    });

function handleMouseOver(event, d) {


    //Obtine el elemento actual
    const condado = d3.select(event.currentTarget);

    tooltip.style('opacity', 1)                     //Hace sólido el tooltip
        .style('top', event.pageY - 28 + 'px')          //Y 
        .style('left', event.pageX + 10 + 'px')        //X )
        .attr('data-value', condado.attr('data-value'))
        .html(`${condado.attr('data-name')}: ${condado.attr('data-value')}`);                             //Texto
}

function handleMouseOut() {

    tooltip.style('opacity', 0);            //Oculta el tooltip
}