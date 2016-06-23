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
        set : function(data){
            $.each(data,function(key, val){
                var input = $('[name^='+key+']');
                if(input.is('input:checkbox')){
                    input.prop('checked',false);
                    input.val(val);
                }
                else if(input.is('input:radio')){
                    input.prop('checked',false);
                    $('[name='+key+'][value='+val+']').prop('checked',true);
                }
                else
                    input.val(val);
                input.trigger('change');
                if (input.is('select'))
                    input.trigger('chosen:updated');
            })
        }
    }
})