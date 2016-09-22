$(document).ready(function($) {
	/**
	 * Context type
	 *
	 * A : accessibility: accessibilité true/false
	 * C : colors		: css/vars.less
	 * D : device 		: à définir ...
	 * H : helper 		: bool
	 * S : size 		: css/vars.less
	 * R : role			: par la liste des roles definit par le projet
	 * K : Keyboard		: js/init-shortcut.js
	 *
	 * La liste de contextes propre à chaques types est à définir en fonction des besoins de chaque type
	 */

	$.context = {
		get	: function (key){
			return $('html').attr('data-context-'+key);
		},
		set	: function (key, value){
			return $('html').attr('data-context-'+key,value);
		},
		is	: function (key, value){
			return ($('html').attr('data-context-'+key)==value);
		}
	}

	$(document).on("change",".context-me",function (e){
		e.preventDefault();

		var t       = $(this);
		var id      = t.attr('data-context');
		var context = t.attr('data-context');

		var val     = t.val();
		var checked = t.prop('checked');
		if(checked=== undefined)
			var checked = true;

		t.parent('.btn').toggleClass('active');

		// $.context[id](context, val);
		var url       = Routing.generate('session');
		var data = {
			key 	: context,
			value 	: val,
			checked : checked
		}
		$.get(url,data, function(json) {

			$.context.set(t.data('context'),(checked)?val:false);
			var target = $('#app-content');
			target.loadme(true);
			$.get(window.location.href, function(html){
				target.html(html);
				target.loadme(false);
				target.initJq();
			})

			if (t.attr('data-cb'))
				$.cb[t.attr('data-cb')](t,e,json);

		},'json');
	});

	$.setIframe = function (url){
		$.context.set('n','iframe');
		$('#iframe').attr('src',url);
	}

	$.setDefault = function (){
		$.context.set('n','default');
	}
	$(document).on("click",".btn-close-context",function (e){
		e.preventDefault();
		var t = $(this);
		$.setDefault();
	})

	$(document).on("click",".btn-iframe",function (e){
		e.preventDefault();
		var t = $(this);
		$.setIframe(t.attr('href'));
	});
});
