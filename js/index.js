//
// MAIN JS FILE
//

import $ from "jquery";
import selectric from "selectric";
import '../sass/style.scss';

$(() => { 
    const initialArticlesLoad = 12; // number of articles wanted
    let articlesLoad = null;
    //
    // select field change
    // 
    $('.category').change(() => getArticles());

    //
    // loading articles: function for getting parameters before calling Ajax 
    //
    const getArticles = () => {
        articlesLoad = initialArticlesLoad;
        $(".articles").addClass("loader");
        $("header").addClass("header-small");
        $("footer").addClass("footer-small");
        $(".search-bar").css("display", "flex");
        $(".articles").empty();
        let section = $(".category").val();
        let search = $(".search").val();
        let apiKey = "1f73ed52c30d4864bb4d5b310aec39fc";
        let url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`;
        callAjax(url, search);
    }

    //
    // Ajax call function
    //
    const callAjax = (url, search) => {  
        $.ajax({
            method: "GET",
            url: url,
          }).done((data) => {
              let articles = data.results;
              for (let article of articles) {
                // finding the best quality picture (if there is any)
                if(article.multimedia.length === 5){
                    let image = article.multimedia[4].url;
                    if (image&&(articlesLoad > 0)) {
                        let containsAbstract = isSubstring(article.abstract, search);
                        let containsTitle = isSubstring(article.title, search);
                        // filter articles
                        if (!search || containsAbstract || containsTitle) {
                            $(".articles").append(`<li class='article'><a href='${article.url}' style='background:url(${image}) no-repeat center/cover;'><p class='article-text'>${article.abstract}</p></a></li>`);
                            articlesLoad--;
                        }  
                    }
                    if (articlesLoad === 0) {
                        break;
                    }   
                }       
              }
              // if no articles with search filter
              if (articlesLoad === 12) {
                $(".articles").html("<p class='no-article'>Sorry, no article found.</p>");
              }
              $(".articles").removeClass("loader");
          }).fail((error) => {
            throw error;
          });
    }

    //
    // Selectric initialization
    //
    $('.category').selectric();

    //
    // touchscreen detection
    // @source https://codeburst.io/the-only-way-to-detect-touch-with-javascript-7791a3346685/ 03/12/2018
    //
    window.addEventListener('touchstart', () => $(".article-text").css("opacity", "1"));

    //
    // search input function
    // @source https://stackoverflow.com/questions/8747439/detecting-value-change-of-inputtype-text-in-jquery 03/15/2018
    //
    let searchLength = $(".search").val().length;

    $(".search").on("keyup", (event) => {
        let key = event.keyCode;
        let newSearchLength = $(".search").val().length;
        // alphanumeric input or backspace/delete which deletes a character
        if ((key <= 90 &&  key >= 48) || (key === 8 && searchLength !== newSearchLength) || (key === 46 && searchLength !== newSearchLength)) {
            getArticles();
        }
        searchLength = newSearchLength;
    });

    $(".search").on("change paste", () => getArticles());

    $(".search").keypress((event) => {
        if(event.keyCode === 13) {
            event.preventDefault();
        }
    });

    //
    // function for finding a substring (search input)
    // @source https://stackoverflow.com/questions/2854527/find-substring-with-jquery 03/15/2018
    //
    const isSubstring = (haystack, needle) => haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
});