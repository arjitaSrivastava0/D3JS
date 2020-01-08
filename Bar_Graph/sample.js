var mygui;
function readyState() {
	mygui = new dat.GUI();
	datControls();
	showBarChart();
}

function datControls(){
	mygui['data1'] = 54;
	mygui['data2'] = 30;
	mygui['data3'] = 24;
	mygui['data4'] = 76;
	mygui['data5'] = 34;
	mygui['data6'] = 60;
	mygui['data7'] = 40;
	mygui['data8'] = 70;
	mygui['data9'] = 50;
	mygui['data10'] = 68;
	mygui['data11'] = 49;
	mygui['data12'] = 58;
	mygui['data13'] = 64;
	mygui['data14'] = 20;
	mygui['data15'] = 45;
	mygui['data16'] = 72;
	mygui['Chart Type'] = 'bar chart';
	mygui.add(mygui, 'data1', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data2', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data3', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data4', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data5', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data6', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data7', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data8', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data9', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data10', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data11', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data12', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data13', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data14', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data15', 1, 80).step(1).onFinishChange(()=>{showBarChart();});
	mygui.add(mygui, 'data16', 1, 80).step(1).onFinishChange(()=>{showBarChart();});

	mygui.add(mygui, 'Chart Type', ['bar chart', 'pie chart']).onFinishChange(()=>{toggleChart();});
}

function toggleChart() {
	var chartType = mygui['Chart Type'];
	console.log(chartType);
	switch (chartType) {
		case 'bar chart':
			showBarChart();
			break;
		case 'pie chart':
			showPieChart();
			break;
		default: 'Provide correct chart type.'

	}
}

var barchart_width = 800;
var barchart_height = 400;
function showBarChart() {

	document.getElementById('barchart').innerHTML = '';
	var data = [];
	var bar_padding = 5;

	data.push(mygui['data1'], mygui['data2'], mygui['data3'], mygui['data4'], mygui['data5'], mygui['data6'],
			mygui['data7'], mygui['data8'], mygui['data9'], mygui['data10'], mygui['data11'], mygui['data12'],
			mygui['data13'], mygui['data14'], mygui['data15'], mygui['data16']);

	// for (var i = 0; i < 20; i++) {
	// 	//var num = Math.floor(Math.random() * 60);
	// 	//randomUniform function takes minimum and maximum value
	// 	var num = Math.floor(d3.randomUniform(1, 60)());//() this extra bracket will call the function again
	// 	data.push(num);
	// }

	var svg = d3.select('#barchart')
				.append('svg')
				.attr('id', 'svgElement')
				.attr('width', barchart_width)
				.attr('height', barchart_height);

	//Binding the data creating the bars

	//d3.select('#barchart')
	svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
	//d is the data and i is the index
		.attr('x', function(d, i) {//to give it some space between them
			return i*(barchart_width/data.length);
		})
		//to make it up side down
		.attr('y', function(d) {
			return barchart_height - d * 5
		})
		.attr('width', barchart_width/data.length - bar_padding)
		.attr('height', function(d) {
			return d * 5;
		})
		.attr('fill', 'grey');

	//Adding labels

	svg.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.text(function(d) {
			return d;
		})
		.attr('x', function(d, i) {//to give it some space between them
			return i*(barchart_width/data.length) + 5;
		})
		.attr('y', function(d) {
			return barchart_height - d * 5 + 15
		})
		.attr('fill', 'white')
}

function showPieChart() {
	//load json file
	document.getElementById('barchart').innerHTML = '';

		var svg = d3.select('#barchart')
					.append("svg")
					.attr('width', barchart_width)
					.attr('height', barchart_height);

		d3.json('ufo-types.json', function(data){
			manually(data, 300, 250);
		});

}
function manually(data, x, y) {
	//sorting the data
	data = data.sort(function(a, b){
		return d3.descending(a.value, b.value);
	});

	var colors = d3.scale.category20c();
	var total = d3.sum(data.map(function (d) { return d.value; }));
	var offset = function(d, i){
		return d3.sum(data.slice(0, i).map(function(d) {
			return 2*Math.PI * (d.value/total);
		}));
	};
	var arc = d3.svg.arc()
				.outerRadius(150)
				.startAngle(offset)
				.endAngle(function(d, i) {
					return offset(d, i) + 2*Math.PI*(d.value/total);
				});

	var slice = svg.selectAll('.slice')
					.data(data)
					.enter()
					.append('g')
					.attr('transform', 'translate('+x+", "+y+")");

		slice.append('path')
			.attr({d: arc,
				fill: function(d, i){ return colors(i);},
				title: function(d) {return d.label +"("+d.value+")";}
			});
}
