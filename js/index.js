// main js file
$(function(){ 
    var articlesLoad = 12; // number of articles wanted with an image
    $('.category').change(function(){
        articlesLoad = 12;
        $(".articles").addClass("loader");
        $("header").addClass("header-small");
        $("footer").addClass("footer-small");
        $(".articles").empty();
        var value = $(".category").val();
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            url += '?' + $.param({
            'api-key': "1f73ed52c30d4864bb4d5b310aec39fc"
            });
            url +=  "&fq=news_desk:('" + value + "')";
            // url +=  "&fq=news_desk:('Sports' 'Foreign')";
            // url += "&fq=page:(0%201)";
            
        callAjax(url);
        // url += "&page=1";
        // callAjax(url);
    });

    function callAjax(url) {  
        $.ajax({
            method: "GET",
            url: url,
            // async: false,
          }).done(function(data) {
            //   console.log(data);
              var articles = data.response.docs;
              var image = "";
              var imageNumber = 0;
              for (var i = 0; i < 10; i++) {
                // testing subtype of multimedia to find the best quality picture (if there is any)
                for (var j = 0; j < articles[i].multimedia.length; j++) {
                    if (articles[i].multimedia[j].subtype === "xlarge") {
                        image = articles[i].multimedia[j].subtype;
                        imageNumber = j;
                        articlesLoad--;
                        break;
                    }
                }
                // appending the article to the list if there is an image and no. of images left to load is >= 0
                if (image&&(articlesLoad>=0)) {
                    $(".articles").append("<a href='" + articles[i].web_url + "' class='article' style='background:url(https://www.nytimes.com/" + articles[i].multimedia[imageNumber].url + ") no-repeat center/cover;'><li><p class='article-text'>" + articles[i].snippet + "</p></li></a>");
                }  
              }
          }).fail(function(error) {
            throw error;
          });
    }
});