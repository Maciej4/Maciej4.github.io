
function time(){
	//Time Calculaions
	var tim = 0;
	if(!pauseMode){
		tim = Math.floor((timePlayed + (Date.now()-startTime))/1000);
	} else {
		tim = Math.floor(timePlayed/1000);
	}
	var min = Math.floor((tim / 60));
	var sec = tim - min * 60;
	//Formating Calcuations
	var s = sec + "";
	while (s.length < 2) s = "0" + s;
	//Returning Time
	return min + ':' + s;
}
