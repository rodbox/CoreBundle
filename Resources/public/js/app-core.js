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

    // init Jquery
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
          clearTimeout($.timer.tmp);
          $.timer.tmp = setTimeout(function(){
            $.live.input(t);
          },500)
        })
      })

      return this;
    };

    // system de mini notification
    $.fn.tnoty = function(type) {
      var t       = $(this);

      var pos     = t.position();

      var tnotyID = "tnoty-"+Math.random().toString(36).substring(2);
      var tnoty   = $("<span>",{"id":tnotyID, "class":"tnoty label"});
      
      tnoty.css({
        top:pos.top,
        left:pos.left
      });

      if (t.attr('data-tnoty')!= undefined)
        $('#'+t.attr('data-tnoty')).remove();

      t.attr('data-tnoty',tnotyID);

      if (type=='loader')
        var noty = $("<i>",{"class":"fa fa-refresh fa-spin"});
      else if (type=='success')
        var noty = $("<i>",{"class":"fa fa-checkmark"});
      else
        var noty = $("<i>",{"class":"fa fa-remove"});

      tnoty.html(noty);
      t.after(tnoty);
      
      if (type!='loader'){
        setTimeout(function(){
          tnoty.remove();
        },3500)
      }

      return this;
    };

    // loader
    $.fn.loadme = function(action, json, color){
        var color  = (color == undefined)?'default':color;

        var t       = $(this);

        if(action && !t.hasClass('onLoad')) {
          var rand = Math.random().toString(36).substring(2);

          t.attr('data-loadme','loadme-'+rand);

          t.attr('disabled',true);
          t.addClass('onLoad');
          var pos   = t.offset();

          var clone = t.clone();
          clone.append('<div class="clearfix"></div>');
          clone.css({
            position:'relative',
            top: -10000
          });
          $('body').append(clone);
          var h = t.outerHeight();
          var w = t.outerWidth();
          clone.remove();

          var div = $("<div>",{"id":"loadme-"+rand,"class":"loadme"})
            .css({
              width        : w,
              height       : h
            })
            .html('<i class="fa fa-refresh fa-spin"></i>');

            div.addClass('loadme-'+color);
            
            if (t.is('#app-content')) {
              $('body').addClass('noScroll');
              div.css({
                'height':'100vh',
                'width':'100vw',
                'top':'0',
                'position':'fixed !important'
              })
            }

            t.before(div);
        }
        else {
          var id = t.attr('data-loadme');

          var lm = $('#'+id);

          // si il n y a pas de json on supprime le loader simplement  
          if (json == undefined || json == ''){
            t.removeClass('onLoad');
            t.removeAttr('disabled');
            lm.remove();
          }

          // si il y a un retour json on change le loader
          else {

            var info = json.infotype;

            if (info =='success')
              var content = $("<i>",{"class":"fa fa-check"});
            else
              var content = $("<i>",{"class":"fa fa-remove"});

            lm.html(content);

            setTimeout(function(){
              t.removeClass('onLoad');
              t.removeAttr('disabled');
              
              if (t.is('#app-content'))
                $('body').removeClass('noScroll');

              lm.remove();
            },250)
          }
          t.removeAttr('data-loadme');
        }
      return this;
    }


    // serialise object
    $.fn.serializeObject = function()
    {
       var o = {};
       var a = this.serializeArray();

       $.each(a, function() {
           if (o[this.name]) {
               if (!o[this.name].push)
                   o[this.name] = [o[this.name]];

               o[this.name].push(this.value || '');
           }
           else
              o[this.name] = this.value || '';

       });

       return o;
    };

    $.rand = function(){ return Math.random().toString(36).substring(2); }

    $.query = {
      string : function(url) {
        var params = {};
        if (url != null) {
            var url     = url.split('?');
            var parts   = url[1].split('&');
        }
        else {
            var url     = location.search;
            var parts   = url.substring(1).split('&');
        }
        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }

        return params;
      },
      array : function(url) {
        
      }
    }


})(jQuery);

$(document).ready(function($) {


  $.timer = {
    tmp:{}
  };
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



    $.refresh = function(){
      setTimeout(function(){
        $.setFlash('patientez 1sec SVP');
        window.location.href = window.location.href;
      },1000);
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



    $.history = {
      push : function(url, data){
        if (data != undefined) {

          if($.isArray(data) || typeof data === "object")
            data =$.param(data);

          if (url.indexOf('?') == -1)
            url +='?'+data;
          else
            url +='&'+data;
        }

        //console.log(data);
        //console.log($.query.string(url));
        

        history.pushState({}, '', url);
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



    $(document).on("change",".toggle-me",function (e){
      e.preventDefault();

      var t       = $(this);
      var p       = t.parents('.btn');
      var checked = t.prop('checked');
      var data    = {
        active : checked
      };

      $.get(t.attr('data-url'), data,function(){
        if(checked)
          p.addClass('active');
        else
          p.removeClass('active');
      });      
    })



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
      });


      setTimeout(function(){
        $('.autoclick').trigger('click');
      },250);

      $.appInfo.init();
});