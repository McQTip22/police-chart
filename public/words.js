//tally number of instances per city
function tally(data) {
	var sorted = data.sort((a, b) => {
		return a.city > b.city ? 1 : -1;
	});
	var newData = [];
	for (var i = 0; i < sorted.length; i++) {
		var last = data[data.length - 1];
		if (last && last.city === sorted[i]) last.tally++;
		else
			data.push({
				city: sorted[i],
				tally: 1
			});
	}
	console.log(newData);
}

//increase text size due to increased instanced

// get data from csv
d3
	.csv('./data.csv', function(d) {
		return {
			city: d.City,
			state: d.State
		};
	})
	.then(function(data) {
		tally(data);
		d3.select('body').selectAll('h2').data(data).enter().append('h2').text((d) => d.city + ', ' + d.state);
	});

//create svg
