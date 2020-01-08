var data = [];
var mygui;

var barchart_width = 900;
var barchart_height = 450;
var padding = 20;

function readyState(){
	mygui = new dat.GUI();
	datControls();
	scatterPlot();
}


function datControls(){
	mygui['data1'] = 150;
	mygui['data2'] = 150;
	mygui['data3'] = 158;
	mygui['data4'] = 90;
	mygui['data5'] = 217;
	mygui['data6'] = 150;
	mygui['data7'] = 120;
	mygui['data8'] = 120;
	mygui['data9'] = 120;
	mygui['data10'] = 168;
	mygui['data11'] = 95;
	mygui['data12'] = 116;
	mygui['data13'] = 269;
	mygui['data14'] = 199;
	mygui['data15'] = 158;
	mygui['data16'] = 120;
	mygui.add(mygui, 'data1', 30, 350).step(10).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data2', 30, 350).step(10).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data3', 30, 350).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data4', 30, 350).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data5', 30, 350).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data6', 30, 350).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data7', 30, 350).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data8', 30, 350).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data9', 30, 350).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data10', 30,350).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data11', 30, 350).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data12', 30, 350).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data13', 30, 350).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data14', 30, 350).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data15', 30, 350).step(1).onFinishChange(()=>{scatterPlot();});
	mygui.add(mygui, 'data16', 30, 350).step(1).onFinishChange(()=>{scatterPlot();});

}

function scatterPlot() {

	document.getElementById('barchart').innerHTML = '';
	data = [];

	data.push([mygui.data1, mygui.data2],
				[mygui.data3, mygui.data4],
				[mygui.data5, mygui.data6],
				[mygui.data7, mygui.data8],
				[mygui.data9, mygui.data10],
				[mygui.data11, mygui.data12],
				[mygui.data13, mygui.data14],
				[mygui.data15, mygui.data16]);

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
					.ticks(10);//ticks will add gap between the labels

		svg.append('g')//grouping
			.attr('class', 'x-axis')
			.attr('transform', 'translate(0,'+ (barchart_height - padding) +')')
			.call(x_axis);

	var y_axis = d3.axisLeft(y_scale)
					.ticks(5)
					.tickFormat(function(d) {
						return d + '%';
					});


		svg.append('g')//grouping
			.attr('class', 'y-axis')
			.attr('transform', 'translate('+50+', 0)')
			.call(y_axis);

		//Create circle
		svg.selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.attr('cx', function(d) {
				return x_scale(d[0]-10);
			})
			.attr('cy', function(d) {
				return y_scale(d[1]-20);
			})
			.attr('r', function(d) {
				return d[1] / 10;
			})
			.attr('fill', 'grey');


			//Create labels
			svg.append('g')
				.selectAll('text')
				.data(data)
				.enter()
				.append('text')
				.text(function(d){
					return d.join(',');
				})
				.attr('x', function(d){
					return x_scale(d[0]-10);
				})
				.attr('y', function(d){
					return y_scale(d[1]-20);
				})

}
