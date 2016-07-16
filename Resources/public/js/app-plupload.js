(function($) {
// What does the initPlupload plugin do?
$.fn.initPlupload = function(options) {

	var t        = $(this);

	var id       = Math.random().toString(36).substring(2);;
	var pourcent = 0;

	param         	= {};
	param.t         = t;
	param.id        = id;
	param.url       = t.attr("href");
	param.container = t.attr("id")+"-group";
	param.badge 	= t.attr("id")+"-badge";
	param.list      = t.attr("id")+"-list";
	param.browse    = t.attr("id");
	param.data 		= t.data();
	param.cb		= t.data("cb");
	param.counter 	= 0;
	param.cbapp		= t.data("cbapp");
	param.multiple = t.data('multiple');

	initUploader();

	function FilesAdded(file){
		var fileSize    = plupload.formatSize(file.size);
		var divItem     = $("<div>",{
			"id"	: file.id,
			"class"	: "plupload-file dropdown-item "
		})
		.html("<span class = 'plupload-filename'>"+file.name+"</span> <span class = 'plupload-filesize sm'>("+fileSize+")</span>");
		
		var progress    = $("<progress>",{
			"value"			: "0",
			"max"			: "100",
			"class"			: "progress progress-xs"
		});
		
		divItem.append(progress);

		return divItem;
  	}

	function badge(){
		var badge = $("#"+param.badge);
		badge.html(param.counter);
		(param.counter <= 0)?badge.hide():badge.show();
	}

  function initUploader(){

	var paramData    = param.t.data();
	var paramDefault = {
		resize 			: {
			"width"	  : 1200,
			"height"  : 1000,
			"quality" : 90
		},
		runtimes		: "html5,flash",
		flash_swf_url	: "js/Moxie.swf",
		containers		: param.container,
		multi_selection : param.multiple,
		browse_button	: param.browse,
		url				: param.url,
		multipart_params: t.data(),
		multipart		: true,
		urlstream_upload: true,
		startOnAdded	: true
	}

	var paramUploader= $.extend(paramDefault, paramData);


	param.uploader = new plupload.Uploader(paramUploader);
	param.uploader.init();

	param.uploader.bind('FilesAdded',function(up,files){
		var fileslist = $('#'+param.list);

		for (var i in files) {
			var file = files[i];
			fileslist.append(FilesAdded(file));
			param.counter++;
		};

		param.uploader.refresh();
		param.uploader.start();

		badge();
	});

	param.uploader.bind('UploadProgress',function(up,file){
		var percent     = file.percent;
		var fileCurrent = $('#'+file.id);
		var progressbar = fileCurrent.find(".progress");
		$('#'+param.list).show();

		if (!fileCurrent.hasClass("plupload-file-current"))
			fileCurrent.addClass("plupload-file-current");

		progressbar.attr("value",percent).html(percent+"%");

		if(percent >= 100){
			progressbar.addClass('progress-success');
			fileCurrent.removeClass("plupload-file-current").addClass("plupload-file-complete");

		}
	});

	param.uploader.bind('FileUploaded',function(up,file,response){
		var fileCurrent = $('#'+file.id);
		var json = $.parseJSON(response.response);
		fileCurrent.removeClass("plupload-file-current").slideUp(function(){
			$(this).remove();
			param.counter--;
			badge();

			$('#'+param.list).hide();

			if (param.cb != undefined && param.cbapp != undefined)
				$.cb[param.cbapp][param.cb](json)
		});
	});
};
};


})(jQuery);

$(document).ready(function($) {
	$(document).on("click",".btn-plupload",function (e){
		e.preventDefault();
		var t = $(this);
		$('#'+t.attr('id')+'-list').toggle();
		//$(this).initPlupload();
	})

$(".btn-plupload").initPlupload();
});



