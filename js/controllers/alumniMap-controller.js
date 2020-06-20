// create alumniMap controller
app.controller('alumniMap-controller', function($scope, $firebaseArray) {

	$scope.id = "alumniMap";
	$scope.title = "alumni map";
   
});

// Alumni Map js functions: ----------------------------------------------------

async function get_lat_and_lon(location) {

	try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=c8cb98d4f05e49e99c912cf8caa51054`

    return await fetch(
    	url,
    	{ method: 'GET' }
  	)
  	.then( response => response.json() )
  	.then( json => {
  		results = json["results"]
  		if (results.length > 0){
  			result = results[0];
  			lat = parseFloat(result["geometry"]["lat"]);
  			lon = parseFloat(result["geometry"]["lng"]);
  			return [lat, lon];
  		} else {
  			throw new Error('No Results');
  		}
  	})
  	.catch( error => console.error('Error fetching lat & lon:', error) );

	} catch (err) {
    	console.log(`opencagedata API error: ${err}`);

    	return {};
 	}
}

async function process_results(results) {
  var name_list = {}
  var organized_by_alumn = {};

    results.forEach(element => {
      alumn = element["what's your name?"];
      year = element["what's your class year? (write 97 for class of 1997, and so forth!)"];
      us = element["are you in the us?"];
      timestamp = Date.parse(element["timestamp"]);

      if (us == "Yes"){
        city = element["what city are you in?"];
        state = element["what state are you in?"];

        if (alumn in organized_by_alumn) {
          if (organized_by_alumn[alumn]["timestamp"] < timestamp){
            organized_by_alumn[alumn] = {
            "location": city+", "+state,
            "timestamp": timestamp,
            "year": year
            };
          }
        }else{
          organized_by_alumn[alumn] = {
          "location": city+", "+state,
          "timestamp": timestamp,
          "year": year
          };
        }

        if (alumn in name_list) {
          if (name_list[alumn]["timestamp"] < timestamp){
            name_list[alumn] = {
            "location": city+", "+state,
            "timestamp": timestamp,
            "year": year
            };
          }
        }else{
          name_list[alumn] = {
          "location": city+", "+state,
          "timestamp": timestamp,
          "year": year
          };
        }
      } else {

        if (alumn in organized_by_alumn) {
          if (organized_by_alumn[alumn]["timestamp"] < timestamp){
            delete organized_by_alumn[alumn];
          }
        }

        place = element["where are you? (city, country)"];
        if (alumn in name_list) {
          if (name_list[alumn]["timestamp"] < timestamp){
            name_list[alumn] = {
            "location": place,
            "timestamp": timestamp,
            "year": year
            };
          }
        }else{
          name_list[alumn] = {
          "location": place,
          "timestamp": timestamp,
          "year": year
          };
        }
      }

      });
    
    organized_by_location = {};

    for (let [alumn, val] of Object.entries(organized_by_alumn)) {
        loc = val.location;
        year = val.year;
        alumn_with_year = alumn + " '"+year;
        if (loc in organized_by_location){
          organized_by_location[loc].push(alumn_with_year);
        }else{
          organized_by_location[loc] = [alumn_with_year];
        }
    }
    
    bubble_list = []
    for (let [loc, alumn_list] of Object.entries(organized_by_location)) {

      let geo = await get_lat_and_lon(loc);
      let lat = geo[0];
      let lon = geo[1];

      bubble_list.push({location: loc, latitude: lat, 
             longitude: lon, radius: 5, fillKey: 'bubble', 
             alumns: alumn_list});
    }

    all_alumni = []
    for (let [alumn, val] of Object.entries(name_list)) {
        loc = val.location;
        year = val.year;
        list_entry = alumn + " '"+year+" &bull; "+loc;
        all_alumni.push(list_entry);
    }

    return [bubble_list, all_alumni];
}


async function convert_sheet_to_bubble_list(id) {
	
	const options = {
	  sheetId: id,
	  sheetNumber: 1,
	  returnAllResults: true
	};

	return await gsheetProcessor(options, process_results);

}

async function create_bubble_list() {
	let id = "12lGrmIhj2dlLHt2GNucD69IktFoOA5k9Zi9rnLR0OoI";
	let bubble_list = await convert_sheet_to_bubble_list(id);
	return bubble_list;
}


function create_popup(location, alumns) {

   	alumns_html = 'Residents:'
   	for (var i=0; i<alumns.length; i++){
   		alumn = alumns[i];
   		alumns_html += "<br>> "+alumn;
   	}
   	//alumns_html += "</div>"
    return "<b>"+location+"</b>"+"<br>"+alumns_html;
}

function create_table(list) {

  alumns_html = "<ul id='alumni' class='alumni' style='list-style: none;'><li>"
  for (var i=0; i<list.length; i++){
      item = list[i];
      alumns_html += "<p>"+item+"</p>"
  }
  alumns_html += "</li></ul>"
  return alumns_html;
}

//--------------------------------------------------------

/* Credit: https://github.com/bpk68/g-sheets-api */
/* Used with slight modifications */
//import GSheetsapi from './gsheetsapi.js';


function matchValues(valToMatch, valToMatchAgainst, matchingType) {
  try {
    if (typeof valToMatch != 'undefined') {
      valToMatch = valToMatch.toLowerCase().trim();
      valToMatchAgainst = valToMatchAgainst.toLowerCase().trim();

      if (matchingType === 'strict') {
        return valToMatch === valToMatchAgainst;
      }

      if (matchingType === 'loose') {
        return valToMatch.includes(valToMatchAgainst) || (valToMatch == valToMatchAgainst);
      }
    }
  } catch (e) {
    console.log(`error in matchValues: ${e.message}`);
    return false;
  }

  return false;
};


function filterResults(resultsToFilter, filter, options) {

  let filteredData = [];

  // now we have a list of rows, we can filter by various things
  return resultsToFilter.filter(item => {

    let addRow = null;
    let filterMatches = [];

    if (typeof item === 'undefined' ||
      item.length <= 0 ||
      Object.keys(item).length <= 0) {
      return false;
    }

    Object.keys(filter).forEach(key => {
      const filterValue = filter[key]; // e.g. 'archaeology'
      const itemValue = item[key]; // e.g. 'department' or 'undefined'

      filterMatches.push(matchValues(itemValue, filterValue, options.matching || 'loose'));
    });

    if (options.operator === 'or') {
      addRow = filterMatches.some(match => match === true);
    }

    if (options.operator === 'and') {
      addRow = filterMatches.every(match => match === true);
    }

    return addRow;
  });
}


function processGSheetResults(JSONResponse, returnAllResults, filter, filterOptions) {

  const data = JSONResponse.feed.entry;
  const startRow = 2; // skip the header row(1), don't need it

  let processedResults = [{}];
  let colNames = {};

  for (let item of data) {

    const cell = item['gs$cell']; // gets cell data
    const val = cell['$t']; // gets cell value
    const columnNum = cell['col']; // gets the col number
    const thisRow = cell['row']; // gets the row number

    const colNameToAdd = colNames[columnNum]; // careful, this will be undefined if we hit it on the first pass

    // don't add this row to the return data, but add it to list of column names
    if (thisRow < startRow) {
      colNames[columnNum] = val.toLowerCase();
      continue; // skip the header row
    }

    if (typeof processedResults[thisRow] === 'undefined') {
      processedResults[thisRow] = {};
    }

    if (typeof colNameToAdd !== 'undefined' && colNameToAdd.length > 0) {
      processedResults[thisRow][colNameToAdd] = val;
    }
  }

  // make sure we're only returning valid, filled data items
  processedResults = processedResults.filter(result => Object.keys(result).length);

  // if we're not filtering, then return all results
  if (returnAllResults || !filter) {
    return processedResults;
  }

  return filterResults(processedResults, filter, filterOptions);
}


const gsheetProcessor = function (options, callback) {

  return gsheetsAPI(options.sheetId, options.sheetNumber ? options.sheetNumber : 1).then(result => {
    const filteredResults = processGSheetResults(
      result,
      options.returnAllResults || false,
      options.filter || false,
      options.filterOptions || {
        operator: 'or',
        matching: 'loose'
      });
    return callback(filteredResults);
  })
};

//-------------------------------------------------------------

/* Credit: https://github.com/bpk68/g-sheets-api */
/* Used with slight modifications*/

const gsheetsAPI = function (sheetId, sheetNumber = 1) {

  try {
    const sheetsUrl = `https://spreadsheets.google.com/feeds/cells/${sheetId}/${sheetNumber}/public/values?alt=json-in-script`;

    return window.fetch(sheetsUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching sheet');
        }
        return response.text();
      })
      .then(resultText => {
        const formattedText = resultText.replace('gdata.io.handleScriptLoaded(', '').slice(0, -2);
        return JSON.parse(formattedText);
      });

  } catch (err) {
    console.log(`gsheetsAPI error: ${err}`);

    return {};
  }
};