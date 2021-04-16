d3.select('#scatter').style('border','2px solid black');
var width = parseFloat(d3.select('#scatter').style('width'));
var height = .66*width;

console.log(

height


);


var svg = d3.select('#scatter').append('svg').style('width',width).style('height',height);

var xtext = svg.append('g').attr('transform',`translate(${width/2},${.98*height})`);

xtext
    .append('text')
    .text('Household Income (median)')
    .attr('class','aText x inactive')
    .attr('data-id','income');

xtext
    .append('text')
    .attr('y',-20)
    .text('Age (median)')
    .attr('class','aText x inactive')
    .attr('data-id','age');

xtext
    .append('text')
    .attr('y',-40)
    .text('In Poverty (%)')
    .attr('class','aText x active')
    .attr('data-id','poverty');

var ytext = svg.append('g').attr('transform',`translate(15,${.5*height})rotate(-90)`);

ytext
    .append('text')
    .text('Obese (%)')
    .attr('class','aText y active')
    .attr('data-id','obesity');

ytext
    .append('text')
    .attr('y',20)
    .text('Smokes (%)')
    .attr('class','aText y inactive')
    .attr('data-id','smokes');

ytext
    .append('text')
    .attr('y',40)
    .text('Lacks of Healthcare (%)')
    .attr('class','aText y inactive')
    .attr('data-id','poverty');

d3.selectAll('.aText').on('click',handleClick);

function handleClick() {
    var selected = d3.select(this).classed('x') ? 'x' : 'y';
    d3.selectAll('.'+selected).classed('inactive',true);
    d3.selectAll('.'+selected).classed('active',false);
    d3.select(this).classed('inactive',false);
    d3.select(this).classed('active',true);
};

var xscale = svg.append('g').append('circle').attr('r',10).attr('transform',`translate(75,${height-75})`)