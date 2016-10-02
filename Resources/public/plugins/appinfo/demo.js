$(document).ready(function(){
	
	$.appInfo.init();

	$(document).on("click",".btn-appinfo button",function (){
		var data = $(this).data();
		var dataStr = JSON.stringify(data);
		$('#source-param').html("$.appInfo.add("+dataStr+");");
		var msgAdd = $.appInfo.add(data);
		return false;
	})


	$(document).on("click",".appinfo-type-loader",function (){
		var t = $(this);

		$.appInfo.upd(t);
	})

	$(document).on("click",".toggle-loader-demo",function (){
		var t = $(".appinfo-type-loader");
		var data = $(this).data();
		var dataStr = JSON.stringify(data);
		$('#source-param').html("$.appInfo.upd($('.appinfo-type-loader'),"+dataStr+");");

		$.appInfo.upd(t,$(this).data());
	})

	$(document).on("click","#all-delete",function (){
		var t = $(".appinfo-msg");
		var data = $(this).data();
		var dataStr = JSON.stringify(data);
		$('#source-param').html("$.appInfo.del($('.appinfo-msg'),"+dataStr+");");
		$.appInfo.del(t);
	})
});