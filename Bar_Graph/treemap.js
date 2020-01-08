var nybudget = {
	'name': 'NYC Budget 2015' , 'children': [
		{'name': 'Personal Services',
			'children': [
				{'name': 'Salaries and Wages', 'value': 24023},
				{'name': 'Pensions', 'value': 8621},
				{'name': 'Fringe Benefits', 'value': 8635},
				{'name': 'Retiree Health Benefits', 'value': 955},
			]
		},
		{'name': 'Other Services',
			'children': [
				{'name': 'Medical Assistance', 'value': 6275},
				{'name': 'Public Assistance', 'value': 1472},
				{'name': 'All Other ', 'value': 25149},
			]
		},
		{'name': 'Debt Service', 'value': 5971},
	]
};

var w = 800, h = 250;
var svg = d3.select('#barchart')
			.append('svg')
			.attr('width', w)
			.attr('height', h);

var colors = d3.schemeCategory10;

var tm = d3.treemap().size([w, h]);

	svg.selectAll("rect")
		.data(tm(nybudget))
		.enter()
		.append("rect")
		.attr("x", function(d,i){ return d.x; })
		.attr("y", function(d,i){ return d.y; })
		.attr("width", function(d,i){ return d.dx; })
		.attr("height", function(d,i){ return d.dy; })
		.attr("fill", function(d,i){
			if (d.parent) {
				return colors[d.parent.name];
			}
		})
		.attr("stroke", "#FFF")
		.attr("stroke-width", 2);

	svg.selectAll("text")
		.data(tm(nybudget))
		.enter()
		.append("text")
		.attr("x", function(d,i){ return (d.x + 0.5*d.dx); })
		.attr("y", function(d,i){ return (d.y + 0.5*d.dy); })
		.text(function(d,i){
			// If it has children, don’t write its name
			return d.children? "" : d.name ;
		})
		.style("text-anchor", "middle")
		.attr("font-size", "8")
		.style("fill", "#FFF");


	// svg.selectAll("ellipse")
	// 	.data(nybudget)
	// 	.enter()
	// 	.append("ellipse")
	// 	.attr("cx", function(d,i){ return (d.x + 0.5 * d.dx); })
	// 	.attr("cy", function(d,i){ return (d.y + 0.5 * d.dy); })
	// 	.attr("rx", function(d,i){ return 0.5*d.dx; })
	// 	.attr("ry", function(d,i){ return 0.5*d.dy; })
	// 	.attr("fill", function(d,i){
	// 		if (d.children) {
	// 			return '#FFF';
	// 		} else {
	// 			return colors[d.parent.name];;
	// 		}
	// 	})
	// 	.attr("stroke", "#FFF")
	// 	.attr("stroke-width", 2);
