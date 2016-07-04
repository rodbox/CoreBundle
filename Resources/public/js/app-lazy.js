$.lazy = {
    all : function (){
      $.each($('.panel-me-lazy'), function(index, val) {
        var t = $(val);
        $.lazy.load(t);
      });
    },
    load : function (t){
      t.addClass('onLoad');
      t.removeClass('loaded');
      $.get(t.data('url'), function(data) {
        t.removeClass('onLoad');
        t.addClass('loaded');
        t.find('.panel-body').html(data);
      });
    },
    test: function (){
      console.log('scroll test');
    },
    refresh: function(t){
      var target = $(t.data('target')+".panel-me-lazy");
      $.lazy.load(target);
    }
  };

  $(document).on("click",".btn-lazy-refresh",function (e){
    e.preventDefault();  
    var t = $(this);

    $.lazy.load($(t.data('target')));
    $.counter();
    
  })