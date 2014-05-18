function Main(teams, rounds, teamsPerDebate, breakingTeams, currentRound){
	var i;
	var j;
	var k;
	var m;
	var n;
	var l;
	var h;
	var tabs = new Array(1);
	var now = new Date();
	var output = "                  " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()+"\n";
	tabs[0] = teams;
	for(i = 0; i < rounds; i++){
		if (i == currentRound){
			output += "--------------Curent Round---------------- \n";
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