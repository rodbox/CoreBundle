$(document).ready(function(){
$.appInfo = {
        counters:{
            loader:0,
            error:0,
            success:0,
            show: function(){
                $('counter-success').html($.appInfo.counters.success);
                $('counter-loader').html($.appInfo.counters.loader);
                console.log('show');
            },
            check:function(p){
                var type = p.type;
                $.appInfo.counters[type]++;
                $('#counter-'+type).html($.appInfo.counters[type]);
                console.log($.appInfo.counters);
            }
        },
        group: {
            mode:false,
            info: {},
            on:function(){
                $.appInfo.group.mode = true;
                $.appInfo.counterss = {
                    loader  : 0,
                    error   : 0,
                    success : 0
                };
                console.log('group on');
                $.appInfo.group.info = $.appInfo.add({
                    open:true,
                    msg:'Chargement'
                });
            },
            off: function(){        
                console.log('group off');
                $.appInfo.group.mode = false;
                setTimeout(function(){
                    $.appInfo.del($($.appInfo.group.info));
                },3000);
            }
        },
        init: function(paramSend) {

            var defauts = {
                i     : 0,
                id    : "appinfo-container",
            }

            var param = $.extend(defauts, paramSend);

            this.i      = param.i;
            this.infoContainerID = param.id;
            this.timer  = parseInt(param.timer);

            var infoContainer = $("<div>", {
                "id": this.infoContainerID,
                "class": "appinfo-container"
            })

            $('body').prepend(infoContainer);
        },
        add: function (paramSend){
            var defauts = {
                timer   : 0,
                open    : false,
                showID  : false,
                type    : "loader",
                msg     : "Chargement",
                msgmeta : "",
                showmsgmeta : true,
                btClose : true
            }
            var param = $.extend(defauts, paramSend);
            this.i++;
            var appinfoID = "appinfo-" + this.i;

            $.appInfo.counters.check(param);
            if ($.appInfo.group.mode) {
                console.log('add');
                $.appInfo.counters.show();
            }
            else {

                /* Definition de la class en fonction du type de message*/
                var appinfoClass = "appinfo-type-"+param.type;

                /* Definition de la class open message*/
                var appinfoOpenClass = (param.open)?"appinfo-open":"";

                /* Construction container du message */
                var infoMsg = $("<div>", {
                    "id": appinfoID,
                    "class": "appinfo-msg " + appinfoClass + " " + appinfoOpenClass
                });

                /* contruction du message */
                var msg = $('<p>',{"href":"#","class":"appinfo-content"}).html(param.msg);
                infoMsg.html(msg);

                /* contruction du meta message */
                if (param.msgmeta != ""){
                    var msgMetaLink = $('<a>',{"href":"#","class":"appinfo-content-meta-toggle"})
                        .html("plus d'infos")
                        .click(function (){
                            var t = $(this).toggleClass("toggle-open").next(".appinfo-content-meta").slideToggle(150);
                            return false;
                        });

                    var msgMeta = $('<div>',{"class":"appinfo-content-meta"}).html(param.msgmeta);
                    infoMsg.addClass('appinfo-content-active');
                    /* Afficher automatiquement msgMeta enc fonction du parmatres showmsgmeta */
                    if (param.showmsgmeta){
                        msgMeta.show();
                        msgMetaLink.addClass("toggle-open");
                    }

                    infoMsg.append(msgMetaLink);
                    infoMsg.append(msgMeta);
                }

                /* Ajout du bouton de suppression de message*/
                if (param.btClose){
                    var infoMsgBtClose = $('<a>',{"href":"#","class":"bt-close","title":"fermer ce message"}).html("X").click(function (){
                        $.appInfo.del(infoMsg);
                        return false;
                    })
                    infoMsg.prepend(infoMsgBtClose);
                }

                /* Ajout de l'id */
                if (param.showID){
                    var infoMsgID = $('<span>',{"class":"appinfo-id"}).html(this.i+".");
                    infoMsg.prepend(infoMsgID);
                }

                /* fonction timer du message */
                if (param.timer != false && param.timer > 0){
                    setTimeout(function (){
                        $.appInfo.del(infoMsg);
                    },param.timer)
                }

                /* Ajout du message dans le container de messages */
                $('#'+this.infoContainerID).append(infoMsg);
            }

            return infoMsg;
        },
        del: function (t){
            t.addClass('appinfo-outro');
            setTimeout(function (){
                t.remove();
            },500);
        },
        upd: function(t,paramSend) {
            var defauts = {
                open        : true,
                from        : "loader",
                to          : "success",
                msg         : "Opération validé",
                msgmeta     : "",
                showmsgmeta : false,
                timer       : 3500
            }

            if ($.appInfo.group.mode) {
                
            }
            else {

                var param = $.extend(defauts, paramSend);
                t.removeClass("appinfo-type-"+param.from);
                t.addClass("appinfo-type-"+param.to);

                /* Mis a jour du message */
                t.find(".appinfo-content").html(param.msg);

                /* Definition de la class open message*/
                var appinfoOpenClass = (param.open)?"appinfo-open":"";
                t.addClass(appinfoOpenClass);
               
                if (param.msgmeta != ""){
                    var msgMetaLink = $('<a>',{"href":"#","class":"appinfo-content-meta-toggle"})
                        .html("plus d'infos")
                        .click(function (){
                            var t = $(this).toggleClass("toggle-open").next(".appinfo-content-meta").slideToggle(150);
                            return false;
                        });
                    var msgMeta = $('<div>',{"class":"appinfo-content-meta"}).html(param.msgmeta);
                    if (param.showmsgmeta){
                        msgMeta.show();
                        msgMetaLink.addClass("toggle-open");
                    }

                    t.append(msgMetaLink);
                    t.append(msgMeta);
                    t.addClass('appinfo-content-active');

                }

                /* fonction timer du message */
                if (param.timer != false && param.timer > 0){
                    setTimeout(function (){
                        $.appInfo.del(t);
     
                    },param.timer)
                }
            }
        }
    }
});