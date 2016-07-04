$(document).ready(function() {
    $.cb['core']=        {
            default:function(){},
            setRule: function(t, e) {
                $.rule.load(t.data('rule'));
            },
            setSelect: function() {
                $('.select2').select2({
                    tags: true
                });
            },
            setConvert: function() {
                $('[data-toggle="tooltip"]').tooltip({
                    placement: 'right',
                    animation: false
                });
            },
            delMetaKey: function(t, e) {
                $(t.data('target')).remove();
            },
            setValueOpen: function() {

            },
            upload_init: function(t, e, json) {
                $('.plupload-form').initPlupload();
            },
            upload_file: function(t, json) {
                var opt = $("<option>", {
                    "value": json.file
                }).html(json.file);
                $("#file").append(opt);
                $("#file").val(json.file);
            },
            entity_metas: function(t, e, json) {
                // console.log('meta');
                $(t.attr('data-target')).html(json.app);
            },
            src_parse: function(t, e, json) {
                $.init(t.data('target'));
                $("#import-step–2").trigger('click');
                // $('.select2').select2({tags: true});
            },
            setImportRule: function(t, e, json) {
                var config = json.rule.config;
                var entitys = json.rule.entitys;

                $('#config-entitys').val(entitys).trigger('change');
                var ruleLoad = t.attr('data-rule');

                var ruleName = ruleLoad.split('.');
                $(".file_rule").val(ruleName[0]);

                $('.btn-proto').attr('data-proto-counter', 0);

                setTimeout(function() {
                    // On met a jour le nombre de pointer
                    $.each(config.pointer, function(indexCol, valCol) {
                        $('.btn-proto').trigger('click');
                        var protoId = parseInt($('.btn-proto').attr('data-proto-counter'));
                        $('.btn-proto').attr('data-proto-counter', protoId + 1);
                    });
                    setTimeout(function() {
                        $.each(config.pointer, function(indexCol, valCol) {
                            $.each(valCol, function(indexCell, valCell) {
                                $("#import_rule_config_" + indexCol + "_pointer_" + indexCell).val(valCell);
                            });
                        });
                    }, 700);


                    $.each(config.col, function(indexCol, valCol) {
                        $.each(valCol, function(indexCell, valCell) {
                            $("#import_rule_config_" + indexCol + "_" + indexCell).val(valCell);
                        });
                    });
                }, 250);
            },
            btn_popover_default: function(t) {
                setTimeout(function() {
                    $('#config-entitys').select2();
                    $('.select2-container').css({
                        'z-index': '3500 !important'
                    })
                }, 50);
            },
            getConvertResult: function(t, e, json) {
                $("#import-step–3").trigger('click');
                $('#target-convert-file').html(json.app);
                // alert('convert callback');
                $.init("#target-convert-file");
                console.log(json);
            },
            getValidResult: function(t, e, json) {
                $("#import-step–4").trigger('click');
                $('#target-convert-valid').html(json.app);
            },
            getMagicSetter: function(t, e, json) {
                var dataFinder = json.rfinder;

                $.dataSetter(dataFinder);
            },
            getMagicSetterPlay: function(t, e, json) {
                var dataFinder = json.rfinder;

                if (t.hasClass('active')) {

                    $('tr.current').removeClass('current');
                    var byReq = $("#by_req").val();

                    $.dataSetter(dataFinder);

                    var trChecked = $('tr.checked');
                    var firstNext = trChecked.last().nextAll('tr').first().addClass('current');

                    $.checkLine2(firstNext,true);
                    $.checkLine2(trChecked,false);

                    for (var i = 0; i < byReq; i++) {
                        var trNext = $('.current').nextAll('tr').eq(i);
                        console.log(trNext);
                        $.checkLine2(trNext,true);
                    };
                }
            },
            setEditMe: function (t,e,json){
                $(t.data('target')).find('.input-value').html(json.value);
                t.parents('.edit_me_group').toggleClass('open');
                alert(json.msg);
            },
            setAction: function (t,e,json){
                alert(json.msg);
            },
            setFixStatus: function (t,e,json){
                t.find('input').val('');

                $.counter();
                $.lazy.load($("#fix_wait-pane"));
                //alert('status mis jour : '+json.msg);
            },
            setDataOption: function (t,e,json){
                $(t.data('target')).html(json.app);
                // $(t.data('target')).select2();
            },
            setToggleVal: function (t,e,json){
                if(t.attr('data-val')=="true")
                    t.attr('data-val',false);
                else
                    t.attr('data-val',true);
            },
            getFixPrint: function (t,e,json){
                $.setIframe(json.pdf);

                $.counter();
                $.lazy.load($("#fix_wait-pane"));
                $('.modal').modal('hide');
            },
            getExplorer: function (t,e,json){
                if(!t.hasClass('loaded') || $.evalAlt('onCmd'))
                {
                    var data = {
                        folder  : t.data('folder'),
                        src     : t.data('src')
                    };

                    $.post(t.attr('href'), data, function(json, textStatus, xhr) {
                        t.addClass('loaded');
                        $(t.data('target')).html(json.app);
                        if (json.cb)
                            $.callback[json.cb](t,e,json);
                    },'json');
                }
                else
                  $(t.data('target')).toggle();
            },
            getFolder: function (t,e,json){

                $(t.data('target')).html(json.app);
                $(t.data('target'));
            },
            getEditor: function (t,e,json){
                var data = {
                    folder  : t.data('folder'),
                    src     : t.data('src'),
                    force   : $.evalAlt('onCmd')
                }
                $(".editor-me-active").removeClass('editor-me-active');

                $.post(t.attr('href'), data, function(json, textStatus, xhr) {
                    t.addClass('editor-me-active');
                    // si le context est fullscreen on affiche l'editeur dans la navigation alternative
                    if ($.context.is('f','true'))
                        t.parents('.panel').find('.panel-content-alt').html(json.app);
                    // sinon on l'affiche dans un modal
                    else{
                        var modal = $("#modalLg");
                        modal.find('.modal-body').html(json.app);
                        modal.modal();
                    }
                    $.callback[json.cb](t,e,json);
                },'json');
            },
            getEditorTxt: function (t,e,json){
                console.log('getEditorTxt');
            },
            getEditorPdf: function (t,e,json){
                console.log('getEditorPdf');
            },
            getEditorImg: function (t,e,json){

            },
            getEditorCode: function (t,e,json){
                console.log('getEditorCode');
            },
            getEditorZip: function (t,e,json){
                console.log('getEditorZip');
            },
            getEditorPdf: function (t,e,json){
                console.log('getEditorPdf');
            },
            paneFullscreen: function (t,e){
                $(t.data('target')).toggleClass('panel-me-fullscreen');
                // $('body').toggleClass('panel-me-fullscreen');
                $.context.set('f',$(t.data('target')).hasClass('panel-me-fullscreen'));
            },
            setCMMode: function (t,e){
                var mode  = t.data('mode');
                $(".CMMode").html(mode);
            },
            getCrop: function (t,e,json){
                $.cropperInit();
            },
            setExplorerView: function (t,e,json){
                $(t.data('target')).attr('data-view',t.data('value'));
            },
            toTarget: function (t,e,json){
                $(t.data('target')).html(json.app);
            },
            postNew: function (t,e,json){

            },
            postRemove: function (t,e,json){

            },
            modalApp: function(t, e, json){
                $.modal.html(json.app, 'modalM',json.msg);
            }
    }

    $.dataSetter = function(dataSetter) {
        $.each(dataSetter, function(index, val) {
            var rowId = index;
            $.each(val, function(indexInput, valInput) {
                $('#value_' + rowId + '_' + indexInput).val(valInput);
            });
        });
    }

    $.checkLine2 = function (tr,checkBool){
        if(checkBool)
            tr.addClass('checked').find('.td-check input.rowId').prop('checked',true);
        else
            tr.removeClass('checked').find('.td-check input.rowId').prop('checked',false);
    }

    $.mustache = function (id, data){
        var tpl = $('#'+id).html();

        Mustache.parse(tpl);
        return Mustache.render(tpl, data);
    };
});
