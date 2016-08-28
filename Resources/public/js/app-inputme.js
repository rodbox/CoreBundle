$(document).on("focusin focusout keyup keydown",".input-me",function (e){

    var t = $(this);
    
    if (e.type == 'focusin') {
        $.suggest.on(t);
    }
    else if (e.type == 'focusout'){
       setTimeout(function(){
         $.suggest.off(t);
     },250);
    }
    else if (e.type == 'keydown'){
        if(e.keyCode == 40){
            e.preventDefault();
            $.suggest.down();
        }
        else if(e.keyCode == 38){
            e.preventDefault();
            $.suggest.up();
        }
        else if(e.keyCode == 13){
            e.preventDefault();

            var submitValue  = t.val();

            // if val est un calcule
            if(submitValue.includes('+') || submitValue.includes('-')  || submitValue.includes('*') || submitValue.includes('/') ){
                t.val(eval(submitValue));
            }
            // sinon c'est une valeur
            else{
                var form = t.parents('form');
                var active = $($.suggest.container).find('.active');
                if(active.length == 1){
                    // si l'action n'est pas forcé on envoie la suggestion selectionnée
                    if(!$.force())
                        form.find('.input-me').val(active.attr('data-value'));
                }

                form.trigger('submit');
                $.suggest.clear(t);
            }
        }
        else if(e.keyCode == 27){
            e.preventDefault();
            $.suggest.clear(t);
        }
        else{

        }
    }
    // keyup
    else{
        if(e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 13 && e.keyCode != 27){
            if (t.val().length>2)
                $.suggest.list(t);
            else
                $.suggest.clean(t);
        }
    }
})


/* créer la regexp pour trouver le resultat */
function regexp(strFind) {
    if ($.sui.is('strict','true'))
       var strReg    = "^"+strFind;
    else{
        var strReg = "";
        var reg = "[a-zA-Z0-9\\.\.\\s\_\-]{0,}";
        for (var i = 0; i < strFind.length; i++) strReg = strReg  + strFind[i] + "{1}(" + reg + ")";
    }

    return strReg;
}


$.suggest = {
    container : '',
    on:function(t){
        var container = $("<div>",{"id":t.attr('id')+"-suggest","class":"suggest list-group"}).css({
            position: 'absolute',
            top: t.position().top + t.outerHeight(),
            left: 0,
            width: t.parents('form').outerWidth()
        }).hide();
        $.suggest.container = container;
        t.after(container);
        t.trigger('keyup')
    },
    off:function(t){
        $($.suggest.container).remove();
    },
    up:function(t){
        console.log('up');
        var active = $($.suggest.container).find('.active')
        if(!active.is(':first-child'))
                active.removeClass('active').prev().addClass('active');
    },
    down:function(t){
        var active = $($.suggest.container).find('.active');
        if(!active.is(':last-child'))
                active.removeClass('active').next().addClass('active');
    },
    list:function(t){

        var c = $($.suggest.container);
        c.html('');

        var reg     = regexp(t.val());
        var patt    = new RegExp(reg, "i");
        
        if (t.data('local') != undefined) {
            
            var list = $.local.get(t.data('local'));

            $.each(list, function(k,val){
                var name = val.name;
                var eval = name.match(patt);
               
                if(eval){
                    c.show();
                    var listitem = $.mustache(t.data('view'),val);
                    c.append(listitem);
                }
            })
        }


        if (t.data('live') != undefined) {

            if (t.val().length >= 3) {
                c.show();
                clearTimeout($.timer);
                $.timer = setTimeout(function(){
                    var url = Routing.generate(t.data('live'));
                    
                    $.ajax({
                        url      : url,
                        data     : {
                            action: t.val()
                        },
                        async    : true,
                        dataType : 'json'
                    })
                    .done(function(json) {
                        $.each(json, function(k,val){
                            console.log(val);
                            var name = val.name;
                            var eval = name.match(patt);
                            if(eval){
                                var listitem = $.mustache(t.data('view'),val);
                                c.append(listitem);
                            }
                        })  
                    });    
                },300)
            }
            else
                c.hide();
        }

        c.find('.list-group-item').first().addClass('active');
    },
    clear:function(t){
        $.suggest.clean(t)
        t.val('');
    },
    clean:function(t){
        var c = $($.suggest.container);
        c.html('');
    },
    valid:function(t){
        console.log('valid');
    }
}


$(document).on('click',".btn-trigger-submit",function (e){
    e.preventDefault();
    var t = $(this);

    var form = t.parents('form');
    form.find('.input-me').val(t.attr('data-value'))
    form.trigger('submit');
})