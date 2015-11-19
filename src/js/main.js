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
         // if theres an images

         var $tweet = $( "<div class='politicianWrapper'>" +
                     "<img src='null_politician.png' class='nullPol'/>" +
                     "<div class='figure'>" +
                       "<h2 class='sort'>" + sort + "</h2>" +
                       "<a href='/politician.html#" + bioGuide + "'> visit profile!</a>" +
                     "</div>" +
                   "</div>");

         var imageString = "https://theunitedstates.io/images/congress/450x550/" + bioGuide + ".jpg";
         var newImage = new Image();
         newImage.addEventListener('load', function (e) {
           $tweet.find(".nullPol").remove()
           $tweet.prepend(newImage);
          //  console.log('loaded!');
         })
         newImage.addEventListener('error', function (e) {
           console.log('didn\'t load successfully!');
         })
         newImage.src = imageString;
         $('.tweetz').append(
           $tweet
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
          for(i = 0; i < data.length; i = i + 1){
            var tweet = data[i];
            var writing = data[i].text;
            var firstTweet = data[0].text;
            var favorite = data[i].favorite_count;
            var retweet = data[i].retweet_count;
            var description = data[i].user.description;
            var hashtag = data[i].entities.hashtags[0];
            var tweetImg = data[i].entities.media;

            if(typeof tweet.entities.media != 'undefined') {
              tweet.entities.media.forEach(function(media){
                  var tweetImg = data[i].entities.media;
                  console.log(tweetImg);
                })
            } else {
              var tweetImg = data[i].entities.media;
              console.log('got some shit!', tweetImg);
            }
            $('.tweetz').append(
              "<li class='tweet'>"+ writing + favorite + " # " + hashtag + "</li>"
            )
          }
          console.log(firstTweet);
      },
      true // this parameter required
  );
}
// getTweets();
// var searchBtn = document.querySelector("#politician-btn");
// searchBtn.addEventListener('click', function(){
//   $(".hero").fadeOut(300);
// })
