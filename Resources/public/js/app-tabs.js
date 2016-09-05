$(document).on("click dblclick",".tab-live",function (e){
    var t = $(this);
    if(!t.hasClass('loaded') || $.force() || e.type=='dblclick'){
        $.btnLoad.on(t);
        var url = t.attr("data-url");
        var target = $(t.attr('href'));
        target.addClass('onLoad');
        $.get(url,function(html){
            t.addClass('loaded');
            target.html(html);
            target.initJq();
            $.btnLoad.off(t,{});
            target.removeClass('onLoad');
        })
    }
})

$('a.tab-live').first().trigger('dblclick');