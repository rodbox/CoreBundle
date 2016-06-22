$.shortcut={
    keyup: function(e){

    },
    keydown: function(e){

        $("#keyconsole").html(e.keyCode);

        if($.kalte("onCtrl") && $.kalte("onAlt")){
            e.preventDefault();
            $('header .input-me').focus();
        }
    }
};