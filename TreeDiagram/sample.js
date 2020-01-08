var treeData = {
	"name": "Level 1",
	"children": [{
		"name": "Level 2: A",
		"children": [
			{"name": "Level 3: A"},
			{"name": "Level 3: B"}
		]},
		{"name": "Level 2: B"}
	]
}

//dimentions of diagram
var barchart_width = 800;
var barchart_height = 400;
var padding = 60;

var svg = d3.select('#barchart')
			.append('svg')
			.attr('height', barchart_height)
			.attr('width', barchart_width)
			.append('g')
			.attr('transform', 'translate('+ padding +', 0)');

var i = 0,
	duration = 750,
	root;

//declares a tree layout and assigns the size
var treemap = d3.tree().size([barchart_height, barchart_width]);

//Assigns parent, children, barchart_height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = barchart_height/2;
root.y0 = 0;

update(root);

function update(source) {
	var treeData = treemap(root);
	var nodes = treeData.descendants();// this is like parent children...
	var links = treeData.descendants().splice(1);

	nodes.forEach(function(d){
		d.y = d.depth * 180;//random number
	});

	//NODES
	var node = svg.selectAll('g.node')
					.data(nodes, function(d) {
						return d.id || (d.id = ++i);
					});

	var nodeEnter = node.enter()
						.append('g')
						.attr('class', 'node')
						.attr('transform', function(d) {
							return 'translate('+source.y0+ ',' + source.x0+ ')'
						})
						.on('click', click);

	//Add circles to the NODES
	nodeEnter.append('circle')
			.attr('class', 'node')
			.attr('r', 6);

	//Add labesl for the node
	nodeEnter.append('text')
			.attr('x', function(d) {
				return d.children || d._children ? -13 : 13
			})
			.text(function(d) {
				return d.data.name;
			});


	//update
	var nodeUpdate = nodeEnter.merge(node);

	nodeUpdate.trasition()
				.duration(duration)
				.attr('transform', function(d) {
					return 'translate('+d.y+','+d.x+')';
				});

	nodeUpdate.selectAll('circle.node')
				.attr('r', 10)
				.attr('cursor', 'pointer')

	//REmove any existing NODES

	var nodeExit = node.exit()
						.trasition()
						.duration(duration)
						.attr('transform', function(d) {
							return 'translate('+source.y+','+source.x+')';
						})
						.remove()

		nodeExit.select('circle')
				.attr('r', 6);
		nodeExit.select('text')
				.attr('fill-opacity', 6);




	function click(d) {
		if(d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}

		update(d);
	}

}
