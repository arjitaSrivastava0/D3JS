var data = [
	{name: 'news', parent: ''},//the should not be any space between quotes''

	{name: 'tech', parent: 'news'},
	{name: 'sport', parent: 'news'},
	{name: 'music', parent: 'news'},

	//tech
	{name: 'ai', parent: 'tech', amount: 7},
	{name: 'coding', parent: 'tech', amount: 5},
	{name: 'tablets', parent: 'tech', amount: 4},
	{name: 'laptops', parent: 'tech', amount: 6},
	{name: 'd3', parent: 'tech', amount: 3},
	{name: 'gaming', parent: 'tech', amount: 3},

	//sport
	{name: 'football', parent: 'sport', amount: 6},
	{name: 'hockey', parent: 'sport', amount: 3},
	{name: 'baseball', parent: 'sport', amount: 5},
	{name: 'tennis', parent: 'sport', amount: 6},
	{name: 'f1', parent: 'sport', amount: 1},

	//music
	{name: 'house', parent: 'music', amount: 3},
	{name: 'rock', parent: 'music', amount: 2},
	{name: 'punk', parent: 'music', amount: 5},
	{name: 'jazz', parent: 'music', amount: 2},
	{name: 'pop', parent: 'music', amount: 3},
	{name: 'classical', parent: 'music', amount: 5}

];

//svg
var svg = d3.select('#barchart')
			.append('svg')
			.attr('width', 1060)
			.attr('height', 600);

//graph group
var graph = svg.append('g')
				.attr('transform', 'translate(50, 50)');//margin

//stratify
var stratify = d3.stratify()
				.id(d => d.name)
				.parentId(d => d.parent);

//all the data will be in order
var rootNode = stratify(data)
				.sum(d => d.amount);//radius

//pack generator for bubble pack, big circle
var pack = d3.pack()
			.size([960, 550])//width and height
			.padding(5);

//descendants will give the data in an array format
var bubbleData = pack(rootNode).descendants();

//ordinal scala
var colors = d3.scaleOrdinal(['grey', 'black', 'purple']);

//join data amd add group for each node

var nodes = graph.selectAll('g')
				.data(bubbleData)
				.enter()
				.append('g')
				.attr('transform', d => `translate(${d.x}, ${d.y})`);

	nodes.append('circle')
		.attr('r', d => d.r)
		.attr('stroke', 'white')
		.attr('stroke-width', 2)
		.attr('fill', d => colors(d.depth));


	nodes.filter(d => !d.children)// if no children  is there returns true
		.append('text')
		.attr('text-anchor', 'middle')
		.attr('dy', '0.3em')//offset in y direction
		.attr('fill', 'black')
		.style('font-size', d => d.value*5)
		.text(d => d.data.name)
