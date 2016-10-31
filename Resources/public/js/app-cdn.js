/**
 * Initialise une lib du cdn
 */

// initialise lib
$.cdn = {
    url: "http://cdn.rodbox.fr/assets",
    lib:{
        
    },
    loaded:[], 
    loadCss: function  (data, lib){
        var style = $("<style>",{"rel":"stylesheet", "data-cdnlib":lib});
        style.append(data)
        $('head').append(style);
        //$.getScript($.cdn.url+file);
        console.log('css');
    },
    loadJs: function  (data, lib){
        var script = $("<script>",{"data-cdnlib":lib});
        script.append(data)
        $('body').append(script);
        //$.getScript($.cdn.url+file);
        /*$.ajax({
            
            contentType: "text/javascript",
            async:false,
            xhrFields: {
              withCredentials: true
            },
            
            crossOrigin: true,
            type:'GET',

            url:$.cdn.url+file,
            datatype:'script'
        })*/
        //$('body').append(script);
        console.log('js');
    },
    loadInit: function  (script, lib, t, param){
         var script = $("<script>",{"data-cdnlib":lib});
        script.append(data)
        $('body').append(script);
        //var script = $("<script>",{"src":$.cdn.url+'/'+lib+'/'+file, "data-cdnlib":lib});
    },
    load: function(lib, t, param){
        console.log($.inArray(lib, $.cdn.loaded));
        //console.log(load);
        // si la lib n'est pas chargé on la telecharge
       if ($.inArray(lib, $.cdn.loaded)<0) {  
            //var url = Routing.generate('cdn',{lib:lib});
            var url = $.cdn.url+"/expose/index.php?lib="+lib;
            $.ajax({
                url:url,
                type:'GET',
                dataType:'json',
                success: function(json){
                    $.cdn.lib[lib]=json;

                    $.cdn.loadCss(json.content.css,lib);
                    $.cdn.loadJs(json.content.js,lib);
                    $.cdn.loadJs(json.content.init.default,lib);
                
                   /* $.each(json.init,function(key, file){

                        $.cdn.loadInit(file,lib, t, param);
                    })*/
                    
                    $.cdn.loaded.push(lib);
                }
            });
            //$.cdn.lib[lib](t, param);
          //  alert('load'+lib);
        }
    },
    init:function(lib, t, param){
        $.cdn.lib[lib](t,param);
    }
}
