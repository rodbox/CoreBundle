  $.modal = {
    zindex : 3000,
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
    html:function(content, modal, title){
        if(modal)
          var modal = $(".modal#"+modal);
        else
          var modal = $("#modalM");

        $.modal.zindex += 2;
        modal.css('z-index',$.modal.zindex);

        modal.find('.modal-title').html(title);
        modal.find(".modal-body").html(content);
        modal.modal({
          backdrop: 'static'
        });

        $('.modal-backdrop').last().css('z-index', $.modal.zindex - 1);

        modal.initJq();

        setTimeout(function(){
          modal.find('input[autofocus="true"]').first().focus();
        },200)
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
                backdrop: 'static'
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
      modal.modal('hide');
    },
    json: function(json){
      if (json.modal != undefined && json.modal.content != undefined)
        $.modal.html(json.modal.content, json.modal.modal, json.modal.title);
      
      if (json.modal != undefined && json.modal.iframe != undefined)
        $.modal.iframe(json.modal.iframe, json.msg);
    }
  }

$(document).on("click",".btn-modal",function (e){
    e.preventDefault();
    var t     = $(this);

    var url   = t.attr('href');
    var modal = t.data('modal');
    var title = t.attr('title');
    var data  = t.data();

    if (t.data('modal') == 'alone')
      $.modal.close();

    if (t.data('form') != undefined){
      var dataForm  = $(t.data('form')).serialize();
      var data      = $.extend(data, dataForm);
    }

    $.modal.set(url,data,modal,title);
  });

$(document).on("click",".btn-iframe",function (e){
  e.preventDefault();
  var t = $(this);

  $.modal.iframe(t.attr('href'));
})