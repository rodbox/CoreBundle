    $(document).on("click",".pagination a.page-link, th.sorted a, th a.sortable",function (e){
      e.preventDefault();
      var t = $(this);
      var url = t.attr('href');

      $.get(url, function(html) {
          $("#app-content").html(html);
          history.pushState(null, t.attr('title'), url);
          var url = location.href;
      });
    })