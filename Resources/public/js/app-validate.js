// valide un formulaire par etape generer par le mod-form.
    $.validate = {
        req         : function (value){
            return (value);
        },
        mail        : function (email){
            var regexp = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i;
            return regexp.test(email);
        },
        int         : function (value){
            var regexp = /^[0-9]+$/;
            regexp.test(value);
        },
        reg         : function (value,regexp){
            regexp.test(value);
        },
        alpha_num   : function (value){
            var regexp = /^[0-9a-zA-Z]+$/;
            regexp.test(value);
        },
        min         : function (value,min){
            return (value.length>=min);
        },
        max         : function (value,max){
            return (value.length<=max);
        },
        equal       : function (value,equal){
            return (value==equal);
        },
        url         : function (url){
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test(url);
        },
        ip          : function (ip){
            var regexp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
            return regexp.test(ip);
        },
        date        : function (value,meta){
            return true;
        },
        tel         : function (tel,meta){
            var regexp = /^0[0-9]([-. ]?\d{2}){4}[-. ]?$/;
            return regexp.test(tel);
        }
    }

    $.form = {
        validate : function(t){
            console.log('todo : validate');
        }
    }