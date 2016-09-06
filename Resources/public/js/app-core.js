(function($) {
    // creer un attribut data-ext avec l'extension du fichier dans data-file
    $.fn.fileext = function(options) {
      var list = $(this).find("a.file-ext, .extension-me");

      $.each(list,function(){
        var t    = $(this);
        var file = t.data("file");
        var ext  = file.split('.');
        t.attr("data-ext",ext[ext.length - 1]);
      })

      return this;
    };


    $.fn.initJq = function(opt) {

      var chosen = $(this.selector +' select.form-control');
      var inputSpin = $(this.selector +' input.input-spin');

      if(opt == 'destroy'){
        chosen.chosen('destroy');
      }
      else{
        chosen.chosen();
        $(this.selector +' [autofocus="true"]').focus();
      }

      $.each(inputSpin, function(key, val){
        var t = $(val);
        t.TouchSpin({
          "verticalbuttons": true,
          "verticalupclass": 'fa fa-plus',
          "verticaldownclass": 'fa fa-minus'
        }).on('touchspin.on.stopspin',function () {
           $.live.input(t);
        })
      })

      return this;
    };

})(jQuery);

$(document).ready(function($) {

    $.init = function(container){

        if (container == undefined)
          var container = 'html';

        // init extenstion
        $(container+' body').fileext();

        // init tooltip
        $(container+' [data-toggle="tooltip"]').tooltip({
            placement: top
        });

        $(container+' body').initJq();
        $(container+' [autofocus=true]').focus();

        setTimeout(function (){
            $('html').addClass('loaded');
        },50)
    }



    $.serializeRow = function(lineSelector){

      var myjson = new Object();

      var formList = $(lineSelector).find('input, select, textarea');
      $.each(formList, function(index, val) {
        myjson[$(val).attr('data-name')] = $(val).val();
      });

      return myjson;

    }



    //cleanArray removes all duplicated elements
    $.cleanArray = function (array) {
      var i, j, len = array.length, out = [], obj = {};
      for (i = 0; i < len; i++) {
        obj[array[i]] = 0;
      }
      for (j in obj) {
        out.push(j);
      }
      return out;
    }



    //http://jsfiddle.net/W8Byu/1/
    $.sortBy = function(arr,colName){
      var sortColumnName = colName;

      function SortByName(x,y) {
        return ((x[sortColumnName]  == y[sortColumnName]) ? 0 : ((x[sortColumnName]> y[sortColumnName]) ? 1 : -1 ));
      }

      // Call Sort By Name
      arr.sort(SortByName);
    }



    /** Range les doublons d'un array dans un objet avec en index la valeur du doublon et en valeur son nombre de duplications */
    //http://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
    $.countArray = function(arr){
        var map = arr.reduce(function(prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});

      return map;
    }



    $.img = function (url,size, cssClass){
      return $("<div>",{"class":"cover img img-"+size+" "+cssClass}).css('background-image','url('+url+')');
    }



    // gere l'insertion dans le dom des objets contenue dans json.target
    // la clés est le selecteur de la destination de son contenue
    // json.a est le type d'insertion (append, prepend, html, ...)
    $.a = function (t, json){
      if (json.target != undefined) {
        $.each(json.target, function(index, val) {
            $(index)[json.a](val);
        });
      }
    }



    $.t = {
      tmp : new Array(),
      push : function(ref, msg){
        $.t.tmp.push({
          ref : ref,
          msg : msg,
          date: new Date()
        });
      },
      sync : function(){
        $.get(Routing.generate('t'),{t:$.t.tmp},function(){$.t.tmp = [];});
      },
      a:function(ref, msg){
        $.t.push(ref, msg);
        $.t.sync();
      }
    }



    $.counter = function (){
      $.get(Routing.generate('ct'), function(json) {
          $.each(json.counter, function(index, val) {
              var counter =$('.counter.counter-'+index);
              counter.attr("data-count",val);
              counter.html(val);
          });
      },'json');
    }



    $.loadlock = {
        on : function (msg){
            $('body').addClass('load-lock');
            $('.load-msg').html(msg);
        },
        off : function (){
            $('.load-msg').html("");
            $('body').removeClass('load-lock');
        },
        upd : function (msg){
         $('.load-msg').html(msg);
        },
        success : function (msg){
            $('body').addClass('load-success');
            setTimeout(1500,function(){
              $('body').addClass('load-success');
            })
        }
    }


    $(document).on("keydown","textarea[data-tab=true]",function (e){
        if (e.keyCode === 9) {

            var val             = this.value,

            start               = this.selectionStart,
            end                 = this.selectionEnd;
            this.value          = val.substring(0, start) + '\t' + val.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;

            return false;
        }

        if (e.keyCode === 13) {

            var val             = this.value,

            start               = this.selectionStart,
            end                 = this.selectionEnd;
            this.value          = val.substring(0, start) + '\n' + val.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;

            return false;
        }
    });



    $(document).on("click",".btn-nav",function (e){
        e.preventDefault();
        var t      = $(this);

        var target = $(t.data('target')).find('.active');

        if(t.data('sens') == 'next')
            target.next().trigger('click');
        else
            target.prev().trigger('click');
    })



    $(document).on("click",".btn-trigger",function (e){
        e.preventDefault();
        var t = $(this);
        $(t.data('src')).trigger(t.data('trigger'));
    })



    $(document).on("click",".btn-del-target, .btn-del, .btn-delete",function (e){
        e.preventDefault();
        var t = $(this);

        if(t.data('confirm') != undefined){
          if(confirm(t.data('confirm')))
            $(t.data('target')).remove();
        }
        else
            $(t.data('target')).remove();
      })



      $(document).on("click",".btn-del-tr",function (e){
        e.preventDefault();
        var t = $(this);

        t.parents('tr').first().remove();
      })



      $.timer2 = {
        tmp:{}
      };
      $(document).on("mousedown",".btn-increment",function (e){
        e.preventDefault();
        var t         = $(this);
        var val       = t.data('val');
        var target    = t.parents('.input-group-increment').find('.increment-me');

        var increment = parseInt(target.data('increment'));

        if(t.hasClass('btn-increment-minus'))
          var targetVal = parseInt(target.val())-increment;
        else
          var targetVal = parseInt(target.val())+increment;

        target.val(targetVal);

        clearTimeout($.timer2.tmp);
        $.timer2.tmp = setTimeout(function(){
          $.live.input(target);
        },500);
      });



      $(document).on("keypress",".increment-me",function (e){
        var t = $(this);
        var p = t.parents('.input-group-increment');

        if (e.keyCode == '38'){
          e.preventDefault();
          p.find('.btn-increment-minus').trigger('click');
        }
        else if (e.keyCode == '40'){
          e.preventDefault();
          p.find('.btn-increment-plus').trigger('click');
        }

      })




});