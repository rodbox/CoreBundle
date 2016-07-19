$.local = {
	set : function(index, data){
		localStorage.setItem(index, data);
	},
	get : function(index){
		return localStorage.getItem(index);
	},
	load : function(url, index){

		var expire = true;

		if(expire){
			$.post(url, function(json) {
				$.local.set(index, json);
			},'json');
		}
	}
}

$('.data-local').each(function(key, val){
	$.local.load(t.data('url'), t.data('index'));
});