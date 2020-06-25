
function getTally(copy){
  //define the new array of tallied cities
  let cityTally = []
    // sort data city
    copy.sort((a, b) => {
      return a.city > b.city ? 1 : -1;
    });
    // loop through cities and tally
    for ( let city of copy) {
      let last = cityTally[cityTally.length-1];
      copy = (last && last.city === city.city) ? last.tally++ : cityTally.push({ city: `${city.city}`, tally: 1 });
      console.log(cityTally);   
    }
  
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
		d3.select('body').selectAll('h2').data(data).enter().append('h2').text((d) => d.city);
	});

//create svg
