$.alert = {
	reload : funcion(id){
		var url = Routing.generate('alert_reload');
		$.get(url,function(html){
			$("#alert-"+id).html(html)
		})
	}
}

setInterval(function(){
	$.alert.reload('all');
},60000);

$(document).on("click",".btn-alert-reload",function (e){
	var t = $(this);
	$.alert.reload();
})