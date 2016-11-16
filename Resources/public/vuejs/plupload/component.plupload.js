let pluploadComponent = Vue.component('plupload',{
	props: {
		id       : {
			type : String,
			default : 'plupload'
		},
		content: {
			type: String,
			default:''
		},
		index    : {
			type 	: String,
			default : '/'
		},
		dest     : {
			type 	: String,
			default : 'media'
		},
		rename   : {
			type 	: [String, Boolean],
			default : ''
		},
		multiple : {
			type 	: Boolean,
			default : true
		},
		filter   : {
			type 	: Array,
			default : []
		},
		hook   : {
			type 	: Array,
			default : ['user','setColorUser','gallery']
		}
	},
	data :function () { 
		return {
			url           : Routing.generate('upload'),
			container     : '',
			counter       : 0,
			mode 		  : false,
			log 	      : {},
			uploader      : {},
			percent       : 0,
			selectIndex	  : false,
			files         : []
		}
	},
	template: `
	<div>
		<div class="input-group" style="margin-top:.3rem">
			<input type="text" v-model="index" class="form-control" v-if="selectIndex" />
			    <span class="input-group-btn">
			<a :id="id" class="btn btn-sm btn-primary btn-circle" :data-fail="log.failed" >
			{{content}}
			<span v-if="mode"><i class="fa fa-spin fa-refresh"></i></span>
			<span v-else="mode"><i class="fa fa-upload"></i></span>
			 Upload</a>
			</span>
		</div>
				
			
		<ul :id="container" class="list-group list-upload" :class="id" style="z-index:600; margin-top:0.3rem" v-if="mode">
			<li class="list-group-item pc progress-upload" v-if="mode">
			<div class="upload-log">
			<span class="pull-left">
			<a href="#" :data-fail="log.failed" :data-loaded="log.loaded"  :data-size="log.size" :data-uploaded="log.uploaded" class="info sm-3"><i class="fa fa-info-circle"></i></a>
			<span class="text-muted sm-3">{{log.bytesPerSec | size}}/s</span>
			</span>
			<span class="pull-right text-muted sm-3">{{ log.queued }} {{"label.file"|trans}}</span>
			</div>
			<progress class="progress progress-info mct" v-model="percent" max="100" style="height:0.4rem; margin-bottom: 0.3rem; "></progress>
			
			<progress class="progress mcb" v-model="log.percent" max="100" style="height:0.4rem;"></progress>
			</li>
			<li :id="key" class="list-group-item pc list-upload-item" :data-status="file.status" :rel="file.name" v-for="(file, key, index) in files" ><span class="file-title">{{file.name | limit(30)}}</span> <span class="text-muted sm-3">- {{ file.size | size}}</span> 
				<a href="#" @click.prevent="destroy(file)" class="pull-right sm-3 btn-destroy" rel="{{file.name}}"  ><i class="fa fa-remove"></i></a>
			</li>
		</ul>
	</div>
	`,
	watch:{
		index:function (value) {
			this.uploader.settings.multipart_params.index = value
		}
	},
	computed:{
		
	},
	methods:{
		setMode: function (bool) {
			return this.mode = bool
		},
		
		setLog:function () {
			return this.log = this.uploader.total
		},
		setUploader: function (uploader) {
			return this.uploader = uploader
		},
		setProgress: function (file) {
			this.setLog()

			return this.percent = file.percent
		},
		getKeyFile: function (id) {
			let kFile = ''
			$.each(this.files, function(k, v) {
				if (v.id == id)
					kFile = k
			})

			return kFile
		},
		setContainer: function () {
			return this.container = this.id+'-container'
		},
		setFiles: function (files) {
			return this.files = files
		},
		setUploaded: function (file, response) {
			let k = this.getKeyFile(file.id)
			this.destroy(k)
		},
		setComplete: function (files) {
			this.setMode(false)
		},
		progress: function (file) {
			let progress= parseInt(file.progress)
			let cls = ''
			if(progress == 100)
				cls = 'success'
			else if(progress < 100)
				cls = 'info'
			else
				cls = 'danger'

			return 'progress-'+cls
		},
		addFile:function (files) {
			newlist = _.concat(this.files, files)

			this.setFiles(newlist)
			
			this.uploader.stop()
			this.uploader.refresh()
			this.uploader.start()

			this.setMode(true)
		},
		destroy: function (file) {
			this.uploader.removeFile(file)
			this.uploader.refresh()

			let keyfile = this.getKeyFile(file.id)
			let files = _.omit(this.files,keyfile)
			this.setFiles(files)
		}
	},
    mounted: function () {
    	var url = this.url

    	this.setContainer()

    	let t = this
    	let paramDefault = {
			containers		: this.container,
			multi_selection : this.multiple,
			browse_button	: this.id,
			flash_swf_url	: "js/Moxie.swf",
			runtimes		: "html5,flash",
			url				: url,
			multipart_params: {
				dest   : this.dest,
				index  : this.index,
				rename : this.rename,
				filter : this.filter,
				hook   : this.hook
			},
			multipart		: true,
			urlstream_upload: true,
			startOnAdded	: true,
			init : {
				FilesAdded : function(up, files){
					t.addFile(files)
				},
				FileUploaded : function(up, file, response){
					t.setUploaded(file, response)
				},
				UploadProgress : function(up, file){
					t.setProgress(file)
				},
				UploadComplete : function(up, files){
					t.setComplete(files)
				}
			}
		}
		
		let filter        = {}
		let paramData     = {}
		let paramUploader = $.extend(paramDefault, filter, paramData);

		let uploader = new plupload.Uploader(paramDefault);
		uploader.init()

		this.setUploader(uploader)
  	}
})