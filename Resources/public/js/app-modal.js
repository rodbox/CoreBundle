$(document).ready(function(){
  $.modal = {
    set : function(url, dataSend, modal, title){
      $.loadlock.on();
      $.post(url, dataSend, function(data) {

        $.modal.html(data, modal, title);
        $.loadlock.off();

      },'html').error(function(err){
        $.loadlock.off();
        $.setFlash('erreur '+ err.status,'error');
      })
    },
    html:function(content,modal,title){
        if(modal)
          var modal = $(".modal#"+modal);
        else
          var modal = $("#modalM");

        modal.find('.modal-title').html(title);
        modal.find(".modal-body").html(content);
        modal.modal({
          backdrop: 'static'
        });

        modal.initJq();

        setTimeout(function(){
          modal.find('input[autofocus="true"]').first().focus();
        },200)
    },
    close: function(modal){
      if(modal)
          var modal = $(".modal#"+modal);
        else
          var modal = $(".modal");
      modal.modal('hide');
    }
  }
})



