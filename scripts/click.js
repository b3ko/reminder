var min = 60 * 1000;
var hour = 60 * min;

$( "#submit" ).on( "click", function( event ) {
  clickCounter();
});

$( "#save" ).on( "click", function( event ) {
	if (document.getElementById("optionsWater").checked)
	{
		document.getElementById("water").className = "jumbotron";
	}
	else
	{
		document.getElementById("water").className = "jumbotron hidden";
	}
	
	if (document.getElementById("optionsStandUp").checked)
	{
		document.getElementById("standUp").className = "jumbotron";
		d = new Date();
		d = d.setHours(d.getHours() + 1);
		localStorage.standUp = d.toString();
		document.getElementById("standIn").innerHTML = "59 minutes";
		startTimer();
	}
	else
	{
		document.getElementById("standUp").className = "jumbotron hidden";
	}
});

checkDate();
document.getElementById("result").innerHTML=localStorage.clickcount;

alertFlag = setTimeout(function(){showAlert()}, hour);

function checkDate() {
	var d = new Date();
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);
	var lsLastVisit = new Date(Date.parse(localStorage.lastVisit));
	if(lsLastVisit < d)
	{
		localStorage.clickcount=0;
	}
	
	if(!localStorage.clickcount)
	{
		localStorage.clickcount = 0;
	}
	
	localStorage.lastVisit = new Date().toString();
}

function startTimer() {
	setInterval(function() {
		alert("STAND UP!");
		}
	,hour)
	setInterval(function() {
		document.getElementById("standIn").innerHTML = parseInt((d - Date.now()) / min) + " minutes";
		}	
	,min)		
}

function clickCounter() {
	if(typeof(Storage)!=="undefined")
	{
		checkDate();
		if (localStorage.clickcount)
		{
			localStorage.clickcount=Number(localStorage.clickcount)+1;
		}
		else
		{
			localStorage.clickcount=1;
		}
		
		document.getElementById("result").innerHTML=localStorage.clickcount;
		localStorage.lastVisit = new Date().toString();
		clearTimeout(alertFlag);
		alertFlag = setTimeout(function(){showAlert()}, hour);
	}
	else
	{
		document.getElementById("result").innerHTML="Sorry, your browser does not support web storage...";
	}
}

function showAlert(){
	if(confirm("Drink some water!\nDo you want another reminder in 10 minutes?"))
	{
		clearTimeout(alertFlag);
		alertFlag = setTimeout(function(){showAlert()}, (10 * min));
	}
	else
	{
		clearTimeout(alertFlag);
		alert("OK. Reminders are turned off until you refresh the page.");
	}
}