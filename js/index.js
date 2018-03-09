// main js file
$(function(){ 
    // $(".loader").hide();
    $('.category').change(function(){
        // $(".loader").show();
        $("header").addClass("header-small");
        $("footer").addClass("footer-small");
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
        // $(document).ajaxComplete($(".loader").hide());
    });

    function callAjax(url, noArticles) {  
        $.ajax({
            method: "GET",
            url: url,
          }).done(function(data) {
              var articles = data.response.docs;
              var image = "";
              var imageNumber = 0;
              for (var i = 0; i < noArticles; i++) {
                // testing subtype of multimedia to find the best quality picture
                for (var j = 0; j < articles[i].multimedia.length; j++) {
                    if (articles[i].multimedia[j].subtype === "xlarge") {
                        image = articles[i].multimedia[j].subtype;
                        imageNumber = j;
                        break;
                    }
                }
                // appending the article to the list
                if (image) {
                    $(".articles").append("<a href='" + articles[i].web_url + "' class='article' style='background:url(https://www.nytimes.com/" + articles[i].multimedia[imageNumber].url + ") no-repeat center/cover;'><li><p class='article-text'>" + articles[i].snippet + "</p></li></a>");
                }  
              }
          }).fail(function(error) {
            throw error;
          });
    }

    // Selectric
    $(function() {
        $('select').selectric();
      });
});