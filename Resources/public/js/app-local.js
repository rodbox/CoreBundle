$.local = {
	set : function(index, data){
		localStorage.setItem(index, JSON.stringify(data));
	},
	get : function(index){
		return jQuery.parseJSON(localStorage.getItem(index));
	},
	load : function(url, index){

		var expire = true;

		if(expire){
			$.get(url, function(json) {
				$.local.set(index, json);
			},'json');
		}
	}
}

$(document).ready(function($) {
	$('.data-local').each(function(key, val){
		var t = $(val);
		$.local.load(t.data('url'), t.data('index'));
	});	
});