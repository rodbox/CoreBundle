$(document).on("click",".tab-live",function (e){
    var t = $(this);
    if(!t.hasClass('loaded') || $.force()){
        $.btnLoad.on(t);
        var url = t.attr("data-url");
        var target = $(t.attr('href'));
        target.addClass('onLoad');
        $.get(url,function(){
            t.addClass('loaded');
            target.html(json.html);
            $.btnLoad.off(t,json);
            target.removeClass('onLoad');
        },'json')
    }
})