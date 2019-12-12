$(document).ready (function(){
    // newDivElement = $('<div class="col-md-6"> <div class="blog-post"></div></div>')
    // $('.col-lg-8 blog-posts').append(newDivElement);
    let url = 'https://api.themoviedb.org/3/discover/movie?'; // base URL
    DiscoverTopUsMovies(url)
    MoviesInTheater(url)
  });


    $("#searchTextBox").on('keypress',function(e) {
     
    
      if(e.which == 13) {
        e.preventDefault();
        $("#preloder").css("display", "");
        $(".loader").css("display", "");
        console.log($('#searchTextBox').val())
        searchForMovie = $('#searchTextBox').val();
        $('#searchTextBox').val('');
            let url = 'https://api.themoviedb.org/3/search/movie?'; // base URL
      
            let parameter = {
              api_key: apiKey, // stored in js/keys.js
              query: searchForMovie
            };
          
            for (let key in parameter) {
              url += '&' + key + '=' + parameter[key];
            }
           console.log(url)
            $.get(url).done(function(response) {
                
              if (response.stat === 'fail') {
                console.log(response.message); 
              } else if (response.results.length == 0) {
                $("#preloder").css("display", "none");
                $(".loader").css("display", "none");
                if ($("#movies").length == 1){
                  $( "div" ).remove("#movies")
            
                }
                if ($("#searchMovies").length == 1){
                  $("#preloder").css("display", "none");
                  $(".loader").css("display", "none");
                  $( "div" ).remove("#searchMovies")
                }
                $('.col-lg-8').append('<div class="row" id="searchMovies"><div class="col-md-6"><div class="blog-post"><h3>Opps, Sorry No Movies Found with this Name</h3></div></div></div>')
                console.log('No Moives found!'); 
              } 
              else {
                setTimeout(function(){
                  $("#preloder").css("display", "none");
                  $(".loader").css("display", "none");
                  console.log('Request succeeded!');
                  topUsMoviesHtmlCreate(response);
                }, 1000);
              }
            });
      }

  });
  function topUsMoviesHtmlCreate(response) {
    let allData = response.results; // not a jQuery object, so we have to use $.each below
    console.log(allData.length)
    var row2 = '<div class="row" id="searchMovies"></div>'
    var html = "";
    for (var i = 0; i < allData.length; i++) {
      
      function checkNumberOfText(){
        var maxLength = 181
        if (allData[i]['overview'].length> 181){
          var trimmedString = allData[i]['overview'].substr(0, maxLength);
          return  "<p>" + trimmedString + "...</p>"+ "<a href='#' class='read-more'>Read More</a>"
        }else{
          return "<p>" + allData[i]['overview'] + "</p>"

        }
        
      }
      if (allData[i]['backdrop_path']!=null){
        console.log(allData[i]['backdrop_path']);
        html +="<div class='col-md-6'>"+
        "<div class='blog-post'>"+
          "<img src='https://image.tmdb.org/t/p/w500" + allData[i]['backdrop_path'] + "' alt>" +
          "<h3>" + allData[i]['original_title'] + "</h3>"+
          "<div class ='post-date' >" + allData[i]['release_date'] + "</div>" +
          "<div class='post-metas'>"+
          "<div class='post-meta'><font color='yellow'>Popularity</font> "+allData[i]['popularity']+" M</div>"+
          "<div class='post-meta' ><font color='yellow'>Rate</font> "+allData[i]['vote_average']+"</div>"+
          "</div>"+
          "<p>" + checkNumberOfText() + "</p>" +
          
        "</div>"+
        "</div>";

      }
      

      
    }
    if ($("#movies").length == 1){
      $( "div" ).remove("#movies")
      $(".col-lg-8").append(row2);
      $('#searchMovies').append(html)

    }
    if ($("#searchMovies").length == 1){
      $( "div" ).remove("#searchMovies")
      $(".col-lg-8").append(row2);
      $('#searchMovies').append(html)

    }
  }



  

  function DiscoverTopUsMovies (url) {
    this.url = url
    let topUsMoviesSettings= {
      sort_by: 'popularity.desc',
      language: 'en-US',
      api_key: apiKey, // stored in js/keys.js
    };
  
  
    for (let key in topUsMoviesSettings) {
      this.url += '&' + key + '=' + topUsMoviesSettings[key];
    }
  

   console.log(this.url);
    $.get(this.url).done(function(response) {
      if (response.stat === 'fail') {
        console.log(response.message); 
      } else if (response.results.length == 0) {
        console.log('No Moives found!'); 
      } 
      else {
        $(".lds-ripple").css("display", "none");
        console.log('Request succeeded!');
        topUsMoviesHtmlCreate(response);
      }
    });

    function topUsMoviesHtmlCreate(response) {
      let allData = response.results; // not a jQuery object, so we have to use $.each below
      console.log(allData.length)
      var row = '<div class="row" id="movies"></div>'
      var html = "";
      cout = 1
      for (var i = 0; i < allData.length; i++) {
        
        console.log(i)
        function checkNumberOfText(){
          var maxLength = 181
          if (allData[i]['overview'].length> 181){
            var trimmedString = allData[i]['overview'].substr(0, maxLength);
            return  "<p>" + trimmedString + "...</p>"+ "<a href='#' class='read-more'>Read More</a>"
          }else{
            return "<p>" + allData[i]['overview'] + "</p>"

          }
          
        }
        html +="<div class='col-md-6'>"+
        "<div class='blog-post'>"+
          "<img src='https://image.tmdb.org/t/p/w500" + allData[i]['backdrop_path'] + "' alt>" +
          "<h3>"+cout++ +": " + allData[i]['original_title'] + "</h3>"+
          "<div class ='post-date' >" + allData[i]['release_date'] + "</div>" +
          "<div class='post-metas'>"+
          "<div class='post-meta'><font color='yellow'>Popularity</font> "+allData[i]['popularity']+" M</div>"+
          "<div class='post-meta' ><font color='yellow'>Rate</font> "+allData[i]['vote_average']+"</div>"+
          "</div>"+
          "<p>" + checkNumberOfText() + "</p>" +
          
        "</div>"+
        "</div>";
        
        
        
      }
      $(".col-lg-8").append(row);
      $("#movies").append(html);
    }

  }  
  
  function MoviesInTheater(url){

    var d = new Date();
    var month = d.getMonth()+1;
    var previousMonth = d.getMonth();
    var day = d.getDate();
    var TodayDate = d.getFullYear() + '-' +(month<10 ? '0' : '') + month + '-' +(day<10 ? '0' : '') + day;
    var previousMonthDate = d.getFullYear() + '-' +(previousMonth<10 ? '0' : '') + previousMonth + '-' +(day<10 ? '0' : '') + (day);
    this.url = url
    console.log(">>>>>>>>>>"+previousMonthDate)
    let MoviesInTheaterSettings= {
      'language':'en-US',
      'sort_by':'popularity.desc',
      'include_adult':'false',
      'include_video':'false',
      'page':1,
      'primary_release_date.gte': previousMonthDate,
      'release_date.lte':TodayDate,
      // 'primary_release_date.lte': previousMonthDate,
      api_key: apiKey, // stored in js/keys.js
    };
  
  
    for (let key in MoviesInTheaterSettings) {
      this.url += '&' + key + '=' + MoviesInTheaterSettings[key];
    }
    console.log("Thearter API "+this.url)
    $.get(this.url).done(function(response) {
      if (response.stat === 'fail') {
        console.log(response.message); 
      } else if (response.results.length == 0) {
        console.log('No Moives found!'); 
      } 
      else {
        console.log('Request succeeded!');
        MoviesInTheaterHtmlCreate(response);
      }
    });



    function MoviesInTheaterHtmlCreate(response) {
      let allData = response.results; // not a jQuery object, so we have to use $.each below
      console.log(allData);

      for (i = 0 ; i < allData.length; i++){
        console.log(i);
        html2 = "<div class='ln-item'>"+
        "<img src='https://image.tmdb.org/t/p/w500" + allData[i]['poster_path'] + "' alt>" +
        "<div class='ln-text'><div class='ln-date'>Release date: "+allData[i]['release_date']+"</div>"+"<h6>"+allData[i]['original_title']+"</h6>"+
        "<div class='ln-metas'>"+
        "<div class='ln-meta'>"+"language: "+ allData[i]['original_language'] +"</div>"+
        "<div class='ln-meta'>popularity "+allData[i]['popularity']+" M</div>"+
        "</div>"+
        "</div>"+
        "</div>";
        $(".latest-news-widget").append(html2);
      }

      
    }


  }



    function loadingSpaner(){
  
    }
