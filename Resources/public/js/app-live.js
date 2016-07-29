$(document).ready(function(){

  $.btnLoad = {
    on:function (t){
      t.addClass('onLoad');

      if(t.is('form'))
        t = t.find('button[type="submit"]');

      var textAlt = t.attr('data-loading-text');
      textAlt = (textAlt==undefined)?"<i class='fa fa-refresh fa-spin'></i> "+t.html()+" ...":textAlt;
      t.css({
        'min-width':t.outerWidth()
      });
      t.attr('data-text',t.html());
      t.html(textAlt);
      t.attr('disabled','disabled');
      t.addClass('onLoad');
    },
    off:function (t, json, err){
      t.removeClass('onLoad');

      if(t.is('form'))
        t = t.find('button[type="submit"]');

      t.removeAttr('disabled');
      t.removeClass('onLoad');
      t.html(t.attr('data-text'));

      if (err != undefined)
        $.noty.reponse(err);
    }
  }

  $.live = {
    post : function(url, data, t, e){

      $.btnLoad.on(t);
      $.post(url, data, function(json, textStatus, xhr) {
        // if error
        if(json.infotype == "error"){
          if(!t.hasClass('no-flash') || json.infotype=='error')
            $.setFlash(json.msg, json.infotype);

          // confirm forcer
          if(confirm('forcer ?')){
            // envois forcer
            data.force = $.force();
            $.post(url, data, function(json, textStatus, xhr) {

              $.modal.json(json);

              if(!t.hasClass('no-flash') || json.infotype=='error')
                $.setFlash(json.msg, json.infotype)

             $.cbt.this(t, json, e);
             $.cbt.json(t, json, e);

             $.btnLoad.off(t, json);
            }).error(function(err){
              $.btnLoad.off(t, '', err);
              $.setFlash('erreur '+ err.status,'error');
            });
          }
        }
        // si c'est ok callback
        else{

          $.modal.json(json);

          $.cbt.this(t, json, e);
          $.cbt.json(t, json, e);
          $.btnLoad.off(t, json);
        }
        if(!t.hasClass('no-flash') || json.infotype=='error')
          $.setFlash(json.msg,json.infotype);

        $.btnLoad.off(t, json);
      }, 'json')
      .error(function(err){
        $.btnLoad.off(t);
        $.setFlash('erreur '+ err.status,'error');
      });
    },
    reload: function(){
      $.post(window.location.href, function(json, textStatus, xhr) {
        $('#app-content').html(json);
      });
    },
    target: function(url, data, t, e){
      $(t.data('target')).addClass('onLoad');
      t.addClass('active');
      $.post(url, data, function(html, textStatus, xhr) {
        $(t.data('target')).removeClass('onLoad').html(html)
      });
    }
  };



  $(document).on("click", ".btn-live", function (e){
    e.preventDefault();
    var t    = $(this);

    if (t.data('confirm') != undefined) {
      if (confirm(t.data('confirm')))
        $.live.post(t.attr('href'), t.data(), t, e);
    }
    else
      $.live.post(t.attr('href'), t.data(), t, e);
  })



  $(document).on("click", ".btn-live-target", function (e){
    e.preventDefault();
    var t    = $(this);
    $(".btn-live-target").removeClass('active');
    $.live.target(t.attr('href'), t.data(), t, e);
  })



  $(document).on("submit","form.form-live",function (e){
    e.preventDefault();
    var t    = $(this);

    $.live.post(t.attr('action'), t.serialize(), t, e);
  })



  $(document).on("click",".btn-del-li",function (e){
    e.preventDefault();
    var t = $(this);

    var li = t.parents('li').first().remove();
    if(t.data('confirm') !=undefined){
      if(confirm(t.data('confirm')))
        li.remove();
    }
    else
      li.remove();
  })

})