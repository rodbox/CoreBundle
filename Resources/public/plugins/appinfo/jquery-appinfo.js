$(document).ready(function(){
$.appInfo = {
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
                type    : "default",
                msgmeta : "",
                showmsgmeta : true,
                btClose : true
            }

            var param = $.extend(defauts, paramSend);

            this.i++;
            var appinfoID = "appinfo-" + this.i;

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

            return infoMsg;
        },
        del: function (t){
            t.slideUp(250, function() {
                $(this).remove();
            })
        },
        upd: function(t,paramSend) {
            var defauts = {
                open        : true,
                from        : "loader",
                to          : "success",
                msg         : "Opération validé",
                msgmeta     : "<ul><li>Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Sed posuere consectetur est at lobortis.</p></li><li><p>Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas sed diam eget risus varius blandit sit amet non magna.</p></li></ul>",
                showmsgmeta : true,
                timer       : 0
            }

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
});