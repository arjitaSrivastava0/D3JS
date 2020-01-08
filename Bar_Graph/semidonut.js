var w = 400; var h = 400;

var transportation = [
		{ 'mean': 'Car' , 'value': 70 },
		{ 'mean': 'Bus' , 'value': 60 },
		{ 'mean': 'Walk', 'value': 20 },
		{ 'mean': 'Train', 'value': 50}
];

var colors = d3.schemeCategory10;

var svg = d3.select('#barchart')
			.append('svg')
			.attr('width', w)
			.attr('height', h);

//Define the pie layout
	var pie = d3.pie()
				.startAngle(-0.5*Math.PI)
				.endAngle(0.5*Math.PI)
				.padAngle(0.04)
				.sort(null)
				.value(function(d) { return d.value; });

//Define an arc generator
	var arc = d3.arc()
			//simple semidonut //
			//.innerRadius(40)
			// .outerRadius(150)

			//Slightly chaotic semidonut
			.innerRadius(function(d,i){ return 30 + 20 * i;})
			.outerRadius(function(d,i){ return 120 + 20 * i;})
			.startAngle(function(d) { return d.startAngle; })
			.endAngle(function(d) { return d.endAngle; });

//Use the layout and generator in drawing the char
	svg = svg.selectAll('path')
			.data(pie(transportation))
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', function(d, i){ return colors[i]; })
			.attr('transform', 'translate('+w/2+','+h/2+')');
