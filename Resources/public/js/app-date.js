/**
* TODO : Gestion des heures et de minutes a vérifié
**/

$.date = {
	now : function(){
		return $.now();
	},
	add : function(date, val, unit){

		var date  = new Date(date);

    	switch(unit) {
		    case 'year'   : date.setFullYear(date.getFullYear() + val);  break;
		    case 'month'  : date.setMonth(date.getMonth() + val);  break;
		    case 'week'   : date.setDate(date.getDate() + 7 * val);  break;
		    case 'day'    : date.setDate(date.getDate() + val);  break;
		    case 'hour'   : date.setTime(date.getTime() + val*3600000);  break;
		    case 'minute' : date.setTime(date.getTime() + val*60000);  break;
		    case 'second' : date.setTime(date.getTime() + val*1000);  break;
		    default       : undefined;  break;
		}

    	return date;
	},
	dif : function(date1, date2){

		var diff  = {};
		var tmp   = date2 - date1;

		tmp       = Math.floor(tmp/1000);
		diff.sec  = tmp % 60;
	 
		tmp       = Math.floor((tmp-diff.sec)/60);
		diff.min  = tmp % 60;
	 
		tmp       = Math.floor((tmp-diff.min)/60);
		diff.hour = tmp % 24;
	     
		tmp       = Math.floor((tmp-diff.hour)/24);
		diff.day  = tmp;

		return diff;
	},
	expire : function(date1, date2){
		return (date1 - date2) > 0;
	}
}