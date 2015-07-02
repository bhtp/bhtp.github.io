var directEntryOpen = false;

function Main(teams, rounds, teamsPerDebate, breakingTeams, currentRound, directEntry){
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
	highestPoints = number * (teamsPerDebate - 1);
	div.innerHTML = "<h4>Number of teams on points</h4>";
	var displayNum = 5;
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
}

function mainRunner()
{
	Main(parseInt(document.getElementById('teams').value), parseInt(document.getElementById('rounds').value), parseInt(document.getElementById('teamsPerDebate').value), parseInt(document.getElementById('breakingTeams').value), parseInt(document.getElementById('currentRound').value), directEntryOpen)
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
