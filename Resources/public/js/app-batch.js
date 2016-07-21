$(document).ready(function($) {
    $(document).on("click",".toggle-batch-all",function (e){
        e.preventDefault();
        var t = $(this);

        t.toggleClass("active");

        $(t.data("batch")+" input[type=checkbox].line")
            .prop("checked",t.hasClass("active"))
            .trigger("change");
    })

    $(document).on("click",".btn-play-select",function (e){
        e.preventDefault();
        var t      = $(this);

        var target = t.data("target");
        var suffix = t.data("suffix");

        var src    = $(t.data('src')).val();
        // t.toggleClass('active');

        // si la chaine commence a par une etoile c'est pour uncheck.
        var checkOn = (src.indexOf("*")<0);
        if (!checkOn)
            src = src.substring(1);



        // si on selection par tranche
        if(src.indexOf(">")>0){
          var list = src.split('>');
          for (var i = list[0]; i <= list[1]; i++)
            $.checkLine(target, i, checkOn, t.data("suffix"));
        }

        else if (src.indexOf(",")>0){
          var list = src.split(',');
          $.each(list, function(index, val) {
            $.checkLine(target, val, checkOn, suffix);
          });
        }

        else if (src.indexOf(":")>0){
          var list = src.split(':');
          for (var i = list[0]; i < parseInt(list[0])+parseInt(list[1]); i++)
            $.checkLine(target, i, checkOn, suffix);
        }

  })

  $.checkLine = function(tableTarget, idLine, booleanCheck, suffix){
     // console.log("idLine");
     // console.log(idLine);
    suffix = ( typeof suffix === 'undefined')?"":suffix;


    var checkboxLine = $(tableTarget+" #line_"+idLine+suffix);
        checkboxLine.prop("checked",booleanCheck).trigger("change");
        var p = checkboxLine.parents('tr');
        (booleanCheck)?p.addClass("checked"):p.removeClass("checked");
  }

    $(document).on("click",".td-check label",function (e){

        var t       = $(this);
        var p       = t.parents("tr");

        var checked = $('#'+t.attr('for')).prop('checked');

        (!checked)?p.addClass('checked'):p.removeClass('checked');
    })

    $(document).on(" change","form.batch-form tr input.line, form.batch-form ul input.line",function (e){
        var t = $(this);
        var p = t.parents("tr");

        if(p.length == 0)
            var p = t.parents("li").first();

        (t.prop('checked'))?p.addClass("checked"):p.removeClass("checked");
    })

    $(document).on("click",".batch-action",function (e){
        e.preventDefault();
        var t = $(this);
        var data = $(t.data("batch")).serialize();

        if (t.data("confirm")) {
            $.confirm(t);
        }
        else{
            param.info = $.appInfo.add({
                type   : 'loader',
                'open' : true,
                'msg'  : 'chargement '+t.data("title")
            });
            $.post(t.attr("href"), data, function(json, textStatus, xhr) {
                $.appInfo.upd(param.info,{
                    from        : 'loader',
                    to          : 'success',
                    msg         : json.msg,
                    open        : true,
                    showmsgmeta : false,
                    timer       : 2500
                });
                if(t.data('callback'))
                    $.callback[t.data('callback')](json)
            },"json").error(function(json){
                $.appInfo.upd(param.info,{
                    from        : 'loader',
                    to          : 'error',
                    msg         : json.msg,
                    open        : true,
                    showmsgmeta : true
                });
            });
        }

    });

    $(document).on("change",".col-setter",function (e){
        e.preventDefault();
        var t = $(this);

        var checkedTarget = $("tr.checked").find(t.data('target'));
        $.each(checkedTarget, function(index, val) {
            var trCol = $(val);
            trCol.attr('data-history', trCol.val());
            $(val).val(t.val());
        });


    })
});
