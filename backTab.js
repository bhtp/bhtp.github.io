var directEntryOpen = false;
var errorRaised = false;

function Main(teams, rounds, teamsPerDebate, breakingTeams, currentRound, directEntry){
	if(errorRaised)
	{
		errorRaised = false;
		return;
	}
	var i;
	var j;
	var k;
	var m;
	var n;
	var l;
	var h;
	startPlace = 0;
	
	var now = new Date();
	var output = "                  " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()+"\n";
	
	var tabs = new Array(1);
	tabs[0] = teams;
	for(i = startPlace; i < rounds; i++){
		if (i == currentRound){
			if(directEntry == true)
			{
				numberDirectEntry = (teamsPerDebate - 1)*currentRound;
				for(f = 0; f < numberDirectEntry / 2; f++)
				{
					if(document.getElementById("entry" + f) != null && document.getElementById("entry" + f).value != "")
					{
						actualValue = parseInt(document.getElementById("entry" + f).value);
						difference = tabs[f] - actualValue;
						tabs[f] = actualValue;
						tabs[f+1]+=difference;
					}
				}
				
				for(f = numberDirectEntry; f > numberDirectEntry / 2; f--)
				{
					if(document.getElementById("entry" + f) != null && document.getElementById("entry" + f).value != "")
					{
						actualValue = parseInt(document.getElementById("entry" + f).value);
						difference = tabs[f] - actualValue;
						tabs[f] = actualValue;
						tabs[f-1]+=difference;
						r = f - 1;
						while(tabs[r] < 0)
						{
							tabs[r-1]+=tabs[r];
							tabs[r] = 0;
							r--;
						}
					}
				}
			}
			
			
			output += "--------------Curent Round Theoretical-- \n";
			for(h = 0; h < tabs.length; h++){
				output += "" + padPrint(tabs[tabs.length - 1 - h]) + " team(s) on " + padPrint(tabs.length - 1 -h) + " points \n";
			}
		}
		var newTabs = new Array((i + 1)*(teamsPerDebate-1)+1);
		for(m = 0; m < newTabs.length; m++){
			newTabs[m]=0;
		}
		for(k = 0; k < tabs.length; k++){
			var addedTeams = tabs[k]/teamsPerDebate;
			for(j = 0; j < teamsPerDebate; j++){
				newTabs[k + j] += addedTeams;
			}
		}
		tabs = newTabs;
	}
	var teamsLeft = breakingTeams;
	var points = 0;
	var leftOver = 0;
	while (teamsLeft >= 0){
		teamsLeft -= tabs[tabs.length - points - 1];
		if (teamsLeft == 0){
			leftOver = 0;
		}
		else if(teamsLeft < 0){
			leftOver = tabs[tabs.length - points - 1]+teamsLeft;
		}
		else
		{
			points++;
		}
	}
	output += "-----------------Breaking------------------ \n";
	for(n = 0; n < points; n++){
		output += "All (" + padPrint(tabs[tabs.length - 1 - n]) + ") team(s) break on " + padPrint((tabs.length - n - 1)) + " points\n";
	}
	if(leftOver !=0){
		output += padPrint(leftOver) + " team(s) of " + padPrint(tabs[tabs.length - points - 1]) + " break on " + padPrint((tabs.length - points - 1)) +  " points (" + Math.round((leftOver / tabs[tabs.length - points - 1] * 100)) + "%)\n";
	}
	output += "-----------------Breakdown----------------- \n";
	for(l = 0; l < tabs.length; l++){
		output += "" + padPrint(tabs[tabs.length - 1 - l]) + " team(s) on " + padPrint(tabs.length - 1 -l) + " points \n";
	}
	document.getElementById('outputText').value = output + document.getElementById('outputText').value;
}

function addInputs(number, teamsPerDebate, div)
{
	if(errorRaised)
	{
		errorRaised = false;
		return;
	}
	highestPoints = number * (teamsPerDebate - 1);
	div.innerHTML = "<h4>Number of teams on points</h4>";
	var displayNum = highestPoints / 3;
	if(displayNum < 5)
	{
		displayNum = 5;
	}
	
	if(highestPoints > displayNum * 2)
	{
		mid = highestPoints - displayNum;
	}
	else
	{
		mid = (highestPoints + 1) / 2;
	}
	
	for(i = highestPoints; i > mid ; i--)
	{
			
			addDiv = document.createElement("div")
			addDiv.innerHTML += '<label for=entry"' + i + '">' + i + ' Points</label>';
			newInput = document.createElement("input");
			newInput.type = "text";
			newInput.id = "entry" + i;
			newInput.className = "form-control"
			addDiv.appendChild(newInput);
			div.appendChild(addDiv);
	}
	div.innerHTML += '<input type = "Button" class = "btn btn-warning btn-xs" Value = "Hide" OnClick = "directEntryOpener()">'
}

function mainRunner()
{
	Main(checkField('teams', false), checkField('rounds', false), checkField('teamsPerDebate', false), checkField('breakingTeams', false), checkField('currentRound', true), directEntryOpen)
}

function textToggle()
{
	if(directEntryOpen){
	addInputs(checkField('currentRound', false), checkField('teamsPerDebate', false),  document.getElementById('contentEntryDiv'));
	}
}

function directEntryOpener()
{
	directEntryOpen = !directEntryOpen;
	if(directEntryOpen){
		document.getElementById('directEntryArea').style.display = '';
		document.getElementById('directEntry').className = 'btn btn-md btn-info active';
		addInputs(parseInt(document.getElementById('currentRound').value), parseInt(document.getElementById('teamsPerDebate').value),  document.getElementById('contentEntryDiv'));
	}
	else{
		document.getElementById('directEntryArea').style.display = 'none';
		document.getElementById('directEntry').className = 'btn btn-md btn-info';
	} 
}

function padPrint(valueIn){
	if(valueIn % 1 != 0){
		var longer = "" + valueIn.toFixed(2);
	}
	else{
		var longer = "" + valueIn;
	}
	while (longer.length < 5){
		longer += " ";
	}
	return longer
}

function checkField(id, optional)
{
	element = document.getElementById(id)
	num = parseInt(element.value);
	
	if(isNaN(num) && !optional || num < 1)
	{
		element.style.backgroundColor = "#FF7373";
		errorRaised = true;
		return false;
	}
	element.style.backgroundColor = "#FFFFFF";
	return num;
}
