$(document).on("dblclick keypress focusout",".table-ceil-edit",function (e){
	var t 	  = $(this);

	// dblclick on ouvre le champ
	if(e.type=="dblclick"){
		t.attr('data-value',t.val());
		t.removeAttr('readonly');
	}
	// on quitte : on bloque le champ
	else if(e.type=="focusout"){
		t.val(t.attr('data-value'));
		t.attr('readonly',true);
	}
	else {
		if (e.keyCode == 13){
			t.attr('data-value',t.val());
			t.attr('readonly',true);
		}

		if (e.keyCode == 27) {
			t.val(t.attr('data-value'));
			t.attr('readonly',true);
		}
	}
})