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
	 * La liste de suies propre à chaques types est à définir en fonction des besoins de chaque type
	 */

	$.sui = {
		get	: function (key){
			return $('html').attr('data-context-'+key);
		},
		set	: function (key, value, cb){

			var urlSession = Routing.generate('session');

			var data       = {
				key : key,
				value: value
			}

			$.get(urlSession, data);

			return $('html').attr('data-context-'+key,value);
		},
		is	: function (key, value){
			return ($('html').attr('data-context-'+key)==value);
		}
	}

	$.setIframe = function (url){
		$.sui.set('n','iframe');
		$('#iframe').attr('src',url);
	}

	$.setDefault = function (){
		$.sui.set('n','default');
	}
	$(document).on("click",".btn-close-sui",function (e){
		e.preventDefault();
		var t = $(this);
		$.setDefault();
	})

	$(document).on("click", ".btn-sui", function (e){
		e.preventDefault();
		var t = $(this);
		t.toggleClass('active');
		var value = (t.hasClass('active'))?t.attr('data-sui'):false;
		$.sui.set(t.attr('data-k'),value);

		if (t.data('cb'))
            $.cb['app'][t.data('cb')](t, e);

	});


	$(document).on("change", ".radio-sui input", function (e){
		e.preventDefault();
		var t = $(this);
		// t.toggleClass('active');
		var value = t.val();
		$.sui.set(t.attr('data-k'),value);

		if (t.data('cb'))
            $.cb['app'][t.data('cb')](t, e);

	});

	$(document).on("click",".btn-context-collapse",function (e){
		e.preventDefault();
		var t = $(this);
		t.toggleClass('open');
		$(t.attr('href')).toggle();

	})

});
