// main js file
$(function(){ 
    var articlesLoad = 12; // number of articles wanted
    $('.category').change(function(){
        articlesLoad = 12;
        $(".articles").addClass("loader");
        $("header").addClass("header-small");
        $("footer").addClass("footer-small");
        $(".articles").empty();
        var section = $(".category").val();
        var apiKey = "1f73ed52c30d4864bb4d5b310aec39fc";
        var url = "http://api.nytimes.com/svc/topstories/v2/" + section +".json?api-key=" + apiKey;
        callAjax(url);
    });

    // Ajax call function
    function callAjax(url) {  
        $.ajax({
            method: "GET",
            url: url,
          }).done(function(data) {
              var articles = data.results;
              var imageNumber = 0;
              for (var i = 0; i < articles.length; i++) {
                // finding the best quality picture (if there is any)
                if(articles[i].multimedia.length==5){
                    var image = articles[i].multimedia[4].url;
                    if (image&&(articlesLoad>0)) {
                        $(".articles").append("<a href='" + articles[i].url + "' class='article' style='background:url(" + image + ") no-repeat center/cover;'><li><p class='article-text'>" + articles[i].abstract + "</p></li></a>");
                        articlesLoad--;
                    }
                    if (articlesLoad==0) {
                        break;
                    }   
                }       
              }
          }).fail(function(error) {
            throw error;
          });
    }
});