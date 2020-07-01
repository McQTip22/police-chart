function getTally(copy) {
	//define the new array of tallied cities
	var cityCount = [];
	// sort data city
	copy.sort((a, b) => {
		return a.city > b.city ? 1 : -1;
	});
	// loop through cities and tally
	for (let city of copy) {
		let last = cityCount[cityCount.length - 1];
		copy = last && last.city === city.city ? last.count++ : cityCount.push({ city: `${city.city}`, count: 1 });
	}
	//set dimensions
	let w = 1000;
	let h = 600;

	//attach svg
	let svg = d3.select('.words').append('svg').attr('width', w).attr('height', h);

	var layout = d3.layout
		.cloud()
		.size([ w, h ])
		.words(
			cityCount.map(function(d) {
				return { text: d.city };
			})
		)
		.padding(5)
		.fontSize(20)
		.on('end', draw);
	layout.start();

	function draw(words) {
		svg
			.append('g')
			.attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
			.selectAll('text')
			.data(words)
			.enter()
			.append('text')
			.style('font-size', function(d) {
				return d.size + 'px';
			})
			.attr('text-anchor', 'middle')
			.attr('transform', function(d) {
				return 'translate(' + [ d.x, d.y ] + ')rotate(' + d.rotate + ')';
			})
			.text(function(d) {
				return d.text;
			});
	}
}

// get data from csv
d3
	.csv('./data.csv', function(d) {
		return {
			city: `${d.City}, ${d.State}`
		};
	})
	//clone data so I am not messing with source

	.then(function(data) {
		const copy = [ ...data ];
		getTally(copy);
	});

//create svg
