$.mustache = function (id, data){
    var tpl = $('#'+id).html();

    Mustache.parse(tpl);
    return Mustache.render(tpl, data);
};

$(document).on("click",".btn-local",function (e){
	e.preventDefault();	
	var t      = $(this);
	
	var target = t.data('target');
	var index  = t.data('index');
	var tpl    = t.data('tpl');

	var data   = $.local.get(index);

	var render = $.mustache(tpl, data);

	$(target).html(render);

})