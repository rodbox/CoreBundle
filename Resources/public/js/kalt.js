$.shortcut={
    keyup: function(e){

    },
    keydown: function(e){

        $("#keyconsole").html(e.keyCode);

        if($.kalte("onCtrl") && $.kalte("onAlt")){
            $('header .input-me').focus();
        }
    }
};