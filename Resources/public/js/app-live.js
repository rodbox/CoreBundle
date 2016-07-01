$(document).ready(function(){
$.live = {
  post : function(t){
    var data =  (t.data('src')) ? $(t.data('src')).serialize():{};

    $.btnLoad.on(t);
    $.post(t.attr('href'),data , function(json, textStatus, xhr) {
      // if error
      if(json.infotype == "error"){
        $.setFlash(json.msg,json.infotype);
        // confirm forcer
        if(confirm('forcer ?')){
          // envois forcer
          data.force = true;
          $.post(t.attr('href'),data , function(json, textStatus, xhr) {
            $.setFlash(json.msg,json.infotype)
            // si c'est ok callback
            /* callback return */
            if (t.data('cb'))
              $.cb[t.data('cb')](t,e,json);

            if (json.cb != undefined)
                $.cb[json.cbapp][json.cb](t,e,json);
            /* end callback */

          });
        }
      }
      // si c'est ok callback
      else{
              /* callback return */
        if (t.data('callback'))
          $.cb[t.data('callback')](t,e,json);
        /* end callback */

      }
      $.setFlash(json.msg,json.infotype);
      $.btnLoad.off(t);
    },'json').error(function(err){
      $.btnLoad.off($(this));
      $.setFlash('erreur '+ err.status,'error');
    });
  },
  reload: function(){
    $.post(window.location.href , function(json, textStatus, xhr) {
      $('#app-content').html(json);
    });
  }
}
)}