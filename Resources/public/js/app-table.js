$(document).on("click",".table-ceil-edit",function (e){
	var t 	  = $(this);
	var val   = t.attr('data-value');

	var input = $("<input>",{
			"id"    : "ceil-edit-"+t.data('row')+'-'+t.data('col'),
			"class" : "ceil-edit-input form-control"
		})
		.keypress(function(e){
			if (e.keyCode == 13) {
				var tin = $(this);
				t.attr('data-value',tin.val());
				t.html(tin.val());
			}

			if (e.keyCode == 27) {
				t.html(t.attr('data-value'));
			}
		})
		.focusout(function(){
			t.html(t.attr('data-value'));
		})

	input.val(val);

})