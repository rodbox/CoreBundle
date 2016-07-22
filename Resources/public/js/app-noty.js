$(document).ready(function($) {
    $.noty = {
    init: function(paramSend) {

        var defauts = {
            i     : 0,
            id    : "noty-container",
        }

        var param            = $.extend(defauts, paramSend);

        this.i               = param.i;
        this.infoContainerID = param.id;
        this.timer           = parseInt(param.timer);

        var infoContainer    = $("<div>", {
            "id": this.infoContainerID,
            "class": "noty-container"
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
        var notyID        = "noty-" + this.i;

        /* Definition de la class en fonction du type de message*/
        var notyClass     = "noty-type-"+param.type;

        /* Definition de la class open message*/
        var notyOpenClass = (param.open)?"noty-open":"";

        /* Construction container du message */
        var infoMsg       = $("<div>", {
            "id": notyID,
            "class": "noty-msg " + notyClass + " " + notyOpenClass
        });

        /* contruction du message */
        var msg = $('<p>',{"href":"#","class":"noty-content"}).html(param.msg);
        infoMsg.html(msg);

        /* contruction du meta message */
        if (param.msgmeta != ""){
            var msgMetaLink = $('<a>',{"href":"#","class":"noty-content-meta-toggle"})
                .html("plus d'infos")
                .click(function (){
                    var t = $(this).toggleClass("toggle-open").next(".noty-content-meta").slideToggle(150);
                    return false;
                });

            var msgMeta = $('<div>',{"class":"noty-content-meta"}).html(param.msgmeta);
            infoMsg.addClass('noty-content-active');
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
                $.noty.del(infoMsg);
                return false;
            })
            infoMsg.prepend(infoMsgBtClose);
        }

        /* Ajout de l'id */
        if (param.showID){
            var infoMsgID = $('<span>',{"class":"noty-id"}).html(this.i+".");
            infoMsg.prepend(infoMsgID);
        }

        /* fonction timer du message */
        if (param.timer != false && param.timer > 0){
            setTimeout(function (){
                $.noty.del(infoMsg);
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
    upd: function(t, paramSend) {
        var defauts = {
            open        : true,
            from        : "loader",
            to          : "success",
            msg         : "Opération validé",
            msgmeta     : "<ul><li>test</li></ul>",
            showmsgmeta : true,
            timer       : 0
        }

        var param = $.extend(defauts, paramSend);
        t.removeClass("noty-type-"+param.from);
        t.addClass("noty-type-"+param.to);

        /* Mis a jour du message */
        t.find(".noty-content").html(param.msg);

        /* Definition de la class open message*/
        var notyOpenClass = (param.open)?"noty-open":"";
        t.addClass(notyOpenClass);
       
        if (param.msgmeta != ""){
            var msgMetaLink = $('<a>',{"href":"#","class":"noty-content-meta-toggle"})
                .html("plus d'infos")
                .click(function (){
                    var t = $(this).toggleClass("toggle-open").next(".noty-content-meta").slideToggle(150);
                    return false;
                });
            var msgMeta = $('<div>',{"class":"noty-content-meta"}).html(param.msgmeta);
            if (param.showmsgmeta){
                msgMeta.show();
                msgMetaLink.addClass("toggle-open");
            }

            t.append(msgMetaLink);
            t.append(msgMeta);
            t.addClass('noty-content-active');
        }

        /* fonction timer du message */
        if (param.timer != false && param.timer > 0){
            setTimeout(function (){
                $.noty.del(t);
            },param.timer)
        }
    },
    response: function(t, response){
        /**
        * TODO : Response auto params
        **/
    }
}
    $.noty.init();
});
