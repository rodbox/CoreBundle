$.modal = {
    zindex : 3000,
    set : function(url, dataSend, modal, title, data){
      $.loadlock.on();
      $.get(url, dataSend, function(data) {

        $.modal.html(data, modal, title, data);
        $.loadlock.off();

      },'html').fail(function(err){
        $.loadlock.off();
        console.log(err);
        $.setFlash('erreur '+ err.status,'error', err.responseText);
      })
    },
    html:function(content, modal, title, data){
        if(modal)
          var modal = $(".modal."+modal);
        else
          var modal = $(".modalM");

        var dataDefault ={
            vertical : false,
            backdrop : 'static',
            keyboard : true
        };

        var data = $.extend(dataDefault, data);

        var modalDialog = modal.find('.modal-dialog');
        var clone       = modalDialog.clone();
        $('body').append(clone);

        if(data.vertical){

          clone.css({
            position:'fixed',
            top: -8000
          });

          var margTop = ($(window).outerHeight() / 3) - (clone.outerHeight());
          var margTopValue = (margTop > 0)?margTop+'px':'0.5rem';

          modalDialog.css({
            'margin-top': margTopValue
          });
        }
        else{
          var lopen = $('.modal.in').length;

          modalDialog.css({
              'margin-top': ((lopen + 1)*1.5)+'rem'
          });
        }

        clone.remove();

        $.modal.zindex += 2;
        modal.css('z-index',$.modal.zindex);

        modal.find('.modal-title').html(title);
        modal.find(".modal-body").html(content);
        modal.modal({
          backdrop: data.backdrop,
          keyboard: data.keyboard
        })
        .on('shown.bs.modal', function (e) {
          modal.find('input[autofocus="true"]').first().focus();
        })
        .on('hide.bs.modal',function(e){
          modal.addClass('modal-outro');
//alert('hide');
          setTimeout(function(){
            modal.removeClass('modal-outro');
          },350);
        })
        .on('hidden.bs.modal', function (e) {
//alert('hiden');
          modal.initJq('destroy');
           
        })
        .initJq();

        $('.modal-backdrop').last().css('z-index', $.modal.zindex - 1);


    },
    iframe:function(url,title){
        $.loadlock.on();
        var modal = $("#modalIframe");

        $.modal.zindex += 2;
        modal.css('z-index',$.modal.zindex);

        var iframe = $("<iframe>",{
          src  : url,
          load : function(){
              $.loadlock.off();
              modal.modal({
                backdrop: 'static',
                keyboard: false
              });

              $('.modal-backdrop').last().css('z-index', $.modal.zindex - 1);
            }
          });
        modal.find(".modal-body").html(iframe);
    },
    close: function(modal){
      if(modal)
        var modal = $(".modal#"+modal);
      else
        var modal = $(".modal");

      modal.addClass('modal-outro');
      setTimeout(function(){
        modal.modal('hide');
        modal.removeClass('modal-outro');
      },350);
    },
    json: function(json){
      if (json.modal != undefined && json.modal.content != undefined)
        $.modal.html(json.modal.content, json.modal.modal, json.modal.title);

      if (json.modal != undefined && json.modal.iframe != undefined)
        $.modal.iframe(json.modal.iframe, json.msg);
    }
  }

// fix le probleme de scroll lors de la fermeture de d'un modal au z index supperieur
$(document).on('hidden.bs.modal',".modal", function (e) {
  if($('.modal.in').length >0)
    $('body').addClass('modal-open');
});


$(document).on("click",".btn-modal",function (e){
    e.preventDefault();
    var t        = $(this);

    var url      = t.attr('href');
    var modal    = t.data('modal');
    var title    = t.attr('title');
    var data     = t.data();
    var vertical = t.attr('data-vertical');

    if (t.data('modal') == 'alone')
      $.modal.close();

    if (t.data('form') != undefined){
      var dataForm  = $(t.data('form')).serialize();
      var data      = $.extend(data, dataForm);
    }

    $.modal.set(url, data, modal, title, t.data());
  });

$(document).on("click",".btn-iframe",function (e){
  e.preventDefault();
  var t = $(this);

  $.modal.iframe(t.attr('href'));
})