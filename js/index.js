// main js file
$(function(){ 
    $('.category').change(function(){
        $(".articles").empty();
        var value = $(".category").val();
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            url += '?' + $.param({
            'api-key': "1f73ed52c30d4864bb4d5b310aec39fc"
            });
            url +=  "&fq=news_desk:('" + value + "')";
        callAjax(url, 10);
        // url += "&page=1";
        // $(document).ajaxComplete(callAjax(url, 2));
    });

    function callAjax(url, noArticles) {  
        $.ajax({
            method: "GET",
            url: url,
          }).done(function(data) {
              var articles = data.response.docs;
              for (var i = 0; i < noArticles; i++) {
                $(".articles").append("<a href='" + articles[i].web_url + "' class='article' style='background:url(https://www.nytimes.com/" + articles[i].multimedia[0].url + ") no-repeat center/cover;'><li><p>" + articles[i].snippet + "</p></li></a>");
              }
          }).fail(function(error) {
            throw error;
          });
    }
});