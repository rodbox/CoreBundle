$(document).on("keypress",".extract-content",function (e){
	e.preventDefault();	
	var t = $(this);

	if (e.keyCode == 13) {
		var list = t.val().split('\n');
		$.cb[t.data('cb-app')][t.data('cb')](t, e, list);
	}
})