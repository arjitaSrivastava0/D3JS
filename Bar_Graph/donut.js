var w = 200; var h = 200;

var svg = d3.select('#barchart')
			.append('svg')
			.attr('width', w)
			.attr('height', h);

var colors = d3.schemeCategory10;

var arc = d3.arc()
				.innerRadius(30)
				.outerRadius(80)
				.startAngle(function(d) { return d['start']; })
				.endAngle(function(d) { return d['end']; })

	svg.selectAll('path')
		.data([
			{'start': 0, 'end': Math.PI},
			{'start': Math.PI, 'end': 2*Math.PI}
		])
		.enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', function(d, i){ return colors[i];})
		.attr('stroke', '#FFFFFF')
		.attr('stroke-width', '3px')
		.attr('transform', 'translate('+w/2+','+h/2+')');
