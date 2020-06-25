function getTally(cleanData){
    cleanData.sort((a, b) => {
      return a.city > b.city ? 1 : -1;
    });
    console.log(cleanData);
  }

// get data from csv
d3
	.csv('./data.csv', function(d) {
		return {
			city: (`${d.City}, ${d.State}`)
		};
	})

  //clone data so I am not messing with source
  

	.then(function(data) {
    const cleanData = [...data]
		getTally(cleanData);
		d3.select('body').selectAll('h2').data(data).enter().append('h2').text((d) => d.city);
	});

//create svg
