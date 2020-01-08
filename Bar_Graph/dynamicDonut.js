var transportation = [];
var mygui;
var w = 400; var h = 300;

function readyState() {
	mygui = new dat.GUI();
	datControl();
}

function datControl() {
	mygui['Application'] = 'Transportation';
	mygui['Source Name'] = '';
	mygui['Source Value'] = 10;
	mygui['Add Data'] = addSourceInData;

	mygui.add(mygui, 'Application');
	mygui.add(mygui, 'Source Name');
	mygui.add(mygui, 'Source Value', 10, 100).step(5);
	mygui.add(mygui, 'Add Data');
}

function addSourceInData() {
	var name = mygui['Source Name'];
	var value = mygui['Source Value'];

	transportation.push({'name': name, 'value': value});
	// console.log(transportation);
	dynamicDonut();
}

function dynamicDonut() {
	document.getElementById('barchart').innerHTML = '';

	var svg = d3.select('#barchart')
				.append('svg')
				.attr('width', w)
				.attr('height', h)
				.attr('id', 'svgElm')


	var colors = d3.schemeCategory10;


	var pie = d3.pie()
				.startAngle(0)
				.endAngle(2*Math.PI)
				.sort(null)
				.value(function(d) { return d.value; });

	var arc = d3.arc()
					.innerRadius(30)
					.outerRadius(80)
					.startAngle(function(d) { return d.startAngle; })
					.endAngle(function(d) { return d.endAngle; })

		svg.selectAll('path')
			.data(pie(transportation))
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', function(d, i){ return colors[i];})
			.attr('stroke', '#FFFFFF')
			.attr('stroke-width', '3px')
			.attr('transform', 'translate('+w/2+','+h/2+')');

}
