var timeoutID;
var timeout = 45000;

function setup() {
    //Sets the button as an event listener on click to call the makePost
    //https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
	document.getElementById("theButton").addEventListener("click", makePost, true);
	document.getElementById("selection").addEventListener("change", display, true);
    //Calls a function after a specified amount of time; called based on timeout
	timeoutID = window.setTimeout(poller, timeout);
}

//When ice cream value is set to other display text block
function display(){
    var selection = document.getElementById('selection')
    if (selection[selection.selectedIndex].value =="other"){
        document.getElementById("other").style = "display:block"
    }else{
        document.getElementById("other").style = "display:none"    
    }
} 

function makePost() {
	var httpRequest = new XMLHttpRequest();

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	//Posted material from form
	var first = document.getElementById("first").value
	var last = document.getElementById("last").value
	var flavor = document.getElementById("selection").value
	if (flavor == "other"){
	    flavor = document.getElementById("other").value
	}
	//Row of data to be posted to the table
	var row = [first, last, flavor]
	httpRequest.onreadystatechange = function() { handlePost(httpRequest, row) };
	
	/*TODO #1: Make an http request using the httpRequest variable to:
	    - To open a POST to the appropriate basicPoll function
	        - this should correspond to the route specified in basicPoll
	    - Set the request header to the appropriate content type
	*/

	
	/* TODO #2: Make and send json data
	    - Use JSON.<method> to make a json var sending "first", "last", and "flavor"
	    - Use the httpRequest variable to send the json data variable
	*/

	poller();
}

function handlePost(httpRequest, row) {
    
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if (httpRequest.status === 200) {
			addRow(row);
			clearInput();
		} else {
			alert("There was a problem with the post request.");
		}
	}
}

//Polls the server to get the survey options
function poller() {
	var httpRequest = new XMLHttpRequest();

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	/* TODO #3: Make a call to retrieve items currently on the server
	    - set an httpRequest on ready state change to use the call back function
	        handlePoll 
	        - (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange)
	    - open an httpRequest with type "GET" and specifying the appropriate function in basicPoll.py
	    - httpRequest should then be sent (since it is a GET no additional data will be sent)
	*/    

}

//Parses the retrieved information, clears tables, inserts polls and stat information
function handlePoll(httpRequest) {
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if (httpRequest.status === 200) {
			var tab = document.getElementById("theTable");
			//delete all rows
			while (tab.rows.length > 0) {
				tab.deleteRow(0);
			}
			
			var tab = document.getElementById("statTable");
			while (tab.rows.length > 0) {
				tab.deleteRow(0);
			}
			
			var select = document.getElementById("selection");
			var index = 0;
			while (select.options.length > 2) {
			    if (select.options[index].text == "---" || select.options[index].text =="other"){
			        index +=1;
			    }else{
			        select.remove(index)
			    }		    
			}
			//updates the rows accordingly
			var json_response = JSON.parse(httpRequest.responseText);
			var rows = json_response['results']
			var choices = json_response['choices']
			
			
			for (var i=0; i<choices.length; i++){ //remove
			    addChoice(choices[i]);
			}
			
			addRow(rows[0])
			for (var i = 1; i < rows.length; i++) {
				addRow(rows[i]);
			}
			
			addStat("Ice Cream - ", " Results");
			/*  TODO #4: Add stats table for poll percentages
			    - Stat table should include every flavor including new flavors (except other tag)
			    - use addStat(flavor, percentage) function
			*/
			
			timeoutID = window.setTimeout(poller, timeout); //reset timing
			
		} else {
			alert("There was a problem with the poll request.  you'll need to refresh the page to recieve updates again!");
		}
	}
}

function clearInput() {
	document.getElementById("first").value = "";
	document.getElementById("last").value = "";
	document.getElementById("selection").value = "";
	document.getElementById("other").value = ""
	document.getElementById("other").style = "display:none"
}

function addRow(row) {
	var tableRef = document.getElementById("theTable");
	var newRow   = tableRef.insertRow();

	var newCell, newText;
	for (var i = 0; i < row.length; i++) {
		newCell  = newRow.insertCell();
		newText  = document.createTextNode(row[i]);
		newCell.appendChild(newText);
	}
}

function addChoice(choice) {
	var selection = document.getElementById("selection");
	var option = document.createElement('OPTION')
	selection.appendChild(option);
	option.appendChild(document.createTextNode(choice))
}

function addStat(key, value){
	var statTable = document.getElementById("statTable");
	var newRow   = statTable.insertRow();
	var keyCell = newRow.insertCell();
	keyCell.appendChild(document.createTextNode(key));
	var valCell = newRow.insertCell();
	valCell.appendChild(document.createTextNode(value))
}

window.addEventListener("load", setup, true);
window.addEventListener("load", poller, true);