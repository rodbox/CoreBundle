$.local = {
	set : function(index, data){
		localStorage.setItem(index, JSON.stringify(data));
	},
	get : function(index){
		return jQuery.parseJSON(localStorage.getItem(index));
	},
	del : function(index){
		localStorage.removeItem(index);
	},
	clear : function(){
		localStorage.clear();
	},
	load : function(url, index, expire){
		if ($.local.get(index+'_expire') != null) {
			var date 			= $.now();
			var date_expire 	= new Date($.local.get(index+'_expire'));
			var expire 			= $.date.expire(date, date_expire);
		}
		else
			var expire 			= true;

		if(expire || $.force() || $.sui.get('force') == 'true'){
			$.get(url, function(json) {
				var date_expire = $.date.add(new Date(), 7, 'day');

				$.local.set(index+'_expire',date_expire);
				$.local.set(index, json);
			},'json');
		}
	}
}

$(document).ready(function($) {
	$('.local-me').each(function(key, val){
		var t = $(val);
		$.local.load(t.data('url'), t.data('index'));
	});	
});