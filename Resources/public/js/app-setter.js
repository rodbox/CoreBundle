$(document).ready(function($) {

    /**
     * Set les données data dans les champs de formulaires correspondant au clé
     * Exemple set data form
     * var ds = {
     *     action : '456',
     *     name1: ['toto1','toto2'],
     *     name2: ['123','456',''],
     *     name3: 'toto1'
     * }
     * $.form.set(ds);
    */

    $.form = {
        clear: function (form){
            form.find('input:not([type=checkbox],[type=radio]), select, textarea ').val('');
            form.find('[type=checkbox],[type=radio]').prop('checked',false);
        },
        filter : function (filterContent, form){
            form.attr('data-form-filter-content',filterContent);
            
            form.find('.form-filter-content').hide();
            form.find('[data-form-filter-content="'+filterContent+'"]').show();
        },
        set : function(data, suffix){

            $.each(data, function(key, val){
                if (suffix == undefined)
                    var input = $('[name^="'+key+'"]');
                else
                    var input = $('[name^="'+suffix+'['+key+']"]');

                if(input.is('input:checkbox')){
                    input.prop('checked',false);
                    input.prop('checked',(input.val() == val));
    
                }
                else if(input.is('input:radio')){
                    input.prop('checked',false);
                    input.prop('checked',(input.val() == val));
                    $('[name='+key+'][value='+val+']').prop('checked',true);
                }
                else
                    input.val(val);
                input.trigger('change');
                if (input.is('select')){
                    input.trigger('chosen:updated');

                }
            })
        }
    }

    $(document).on("click",".btn-setter",function (e){
        e.preventDefault();
        var t = $(this);

        var data  = t.data('setter');

        $.form.set(data);
    })
})