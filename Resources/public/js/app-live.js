$(document).ready(function(){

  $.btnLoad = {
    on:function (t){
      if(t.is('form'))
        t = t.find('button[type="submit"]');


      var textAlt = t.attr('data-loading-text');
      textAlt = (textAlt==undefined)?"<i class='fa fa-refresh fa-spin'></i> "+t.html()+" ...":textAlt;

      t.attr('data-text',t.html());
      t.html(textAlt);
      t.attr('disabled','disabled');
      t.addClass('onLoad');
    },
    off:function (t){
      if(t.is('form'))
        t = t.find('button[type="submit"]');

      t.removeAttr('disabled');
      t.removeClass('onLoad');
      t.html(t.attr('data-text'));
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
              // modal json
              if (json.modal != undefined)
                $.modal.html(json.modal.content, json.modal.modal, json.modal.title);

              // flash json
              if(!t.hasClass('no-flash') || json.infotype=='error')
                $.setFlash(json.msg, json.infotype)

              // cb this
              if (t.data('cb') != undefined)
                $.cb[t.data('cb-app')][t.data('cb')](t, e, json);

              // cb json
              if (json.cb != undefined)
                $.cb[json.cbapp][json.cb](t, e, json);
            });
          }
        }
        // si c'est ok callback
        else{
          // cb this
          if (t.data('cb') != undefined)
            $.cb[t.data('cb-app')][t.data('cb')](t, e, json);

          // cb json
          if (json.cb != undefined)
            $.cb[json.cbapp][json.cb](t, e, json);
        }
        if(!t.hasClass('no-flash') || json.infotype=='error')
          $.setFlash(json.msg,json.infotype);

        $.btnLoad.off(t);
      }, 'json').error(function(err){
        $.btnLoad.off(t);
        $.setFlash('erreur '+ err.status,'error');
      });
    },
    reload: function(){
      $.post(window.location.href, function(json, textStatus, xhr) {
        $('#app-content').html(json);
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

  $(document).on("submit","form.form-live",function (e){
    e.preventDefault();
    var t    = $(this);

    $.live.post(t.attr('action'), t.serialize(), t, e);
  })

  $(document).on("click",".btn-del-li",function (e){
    e.preventDefault();  
    var t = $(this);
    
    var li = t.parent('li').remove();
    if(t.data('confirm') !=undefined){
      if(confirm(t.data('confirm')))
        li.remove();
    }
    else
      li.remove();
    
  })

})