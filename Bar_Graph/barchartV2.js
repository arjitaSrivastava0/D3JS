var w = 300;
var h = 300;
var outerRadius = w / 2;
//full circle
// var innerRadius = 0;
//pipe like chart
var innerRadius = w/3;

var dataset = [ 5, 10, 20, 45, 6, 25 ];

var pie = d3.pie();

var color = d3.schemeCategory10;

var arc = d3.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius);

var svg = d3.select("#barchart")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

//Set up groups
var arcs = svg.selectAll("g.arc")
				.data(pie(dataset))
				.enter()
				.append("g")
				.attr("class", "arc")
				.attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

	//Draw arc paths
	arcs.append("path")
		.attr("fill", function(d, i) {
			return color[i];
		})
		.attr("d", arc)
		.attr("d", function(d, i) {
			return arc(d, i);
		});

		var color = d3.scaleOrdinal(d3.schemeCategory10);

	arcs.append("text")
		.attr("transform", function(d) {
			return "translate(" + arc.centroid(d) + ")";
		})
		.attr("text-anchor", "middle")
		.text(function(d) {
			return d.value;
		});
