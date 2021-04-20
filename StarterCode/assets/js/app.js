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
    showCircles();
};
var chart = svg.append('g').attr('transform',`translate(75,${height-75})`)
var xScaleLoc = chart.append('g').transition().duration(2000);
var yScaleLoc = chart.append('g').transition().duration(2000);



showCircles();

function showCircles() {
    var xSel = d3.selectAll('.x').filter('.active').attr('data-id');
    var ySel = d3.selectAll('.y').filter('.active').attr('data-id');
    
    console.log(xSel);
    d3.csv('assets/data/data.csv').then(data=>{
        
        var xVal = data.map(obj=> +obj[xSel]);
        var yVal = data.map(obj=> +obj[ySel]);
        
        console.log(yVal);

        var xScaler = d3.scaleLinear().range([0, .8*width]).domain([.95 * d3.min(xVal), 1.05 * d3.max(xVal)]);
        var yScaler = d3.scaleLinear().range([0, - .75*height]).domain([.95 * d3.min(yVal), 1.05 * d3.max(yVal)]);

        xScaleLoc.call(d3.axisBottom(xScaler));
        yScaleLoc.call(d3.axisLeft(yScaler));

        var circles = chart.selectAll('g').data(data).enter().append('g').on('mouseover', function (d) {
            toolTip.show(d, this);
            d3.select(this).style('stroke','#323232');
        });
        
        circles.append('circle').attr('r', .02*width).attr('class','stateCircle');
        circles.append('text').attr('class','stateText');

        d3.selectAll('.stateCircle').transition().duration(1000).attr('cx', d => xScaler(d[xSel])).attr('cy', d => yScaler(d[ySel]));
        d3.selectAll('.stateText').transition().duration(1000).attr('dx', d => xScaler(d[xSel])).attr('dy', d => yScaler(d[ySel]) + 5).text(d => d.abbr);

        circles.call(toolTip);
    });
};