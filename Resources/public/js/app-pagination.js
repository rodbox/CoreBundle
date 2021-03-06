(function($) {
    // creer un attribut data-ext avec l'extension du fichier dans data-file
    $.fn.pagin = function(p) {
    
        var paramDefault = {
            id         : 'pagin',
            data       : {},
            dataPage   : {},
            dataFilter : {},
            filters    : ['name'],
            sorts      : ['name'],
            view       : '',
            per        : 7,
            cur        : 1
        };

        var p = $.extend(paramDefault, p);

        var s = {
            cur       : $('.pagin-'+p.id+'-cur'),
            container : $('#'+p.id+'-pagin')
        };



        function init(){
            p.dataFilter = p.data;
            p.pages      = p.data.length / p.per;

            s.cur.html('');
            for (var i = 1; i < p.pages; i++)
                s.cur.append('<option value="'+i+'">'+i+'</option>');

            s.cur.val(p.cur);
        }



        function page(cur){
            if (cur > 0 && cur <= p.pages) {
                p.cur      = cur;

                var first  = (cur - 1) * p.per;
                var last   = cur * p.per;

                last       = (last > p.data.length)? p.per : last;

                p.dataPage = p.dataFilter.slice(first, last);

                s.container.html("");
                s.cur.val(cur);

                $.each(p.dataPage, function(key, val){
                    val.key   = key;
                    var item  = $.mustache(p.id, { item: val });
                    s.container.append(item);
                }) 
            }
        }


        
        $('.btn-pagin').on("click",function (e){
            e.preventDefault();    
            var t = $(this);
            
            page(p.cur + parseInt(t.data('pagin')));
        })



        s.cur.on("change",function (e){
            e.preventDefault();    
            var t = $(this);

            page(t.val());            
        })


        init();
}})(jQuery);



$(document).on("click",".pagination a.page-link, th.sorted a, th a.sortable",function (e){
  e.preventDefault();
  var t = $(this);
  var url = t.attr('href');

  $.get(url, function(html) {
      $("#app-content").html(html);
      history.pushState(null, t.attr('title'), url);
      var url = location.href;
  });
});

$(document).on("change",".pagination select.page-link",function (e){
  e.preventDefault();
  var t = $(this);
  var url = t.data('url');
  var data = {
    page:t.val()
  };

  $.get(url,data, function(html) {
      $("#app-content").html(html);
      history.pushState(null, t.attr('title'), url);
      var url = location.href;
  });
});