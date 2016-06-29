$(document).ready(function($) {
    $(document).on("dblclick",".btn-edit-me",function (e){
        e.preventDefault();
        var t = $(this);

        var input = $("<input>",
            {
                "type":"text",
                "name":"edit-me-setter",
                "class":"form-control",
                'data-old-value':t.html()
            })
        .css({
            width:parseInt(t.outerWidth()) + 50,
            display:'inline-block'
        })
        .val(t.html())
        .on("keypress",function (e){
        if(e.keyCode==13){
            e.preventDefault();
            var data = {
              value: $(this).val()
            }

            t.html(input.val());
            $(this).remove();
              t.show();
            $.post(t.attr('data-url'), data, function(json, textStatus, xhr) {
              t.html(input.val());

            },'json');
        }
        else if(e.keyCode==27) {
            e.preventDefault();
            $(this).remove();
            t.show();
        }
        else{}

        });
        t.hide();
        t.after(input);

        input.focus();
    })
});