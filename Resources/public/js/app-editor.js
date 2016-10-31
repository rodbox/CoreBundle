/**
 * Initialise un editeur
 */

// charge les fichiers de l'editeur
$.cdnLoad = {
	loaded:[], // liste des editors deja chargés
	load:function(editor){

	}
}

// initialise l'editeur
$.cdn = {
	init:function(editor, t, param){
		$.editor.editors[editor]['init'](t, param);
	},
	editors:{
		'codemirror':{
			init: function(t, param){
				t.addClass('codemirror');
				console.log('codemirror editor load');
				// configuration de code mirror
			}
		},
		'summernote':{
			init:function(t, param){
				t.addClass('summernote');
				// configuation de summernote
			}
		},
		'paperjs':{
			init:function(t, param){
				// configuration de paperjs
			}
		}
	}
}