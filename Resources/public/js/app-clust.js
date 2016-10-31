// divise une liste de donnée par paquet
$.clust = {
    nbPages : 0,
    data    : {},
    init    : function(arr, nb){
        var nbP     = Math.ceil(arr.length / nb);
        var data    = {};

        console.log(nbP);
        for (var i = 0; i <= nbP; i++)
            data[i] = arr.splice(i*nb, i*nb+nb);

        $.clust.nbPages     = nbP;
        $.clust.data        = data;

        return $.clust.data[0];
    },
    get     : function(page){
        return $.clust.data[page];
    },
    gets    : function(){
        return $.clust.data;
    }
}
