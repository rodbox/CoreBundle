Mustache.Formatters = {
    "uppercase": function (str) {
        return str.toUpperCase();
    },
    "lpad": function (str, num, sep) {
        sep = sep || " ";
        str = "" + str;
        var filler = "";
        while ((filler.length + str.length) < num) { filler += sep };
        return (filler + str).slice(-num);
    },
    "maildate": function (maildate) {
	    
/*

        if(dif < h24)
            var date = date.getHours();
        else if($dif < $w1)
            var date = date.getDay();
        else
            var date = date;*/

        return $.date.format(maildate);
    },
    "mailsender": function(mailsender){
    	var sender = mailsender.split('<');
    	return sender[0];
    }
};


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