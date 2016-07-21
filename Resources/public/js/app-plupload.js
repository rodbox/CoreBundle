(function($) {
// What does the initPlupload plugin do?
$.fn.initPlupload = function(options) {

	param         	= {};

	return this.each(function () {
		var t        = $(this);

		var id       = Math.random().toString(36).substring(2);
		var pourcent = 0;

		param[id] = {};
		
		param[id].t         = t;
		param[id].id        = id;
		param[id].data 		= t.data();
		param[id].cb		= t.data("cb");
		param[id].cbapp		= t.data("cb-app");
		param[id].url       = t.attr("href");
		param[id].container = t.attr("id")+"-group";
		param[id].badge 	= t.attr("id")+"-badge";
		param[id].list      = t.attr("id")+"-list";
		param[id].target    = t.attr("id")+"-uploaded";
		param[id].multiple  = t.data('multiple');
		param[id].browse    = t.attr("id");
		param[id].counter 	= 0;

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
			var badge = $("#"+param[id].badge);
			badge.html(param[id].counter);
			if (param[id].counter <= 0){
				badge.hide();
				$('#'+param[id].list).hide();
			}
			else{
				badge.show();
				$('#'+param[id].list).show();
			}
		}



		function clear(){
			param[id].counter = 0;
			$('#'+param[id].list).hide().html('');
		}



	  	function initUploader(){
		  	var filters = {
		  		all : {

		  		},
		  		img : {
		  			filters: {
					  mime_types : [
					    { title : "Image files", extensions : "jpg,gif,png" }
					  ],
					  max_file_size: "200mb",
					  prevent_duplicates: true
					},
					resize 			: {
						"width"	  : 1200,
						"height"  : 1000,
						"quality" : 90
					}
		  		},
		  		text: {
		  			filters: {
					  mime_types : [
					    { title : "Doc files", extensions : "doc, docx" },
					    { title : "Text files", extensions : "txt" },
					    { title : "Markdown files", extensions : "md" }
					  ]
					}
		  		},
		  		xls: {
		  			filters: {
					  mime_types : [
					    { title : "Xls files", extensions : "xls,xlsx" },
					    { title : "Csv files", extensions : "csv" },
					    { title : "Json files", extensions : "json" },
					    { title : "Xml files", extensions : "xml" }
					  ]
					}
		  		},
		  		pdf: {
		  			filters: {
					  mime_types : [
					    { title : "PDF files", extensions : "pdf" }
					  ]
					}
		  		},
		  		audio: {
		  			filters: {
					  mime_types : [
					    { title : "Audio files", extensions : "mp3,wav" }
					  ]
					}
		  		},
		  		video: {
		  			filters: {
					  mime_types : [
					    { title : "Video files", extensions : "avi,mp4,mpg" }
					  ]
					}
		  		},
		  		media:{
		  			filters: {
					  mime_types : [
					    { title : "Image files", extensions : "jpg,gif,png,svg" },
					    { title : "Video files", extensions : "avi,mp4,mpg" },
					    { title : "Audio files", extensions : "mp3,wav" }
					  ]
					}
		  		},
		  		archive: {
		  			filters: {
					  mime_types : [
					    { title : "Archive files", extensions : "zip,rar" }
					  ]
					}
		  		}
		  	}

			var paramData    = param[id].t.data();

			var paramDefault = {
				containers		: param[id].container,
				multi_selection : param[id].multiple,
				browse_button	: param[id].browse,
				flash_swf_url	: "js/Moxie.swf                                            ",
				runtimes		: "html5,flash",
				url				: param[id].url,
				multipart_params: paramData,
				multipart		: true,
				urlstream_upload: true,
				startOnAdded	: true
			}

			// on rajoute le preset filter au param par default;
			var paramUploader= $.extend(paramDefault, filters[param[id].t.data('filter')], paramData);

			param[id].uploader = new plupload.Uploader(paramUploader);
			param[id].uploader.init();

			param[id].uploader.bind('FilesAdded',function(up,files){
				var fileslist = $('#'+param[id].list);

				for (var i in files) {
					var file = files[i];
					fileslist.append(FilesAdded(file));
					param[id].counter++;
				};

				param[id].uploader.refresh();
				param[id].uploader.start();

				$.btnLoad.on(param[id].t);
				badge();
			});


			param[id].uploader.bind('UploadProgress',function(up,file){
				var percent     = file.percent;
				var fileCurrent = $('#'+file.id);
				var progressbar = fileCurrent.find(".progress");
				
				if (!fileCurrent.hasClass("plupload-file-current"))
					fileCurrent.addClass("plupload-file-current");

				progressbar.attr("value",percent).html(percent+"%");

				if(percent >= 100){
					progressbar.addClass('progress-success');
					fileCurrent.removeClass("plupload-file-current").addClass("plupload-file-complete");
				}
			});


			param[id].uploader.bind('UploadComplete',function(up, files){
				$.btnLoad.off(param[id].t);
				clear();
				var cbs 	= param[id].cb+"s";
				var cbapp 	= param[id].cbapp;

				$.cb[cbapp][cbs](files);
			});


			param[id].uploader.bind('FileUploaded',function(up, file, response){
				param[id].fileCurrent  	= $('#'+file.id);
				param[id].response 		= $.parseJSON(response.response);

				setTimeout(function(){
					param[id].fileCurrent.removeClass("plupload-file-current").remove();
					param[id].counter--;
					badge();

					var cbs 	= param[id].cb;
					var cbapp 	= param[id].cbapp;

					$.cb[cbapp][cbs](param[id].response);

				},350)
			});
		};
	});
};


})(jQuery);

$(document).ready(function($) {
	$(document).on("click",".btn-plupload",function (e){
		e.preventDefault();
		var t = $(this);
	})
});



