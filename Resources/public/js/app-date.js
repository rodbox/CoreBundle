$.terms = [
	{
		comment	: "a l'instant",
		time	: 10,
		divide	: 1,
		unit 	: [],
		text	: "A l'instant"
	},
	{
		comment	: "dans la minute",
		time	: 45,
		divide	: 1,
		unit 	: [],
		text	: "moins d'une minute"
	},
	{
		comment	: "Moins d'une heure",
		time	: 216000,
		divide	: 3600,
		unit	: ['minute','minutes'],
		text	: "%d %unit"
	},
	{
	  	comment	: "Moins d'un jour",
	  	time 	: 216000 * 24,
		divide	: 216000,
		unit	: ['heure','heures'],
		text	: "%d %unit"
	},
	{
	  	comment	: "Moins d'un mois",
	  	time 	: 216000 * 24 * 30,
		divide	: 216000 * 24,
		unit	: ['jour','jours'],
		text	: "%d %unit"
	},
	{
	  	comment	: "moins d'un an",
	  	time 	: 31536000,
		divide	: 216000 * 24 * 30,
		unit	: ['mois','mois'],
		text	: "%d %unit"
	},
	{
	  	comment	: "plus d'un an",
	  	time 	: 216000 * 24 * 365,
		divide	: 216000 * 24 * 365,
		unit	: ['an','ans'],
		text	: "%d %unit"
	}
];



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

		var diff    = {};
		var tmp     = parseInt(date2)  - parseInt(date1);



		diff.diff   = tmp;

		tmp         = Math.floor(tmp/1000);
		diff.sec    = tmp % 60;
	 
		tmp         = Math.floor((tmp-diff.sec)/60);
		diff.min    = tmp % 60;
	 
		tmp         = Math.floor((tmp-diff.min)/60);
		diff.hour   = tmp % 24;
	     
		tmp         = Math.floor((tmp-diff.hour)/24);
		diff.day    = tmp;

		diff.text 	= $.date.relative(date2);

		return diff;
	},
	relative : function (date){
		var now = (Math.round(parseInt($.now()) / 1000));

		var tmp     = parseInt(date)  - now ;
		var timeSec = Math.abs(tmp);
		
		var prefix  = (tmp > 0) ? "Il y a " : "Dans ";
		var prefix  = (timeSec < 10) ? "" : prefix;

		for(term in $.terms){
			if(timeSec < term.time)
				break;
	    }

		var value = Math.ceil(timeSec / term.divide);

		var unit  = (parseInt(value) <= 1) ? term.unit[0] : term.unit[1];

		var text  = term.text.replace('%d', value)
		var text  = text.replace('%unit', unit)
		
		return prefix + text;
	},
	expire : function(date1, date2){
		return (date1 - date2) > 0;
	},
	format : function(date, format){
		var dateFormat  = new Date(date * 1000);

		var now = Date.now();

        var dif = (now / 1000) - (date / 1000);

        var h24 = 86400;
        var w1 	= 604800;

		return dateFormat;
	}
}