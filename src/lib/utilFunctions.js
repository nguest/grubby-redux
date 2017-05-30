export function unixTimeToString(unixTime) {
	var dateObj = new Date(unixTime);
	var year = dateObj.getUTCFullYear();
	var month = dateObj.getUTCMonth() + 1;
	var day = dateObj.getUTCDate();

	var dateNow = new Date();
	var year0 = dateNow.getUTCFullYear();
	var month0 = dateNow.getUTCMonth() + 1;
	var day0 = dateNow.getUTCDate();
	
	// let's do proper Euro dates...
	
	if (year0 == year && month0 == month && day0 == day) {
		return 'Today'
	} else {
		return day + '-' + month + '-' + year;
	}
}

export function secondsToString(seconds) {
	var date = new Date(seconds * 1000);
	var hh = date.getUTCHours();
	var mm = date.getUTCMinutes();
	var ss = date.getSeconds();

	hh = (hh == 0) ? '' : hh + ':';
	if (mm < 10) {
		mm = "0"+mm +':';
	} else {
		mm == mm + ':';
	}
	if (ss < 10) {ss = "0"+ss;}
	return hh+mm+ss;
}