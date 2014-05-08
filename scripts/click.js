/*TO DO:
	fix broken alert function so the page updates
	reimplement the date check so the counters go back to 0 in the morning (maybe not for genCOunter
	add clearIntervals so the reminders don't pop up if they click the +
	testing
*/

//milli to time units:
var min = 60 * 1000;
var hour = 60 * min;
//arrays with option types:
var optionsCounters = ["totalGenCount","totalWater"];
var alertObj =[
	vision = {name: "vision", time:20, message:"Take a break,\nfor your eyes' sake!"},
	standUp = {name: "standUp", time:60, message:"Get up, stand up.\nIts good for your life."}
];
var optionsAlerts = ["standUp","vision"];
		
function storeValues(optionArray, val) {
	if(typeof(Storage)!=="undefined") //does browser support local storage (and cookies are on)
	{
		for(i=0;i<optionArray.length;i++)
		{
			if(!localStorage[optionArray[i]]) //does the options exist in local storage?
			{
				localStorage[optionArray[i]] = val; //doesn't exist so set to value passed in
			}
		}	
	}
	else //no support/cookies
	{
		alert("your browser doesn't support local storage...");//document.getElementById("alert").innerHTML="Sorry, your browser does not support web storage...";
	}
}

//update the page with values from local
function updateDisplay(optionArray) {
	for(i=0;i<optionArray.length;i++)
	{
		document.getElementById(optionArray[i]).innerHTML=localStorage[optionArray[i]];
	}	
}

//set the alerts
//TO DO: add if statements so only options that are checked get alerts.
function initAlerts(optionArray) {
	for (i=0;i<optionArray.length;i++)
	{
		document.getElementById(optionArray[i].name).innerHTML = optionArray[i].time + " minutes";
		startTimer(optionArray[i]);
	}
}

//general method for incrementing (and decrementing) all counters
$(".countButton" ).on( "click", function( event ) {
	if(!localStorage[this.name.toString()])
	{
		localStorage[this.name.toString()] = this.value;
		document.getElementById(this.name).innerHTML = this.value;
	}
	else
	{
		localStorage[this.name.toString()] = Number(localStorage[this.name.toString()]) + Number(this.value);
		document.getElementById(this.name).innerHTML = localStorage[this.name.toString()];
	}
});

//when user chooses options show the checked ones and leave the rest hidden
$( "#save" ).on( "click", function( event ) {
	var opts = document.getElementsByName("options");
	for (i=0; i < opts.length; i++){		
		localStorage[opts[i].id.toString()] = opts[i].checked;
		if (document.getElementById(opts[i].id).checked)
		{
			document.getElementById(opts[i].value).className = "jumbotron";
		}
		else
		{
			document.getElementById(opts[i].value).className = "jumbotron hidden";
		}
	}
	//init local storage and update values in page
	storeValues(optionsCounters, 0);
	storeValues(optionsAlerts, new Date().getTime());
	updateDisplay(optionsCounters);
	initAlerts(alertObj);
	
});

function startTimer(alertObj) {
	setInterval(function() {
		alert(alertObj.message);
		}
	,(alertObj.time * min))
	setInterval(function() {
	//FIX THIS BROKEN POS. too tired to think. will fix in morning
		document.getElementById(alertObj.name).innerHTML = Math.floor((Number(localStorage[alertObj.name]) / min) - ((new Date().getTime() / min) - (alertObj.time))) + " minutes";
		}	
	,min)		
}