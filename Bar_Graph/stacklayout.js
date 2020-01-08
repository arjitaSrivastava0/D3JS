var dataset = [
{ apples: 5, oranges: 10, grapes: 22 },
{ apples: 4, oranges: 12, grapes: 28 },
{ apples: 2, oranges: 19, grapes: 32 },
{ apples: 7, oranges: 23, grapes: 35 },
{ apples: 23, oranges: 17, grapes: 43 }
];
var w = 300;
var h = 300;

//Set up stack method
var stack = d3.stack()
				.keys([ "apples", "oranges", "grapes" ])
				.order(d3.stackOrderDescending);

var svg = d3.select("#barchart")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

var color = d3.schemeCategory10;

var xScale = d3.scaleTime()
				.domain([
					// d3.min(series, function(d) { return d.date; }),
					// d3.max(series, function(d) { return d.date; })
					0, w
				])
				.range([0, w]);

var yScale = d3.scaleLinear()
				.domain([0, 100
				])
				.range([h, 0]);

//'series', the array formerly known as 'dataset'
// var dataset = [
// 	[ [ 0, 5], [ 0, 4], [ 0, 2], [ 0, 7], [ 0, 23] ], // apples
// 	[ [ 5, 15], [ 4, 16], [ 2, 21], [ 7, 30], [23, 40] ], // oranges
// 	[ [15, 37], [16, 44], [21, 53], [30, 65], [40, 83] ] // grapes
// ];

var series = stack(dataset);


// Add a group for each row of data
var groups = svg.selectAll("g")
				.data(series)
				.enter()
				.append("g")
				.style("fill", function(d, i) {
					return color[i];
				});

// Add a rect for each data value
var rects = groups.selectAll("rect")
					.data(function(d) { return d; })
					.enter()
					.append("rect")
					.attr("x", function(d, i) {
						return xScale(i);
					})
					.attr("y", function(d) {
						return yScale(d[1]);
					})
					.attr("height", function(d) {
						return yScale(d[0]) - yScale(d[1]);
					})
					.attr("width", 50)
					.attr("transform", function(d, i) {
						return "translate(" +  + ")";
					})
