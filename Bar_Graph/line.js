//d3.v5

var h = 300;
var w = 400;
var svg;
var mygui;
//Date formats
var time_parse = d3.timeParse('%Y');//converting the year to the date objects
var time_format = d3.timeFormat('%Y');//converting the date object to the year

var barchart_width = 800;
var barchart_height = 600;
var padding = 40;

function readyState() {
	mygui = new dat.GUI();
	datControls();
	showLineChart();
}

function datControls() {
	mygui['date1'] = 2001;
	mygui['date2'] = 2002;
	mygui['date3'] = 2003;
	mygui['date4'] = 2004;
	mygui['date5'] = 2005;
	mygui['date6'] = 2006;
	mygui['date7'] = 2007;
	mygui['date8'] = 2008;
	mygui['date9'] = 2009;
	mygui['date10'] = 2010;
	mygui['date11'] = 2011;
	mygui['date12'] = 2012;
	//number
	mygui['number1'] = 20;
	mygui['number2'] = 14;
	mygui['number3'] = 20;
	mygui['number4'] = 21;
	mygui['number5'] = 15;
	mygui['number6'] = 22;
	mygui['number7'] = 9;
	mygui['number8'] = 6;
	mygui['number9'] = 23;
	mygui['number10'] = 7;
	mygui['number11'] = 40;
	mygui['number12'] = 45;

	mygui.add(mygui, 'date1', 2001, 2015).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'date2', 2002, 2015).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'date3', 2003, 2015).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'date4', 2004, 2015).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'date5', 2005, 2015).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'date6', 2006, 2015).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'date7', 2007, 2015).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'date8', 2008, 2015).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'date9', 2009, 2015).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'date10', 2010, 2015).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'date11', 2011, 2015).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'date12', 2012, 2015).step(1).onFinishChange(()=>{showLineChart();});


	mygui.add(mygui, 'number1', 1, 50).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'number2', 1, 50).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'number3', 1, 50).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'number4', 1, 50).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'number5', 1, 50).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'number6', 1, 50).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'number7', 1, 50).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'number8', 1, 50).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'number9', 1, 50).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'number10', 1, 50).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'number11', 1, 50).step(1).onFinishChange(()=>{showLineChart();});
	mygui.add(mygui, 'number12', 1, 50).step(1).onFinishChange(()=>{showLineChart();});
}

var data = [];

function loadData() {
	data.push({'date': mygui['date1'], 'number': mygui['number1']},
				{'date': mygui['date2'], 'number': mygui['number2']},
				{'date': mygui['date3'], 'number': mygui['number3']},
				{'date': mygui['date4'], 'number': mygui['number4']},
				{'date': mygui['date5'], 'number': mygui['number5']},
				{'date': mygui['date6'], 'number': mygui['number6']},
				{'date': mygui['date7'], 'number': mygui['number7']},
				{'date': mygui['date8'], 'number': mygui['number8']},
				{'date': mygui['date9'], 'number': mygui['number9']},
				{'date': mygui['date10'], 'number': mygui['number10']},
				{'date': mygui['date11'], 'number': mygui['number11']},
				{'date': mygui['date12'], 'number': mygui['number12']}
	);

}


function showLineChart() {

	document.getElementById('barchart').innerHTML = '';
	data = [];
	loadData();

	data.forEach(function(d, i) {
		data[i].date = time_parse(d.date);
	});

	var x_scale = d3.scaleTime()
					.domain([
						d3.min(data, function(d) {
							return d.date;
						}),
						d3.max(data, function(d) {
							return d.date;
						})
					])
					.range([padding, barchart_width - padding]);

	var y_scale = d3.scaleLinear()
					.domain([
						0, d3.max(data, function(d) {
							return d.number;
						})
					])
					.range([barchart_height - padding, padding]);

	//creating elements
	svg = d3.select('#barchart')
				.append('svg')
				.attr('height', barchart_height)
				.attr('width', barchart_width);


	//creating axis
	var x_axis = d3.axisBottom(x_scale)
					.ticks(10)
					.tickFormat(time_format);

	var y_axis = d3.axisLeft(y_scale)
					.ticks(8);

	//Draw and position the axis
	svg.append('g')
		.attr('transform', 'translate(0,'+(barchart_height - padding)+')')
		.call(x_axis);

	svg.append('g')
		.attr('class', 'y-axis')
		.attr('transform', 'translate('+padding+', 0)')
		.call(y_axis);

	//creating a line
	var line = d3.line()
				.defined(function(d) {
					return d.number >= 0;
				})
				.x(function(d) {
					return x_scale(d.date);
				})
				.y(function(d) {
					return y_scale(d.number);
				});

	svg.append('path')
		.datum(data)
		.attr('fill', 'none')
		.attr('stroke', 'green')
		.attr('stroke-width', 5)
		.attr('d',line);


		svg.append('text')
			.data(data)
			.enter()
			.text(function(d) {
				return d;
			})
			.attr('x', function(d) {
				return x_scale(d.date);
			})
			.attr('y', function(d) {
				return y_scale(d.number);
			})
			.attr('fill', 'white');


	//creating circle at point
	svg.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', function(d) {
			return x_scale(d.date);
		})
		.attr('cy', function(d) {
			return y_scale(d.number);
		})
		.attr('r', function(d) {
			return 5;
		})
		.attr('fill', 'black')
		.attr('stroke', 'black')
		.attr('stroke-width', 2);

}
