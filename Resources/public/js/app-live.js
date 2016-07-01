$(document).ready(function(){

  $.live = {
    post : function(t, e){
      var data = (t.data('src')) ? $(t.data('src')).serialize():{};

      $.btnLoad.on(t);
      $.post(t.attr('href'), data, function(json, textStatus, xhr) {
        // if error
        if(json.infotype == "error"){
          $.setFlash(json.msg, json.infotype);
          // confirm forcer
          if(confirm('forcer ?')){
            // envois forcer
            data.force = true;
            $.post(t.attr('href'), data, function(json, textStatus, xhr) {
              $.setFlash(json.msg, json.infotype)
              // si c'est ok callback
              if (t.data('cb'))
                $.cb[t.data('cb')](t, e, json);

              if (json.cb != undefined)
                $.cb[json.cbapp][json.cb](t, e, json);
            });
          }
        }
        // si c'est ok callback
        else{
          if (t.data('cb'))
            $.cb[t.data('cb')](t, e, json);

          if (json.cb != undefined)
            $.cb[json.cbapp][json.cb](t, e, json);
        }
        $.setFlash(json.msg,json.infotype);
        $.btnLoad.off(t);
      }, 'json').error(function(err){
        $.btnLoad.off($(this));
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
      if (confirm(t.data('confirm'))) {
        $.live.post(t, e);
      }
    }
    else{
      $.live.post(t, e);
    }
  })

})