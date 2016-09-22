$(document).ready(function(){

  $.btnLoad = {
    on:function (t){
      t.addClass('onLoad');

      if(t.is('form'))
        t = t.find('button[type="submit"]');

      var textAlt = t.attr('data-loading-text');
      textAlt = (textAlt==undefined)?"<i class='fa fa-refresh fa-spin'></i> "+ t.text():textAlt;
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

      if(t.is('form')){
        if (json != undefined) {

          if(json.autoclose)
            t.parents('.modal').modal('hide');

          if(json.autoclear)
            t.find('.autoclear').val('');

          if(json.refresh)
            $.refresh();

        }
          
        t = t.find('button[type="submit"]');
      }

      t.removeAttr('disabled');
      t.removeClass('onLoad');
      t.html(t.attr('data-text'));

      if (err != undefined)
        $.noty.reponse(err);
    }
  }



  $.target = {
    json : function(json){
      if(json.target != undefined){
        $.each(json.target,function(key, val){
          $.target[key](json);
        });
      }
    },
    append : function(json){
      $.each(json.target.append,function(key, val){
        $(key).append(val);
        $(key).initJq();
      })
    },
    prepend : function(json){
      $.each(json.target.prepend,function(key, val){
        $(key).prepend(val);
        $(key).initJq();
      })
    },
    html : function(json){
      $.each(json.target.html,function(key, val){
        $(key).html(val);
        $(key).initJq();
      })
    }
  }



$.live = {
    post : function(url, data, t, e){
      $.btnLoad.on(t);
      $.post(url, data, function(json, textStatus, xhr) {
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

             $.target.json(json);
             
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
          $.target.json(json);
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
      var target = $(t.data('target'));
      target.loadme(true);
      t.addClass('active');

      // push History
      window.history.pushState(t.attr('title'), t.attr('title'), url);
      
      $.post(url, data, function(html, textStatus, xhr) {
        target.html(html);
        target.loadme(false);
        target.initJq();
      });
    },
    input: function(t){
      var e     = null;
      
      var data  = t.data();
      var route = t.attr('data-route');
      var url   = t.attr('data-url');

      if(url == undefined){
        var url = Routing.generate(route);
        t.attr('data-url',url);
      }

      data.value = t.val();
      
      t.loadme(true);
      $.get(url, data, function(json){
        t.loadme(false, json);
        $.cbt.this(t, json, e);
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



  $(document).on("submit","form.form-live", function (e){
    e.preventDefault();
    var t    = $(this);
    var data = t.serialize();

    $.live.post(t.attr('action'), data, t, e);
  });



  $(document).on("submit","form.form-live-target", function (e){
    e.preventDefault();
    var t    = $(this);
    var data = t.serialize();

    $.live.target(t.attr('action'), data, t, e);
  });



  $(document).on("change","form.form-live-target input, form.form-live-target select:not(.page-link), form.form-live-target textarea",function (e){
    $(this).parents("form.form-live-target").trigger('submit');
  })



  $.timer = {
    tmp:{}
  };



  $(document).on("keypress",".input-live",function (e){
    var t         = $(this);

    if(e.keyCode == "13")
      $.live.input(t);
  })



  $(document).on("click",".btn-del-li",function (e){
    e.preventDefault();
    var t   = $(this);
    var li  = t.parents('li').first().remove();
    if(t.data('confirm') != undefined){
      if(confirm(t.data('confirm')))
        li.remove();
    }
    else
      li.remove();
  })

})