$(document).ready(function($) {
    $(document).on("dblclick",".btn-edit-me",function (e){
        e.preventDefault();
        var t = $(this);
        t.hide();
        var input = $("<input>",{"name":"edit-me-setter"});
        input.val(t.html());
        input.on("keypress",function (e){
            e.preventDefault();
            var t = $(this);
            if(e.keyCode==13){
                var data = {
                    value: $(this).val()
                  }
                  $.post(t.attr('data-url'), data, function(json, textStatus, xhr) {
                    t.html($(this).val());
                    $(this).remove();
                    t.show();
                  },'json');
            }
            else{
                $(this).remove();
                t.show();
            }
        }).on('focusout',function(){
            $(this).remove();
            t.show();
        });
        t.after();
    })
});