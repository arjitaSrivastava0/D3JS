//load json file

var data = [];
var mygui;

function readyState() {
	mygui = new dat.GUI();
	datControls();
	pieChart();
}


function datControls() {
	mygui['label1'] = 'Unspecified';
	mygui['label2'] = 'Changing';
	mygui['label3'] = 'Chevron';
	mygui['label4'] = 'Cigar';
	mygui['label5'] = 'Circle';
	mygui['label6'] = 'Cone';
	mygui['label7'] = 'Crescent';
	mygui['label8'] = 'Delta';
	mygui['label9'] = 'Diamond';
	mygui['label10'] = 'Disk';
	mygui['label11'] = 'Dome';
	mygui['label12'] = 'Fireball';

	//value
	mygui['value1'] = 3027; mygui['value2'] = 2150; mygui['value3'] = 1011;
	mygui['value4'] = 2262; mygui['value5'] = 8498; mygui['value6'] = 369;
	mygui['value7'] = 2; mygui['value8'] = 8; mygui['value9'] = 1311;
	mygui['value10'] = 6042; mygui['value11'] = 1; mygui['value12'] = 6585;


	mygui.add(mygui, 'label1').onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'label2').onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'label3').onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'label4').onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'label5').onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'label6').onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'label7').onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'label8').onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'label9').onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'label10').onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'label11').onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'label12').onFinishChange(()=>{pieChart();});


	mygui.add(mygui, 'value1', 1, 5000).step(10).onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'value2', 1, 5000).step(10).onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'value3', 1, 5000).step(10).onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'value4', 1, 5000).step(10).onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'value5', 1, 5000).step(10).onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'value6', 1, 5000).step(10).onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'value7', 1, 5000).step(10).onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'value8', 1, 5000).step(10).onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'value9', 1, 5000).step(10).onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'value10', 1, 5000).step(10).onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'value11', 1, 5000).step(10).onFinishChange(()=>{pieChart();});
	mygui.add(mygui, 'value12', 1, 5000).step(10).onFinishChange(()=>{pieChart();});
}


function loadData() {

	document.getElementById('barchart').innerHTML = '';
	data = [];

	data.push({'label': mygui['label1'], 'value': mygui['value1']},
				{'label': mygui['label2'], 'value': mygui['value2']},
				{'label': mygui['label3'], 'value': mygui['value3']},
				{'label': mygui['label4'], 'value': mygui['value4']},
				{'label': mygui['label5'], 'value': mygui['value5']},
				{'label': mygui['label6'], 'value': mygui['value6']},
				{'label': mygui['label7'], 'value': mygui['value7']},
				{'label': mygui['label8'], 'value': mygui['value8']},
				{'label': mygui['label9'], 'value': mygui['value9']},
				{'label': mygui['label10'], 'value': mygui['value10']},
				{'label': mygui['label11'], 'value': mygui['value11']},
				{'label': mygui['label12'], 'value': mygui['value12']}
	);

}

function pieChart() {

	loadData();

	var x = 300, y = 250;

	var svg = d3.select('#barchart')
			.append("svg")
			.style({
				width: '100%',
				height: 500
			});

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

	var slice = svg.selectAll('graph')
					.data(data)
					.enter()
					.append('g')
					.attr('transform', 'translate('+x+", "+y+")");

	slice.append('path')
			.attr({d: arc,
				fill: function(d, i){ return colors(i);},
				title: function(d) {return d.label +"("+d.value+")";}});

}
