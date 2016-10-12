$(document).ready(function($) {

  setTimeout(function (){
    $('.flash').addClass("outro");
    setTimeout(function (){
      $('.flash').remove();
    }, 1000)
  }, 3000);

  $.setFlash =  function (msg,type, err){
    var type   = (type == undefined)?"info":type;
    var div    = $("<div>",{"class":"flash flash-"+type})
    var a      = $("<a>",{"href":"#","class":"pull-right close-flash big"}).html("<i class='fa fa-remove'></i>");
    var p      = $("<p>").html(msg);
    var iframe = $("<iframe>",{'id':'ErrFrame',"src":'#'}).hide();

    div.append(a).append(p).append(iframe);


      $('div.flash-container').prepend(div);
      if (type!='error') {  
      
        setTimeout(function (){
          div.addClass("outro");
          setTimeout(function (){
              div.remove();
          }, 1000)
        }, 3000);
      }

      if (type=='error') {
          $('#ErrFrame').show().css({
            'margin-top':'1rem',
            'width':'100%',
            'height':'70vh',
            'border':'0px solid transparent'
          });

          var doc = document.getElementById('ErrFrame').contentWindow.document;
          doc.open();
          doc.write(err);
          doc.close();
      }



  }



  $(document).on("click",".close-flash",function (e){
    e.preventDefault();
    var t = $(this);
    var p = t.parents(".flash");
    p.addClass('outro');
    setTimeout(function (){
        p.remove();
    },1000)
  })



});
