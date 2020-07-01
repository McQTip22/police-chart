
function getTally(copy){
  //define the new array of tallied cities
  var cityCount = []
    // sort data city
    copy.sort((a, b) => {
      return a.city > b.city ? 1 : -1;
    });
    // loop through cities and tally
    for ( let city of copy) {
      let last = cityCount[cityCount.length-1];
      copy = (last && last.city === city.city) ? last.count++ : cityCount.push({ city: `${city.city}`, count: 1 });
    }
    d3.select('body').selectAll('h2').data(cityCount).enter().append('h2').text((d) => d.city + '   =>   ' + d.count);
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
    const copy = [...data]
		getTally(copy);
    
		
	});

//create svg
