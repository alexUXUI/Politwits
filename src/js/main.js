var store;
var retrievedObject;
var politician;
function factCheck(){
  $(".hero").fadeOut(300);
  var query = document.getElementById('searchBox').value;
  var theURL = "https://www.govtrack.us/api/v2/person/?q=" + query;
  $.ajax({
       dataType: "json",
       url: theURL,
       cache: true,
       success: function(data){
       console.log(data);
       var politicians = [];
       data.objects.forEach(function(politcian, i){
         //get data points individually
         var sort = data.objects[i].sortname;
         var bioGuide = data.objects[i].bioguideid;
         var birthday = data.objects[i].birthday;
         var twitter = data.objects[i].twitterid;
         var youtube = data.objects[i].youtubeid;
         var link = data.objects[i].link;
         var votes = data.objects[i].id;
         //put data points into an object
         var politician = {};
         politician.tweeter = data.objects[i].twitterid;
         politician.bio = data.objects[i].bioguideid;
         politician.nombre = data.objects[i].sortname;
         politician.bday = data.objects[i].birthday;
         politician.votes = data.objects[i].id;
         politicians.push(politician);
         // if theres an image
         var $poly = $( "<div class='politicianWrapper'>" +
                     "<img src='null_politician.png' class='nullPol'/>" +
                     "<div class='figure'>" +
                       "<h2 class='sort'>" + sort + "</h2>" +
                       "<a href='/politician.html#" + bioGuide + "'> visit profile!</a>" +
                     "</div>" +
                   "</div>");
         var imageString = "https://theunitedstates.io/images/congress/450x550/" + bioGuide + ".jpg";
         var newImage = new Image();
         newImage.addEventListener('load', function (e) {
           $poly.find(".nullPol").remove()
           $poly.prepend(newImage);
          //  console.log('loaded!');
         })
         newImage.addEventListener('error', function (e) {
           console.log('didn\'t load successfully!');
         })
         newImage.src = imageString;
         $('.tweetz').append(
           $poly
         )
         // Append the info recieved from request
              // cache politician objects in local storage
              var store = localStorage.setItem(bioGuide, JSON.stringify(politician));
              var retrievedObject = localStorage.getItem('politician');
              console.log('retrievedObject: ', JSON.parse(retrievedObject));
         })
       }
     }).done(function(){
       var bios;
       var bios = document.getElementsByClassName('bioguideID');
       bios =[].slice.call(bios);
       bios.forEach(function(bio){
         bio.addEventListener('mouseover', function(){
            console.log(bio);
          })
       })
     });
   }
  //  factCheck();
  $(window).scroll(
    {
        previousTop: 0
    },
    function () {
    var currentTop = $(window).scrollTop();
    if (currentTop < this.previousTop) {
        $(".header").fadeIn(300);
    } else {
        $(".header").fadeOut(300);
    }
    this.previousTop = currentTop;
});
// clear form funciton
$(document).ready(function(){
  $("#searchBox").on('focus', function (e) {
      console.log('fired');
      $(".tweetz").empty();
  });
})
function getTweets(){
  var twitterSearch = populateInfo.tweeter;
  var cb = new Codebird;
  cb.setBearerToken("AAAAAAAAAAAAAAAAAAAAAK97igAAAAAAL6M3uxb0OEWglYZcJpxq89e46zY%3Dt682yccM1IgilC04xfWysYugpZ2ZzmaLpIcvNTB9L6xhdjaAXC");
  cb.setProxy('https://codebird-proxy.herokuapp.com/');
  cb.__call(
      "statuses_userTimeline",
      "screen_name="+twitterSearch,
      function (data, rate, err) {
          console.log(data);
          // var $result = $('#results');
          var firstTweet;
          var tweetsForDays = [];

          for(i = 0; i < data.length; i = i + 1){
            // iterate over data
            var tweet = data[i];
            var writing = data[i].text;
            var firstTweet = data[0].text;
            var favorite = data[i].favorite_count;
            var retweet = data[i].retweet_count;
            var description = data[i].user.description;
            var hashtag = data[i].entities.hashtags[0];
            var tweetImg = data[i].entities.media;
            var tweetId = data[i].id;
            // create obj
            var twitObj = {};
            // push properties to object
            twitObj.writing = data[i].text;
            twitObj.favorite = data[i].favorite_count;
            twitObj.retweet = data[i].retweet_count;
            twitObj.description = data[i].user.description;
            twitObj.hashtag = data[i].entities.hashtags[0];
            twitObj.tweetImg = data[i].entities.media;
            twitObj.id = data[i].id;
            // push onject to array
            tweetsForDays.push(twitObj);
            // store the results
            var storeTwitObj = localStorage.setItem(tweetId, JSON.stringify(twitObj));
            var getTwitObj = localStorage.getItem('twitObj');
            // console.log('got tweet: ', JSON.parse(getTwitObj));
            if(typeof tweet.entities.media != 'undefined') {
              tweet.entities.media.forEach(function(index, media){

                var tweetImg = data[i].entities.media[0].media_url_https;
                tweetImg.toString();
                console.log(tweetImg);
                var eachTweet = localStorage.getItem(tweetId);
                var populateTweets = JSON.parse(eachTweet);
                var tweetInfo = populateTweets.description;
                $('.twitDesc').html(tweetInfo);

                var index = 0;
                for(index = 0; index < 1; index = index + 1){
                  $('.tweetMedia').prepend('<img id="twert" src=' + tweetImg + '/>')
                }

              })

            } else {
              console.log('else');
            }
            $('.tweetz').append(
              "<li class='tweet'>"+ writing + favorite + " # " + hashtag + tweetImg + "</li>"
            )
          }


          // console.log(firstTweet);
          // for (var i = 0; i < tweet.entities.media.length; i = i + 1){
          //   var images = tweet.entities.media[i];
          //   console.log('in the image loop!');
          // }
      },
      true // this parameter required
  );
}
// getTweets();
// var searchBtn = document.querySelector("#politician-btn");
// searchBtn.addEventListener('click', function(){
//   $(".hero").fadeOut(300);
// })
