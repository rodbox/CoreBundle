$(document).ready(function($) {

  setTimeout(function (){
    $('.flash').addClass("outro");
    setTimeout(function (){
      $('.flash').remove();
    },1000)
  },3000);

  $.setFlash =  function (msg,type){
  	var type = (type == undefined)?"info":type;
  	var div = $("<div>",{"class":"flash flash-"+type})
  	var a = $("<a>",{"class":"pull-right c-7 close-flash big"}).html("<i class='fa fa-remove'></i>");
  	var p = $("<p>",{"id":"id","class":"class"}).html(msg);
  	div.append(a).append(p);
	  	$('div.flash-container').prepend(div);
	  	setTimeout(function (){
	    div.addClass("outro");
	    setTimeout(function (){
	      div.remove();
	    },1000)
	  },3000);
  }

  $(document).on("click",".close-flash",function (e){
    e.preventDefault();
    var t = $(this);
    var p = t.parents("flash");
    p.addClass('outro');
    setTimeout(function (){
        p.remove();
    },1000)
  })



});