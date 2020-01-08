var data = [];
var mygui;

var barchart_width = 800;
var barchart_height = 400;
var padding = 20;

function readyState(){
	mygui = new dat.GUI();
	datControls();
	scatterPlot();
}


function datControls(){
	mygui['data1'] = 300;
	mygui['data2'] = 150;
	mygui['data3'] = 240;
	mygui['data4'] = 90;
	mygui['data5'] = 320;
	mygui['data6'] = 400;
	mygui['data7'] = 120;
	mygui['data8'] = 120;
	mygui['data9'] = 400;
	mygui['data10'] = 200;
	mygui['data11'] = 30;
	mygui['data12'] = 360;
	mygui['data13'] = 250;
	mygui['data14'] = 200;
	mygui['data15'] = 390;
	mygui['data16'] = 100;
	mygui['Chart Type'] = 'bar chart';
	mygui.add(mygui, 'data1', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data2', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data3', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data4', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data5', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data6', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data7', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data8', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data9', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data10', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data11', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data12', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data13', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data14', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data15', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data16', 30, 500).step(1).onFinishChange(()=>{scatterPlot();});

}

function scatterPlot() {

	document.getElementById('barchart').innerHTML = '';

	data.push([mygui.data, mygui.data2],
				[mygui.data3, mygui.data4],
				[mygui.data5, mygui.data6],
				[mygui.data7, mygui.data8],
				[mygui.data9, mygui.data10],
				[mygui.data11, mygui.data12],
				[mygui.data13, mygui.data14],
				[mygui.data15, mygui.data16])

	var svg = d3.select('#barchart')
				.append('svg')
				.attr('height', barchart_height)
				.attr('width', barchart_width)

	//Create scales
	var x_scale = d3.scaleLinear()
					.domain([0, d3.max(data, function(d){
						return d[0];
					})])
					.range([0, barchart_width]);

	var y_scale = d3.scaleLinear()
					.domain([0, d3.max(data, function(d){
						return d[1];
					})])
					.range([0, barchart_height]);


	//create axis
	var x_axis = d3.axisBottom(x_scale)
					.ticks(3);//ticks will add gap between the labels


		svg.append('g')//grouping
			.attr('class', 'x-axis')
			.attr('transform', 'translate(0,'+ (barchart_height - padding) +')')
			.call(x_axis);

		//Create circle
		svg.selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.attr('cx', function(d) {
				return x_scale(d[0]);
			})
			.attr('cy', function(d) {
				return y_scale(d[1]);
			})
			.attr('r', function(d) {
				return d[1] / 10;
			})
			.attr('fill', 'grey');


			//Create labels
			svg.append('g').selectAll('text')
			.data(data)
			.enter()
			.append('text')
			.text(function(d){
				return d.join(',');
			})
			.attr('x', function(d){
				return x_scale(d[0]);
			})
			.attr('y', function(d){
				return y_scale(d[1]);
			})
}
