$.search = {
	reg 	: function(){

	},
	note 	: function(){

	},
	order 	: function(){

	},
	clear 	: function(){

	}
};





$(document).on("keypress",".input-search",function (e){
	var t          = $(this);
	
	var target     = $(t.data('target'));
	var items 	   = target.find(t.data('items'));
	var val 	   = t.val();

	if(val == '' || val.length <= 3)
		items.show();
	else{
		items.hide();
		$.each(items, function(key, item){
			var item = $(item);
			var valCompar 	= item.find('.subject').html();
			var eval 		= valCompar.match($.regexp(val));
			if (eval)
				item.show();
			console.log(valCompar);
			console.log(eval);
		});
	}

		

	
})