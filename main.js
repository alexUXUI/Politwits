function getTweets(){
// https://github.com/jublonet/codebird-js
  var twitterSearch = document.getElementById('twitterBox').value;
  var cb = new Codebird;
  cb.setBearerToken("AAAAAAAAAAAAAAAAAAAAAK97igAAAAAAL6M3uxb0OEWglYZcJpxq89e46zY%3Dt682yccM1IgilC04xfWysYugpZ2ZzmaLpIcvNTB9L6xhdjaAXC");
  // I created this CORS proxy using the codebird cors proxy source https://github.com/jublonet/codebird-cors-proxy/
  // If you comment out this line, it will use the default proxy created by the codebird author https://api.jublo.net/codebird/
  cb.setProxy('https://codebird-proxy.herokuapp.com/');
  //https://github.com/jublonet/codebird-js#requests-with-app-only-auth
  //https://github.com/jublonet/codebird-js#mapping-api-methods-to-codebird-function-calls
  // var twitterName = document.getElementsById('twitter-seacrh').val();
  cb.__call(
      "statuses_userTimeline",
      "screen_name="+twitterSearch,
      function (data, rate, err) {
          // console.log(data);
          // var $result = $('#results');
          for(i = 0; i < data.length; i = i + 1){
            var tweet = data[i];
            var writing = data[i].text;
            $('.tweetz').append(
              "<li class='tweet'>"+ writing +"</li>"
            )
            // console.log(writing)
          }
      },
      true // this parameter required
  );
}
// getTweets();
function factCheck(){
  var query = document.getElementById('searchBox').value;
  var theURL = "https://www.govtrack.us/api/v2/person/?q=" + query;
  $.ajax({
       dataType: "json",
       url: theURL,
       cache: true,
       success: function(data){
       console.log(data);
       var individualStats = [];
       var titles = [];

       for(var i=0 in data.objects){
         //get data points individually
         var sort = data.objects[i].sortname;
         var bioGuide = data.objects[i].bioguideid;
         var birthday = data.objects[i].birthday;
         var twitter = data.objects[i].twitterid;
         var youtube = data.objects[i].youtubeid;
         var link = data.objects[i].link;
         //put data points into an object
         var politcian = {};
         politcian.tweeter = data.objects[i].twitterid;
         politcian.bio = data.objects[i].bioguideid;
         politcian.nombre = data.objects[i].sortname;
         politcian.bday = data.objects[i].birthday;
         console.log(politcian);
         //create a person array
         individualStats.push(sort, bioGuide, birthday, twitter, youtube);
          // console.log(individualStats);
          //  var j ;
          //  for(var j=0; j<individualStats.length;j=j+1){
          //    console.log('whats good');
          //  }
           if(twitter != undefined ){
             $('.tweetz').append(
              "<div class='flexer'><h4>" + sort + "</h4>" +
              "<p data-id="+ bioGuide+ " >" +  bioGuide + "</p>" +
              "<p data-id="">" + birthday + "</p>" +
              "<p>" + twitter + "<br>" + youtube + "</p>" +
              "<button data-bioguide=\"" +bioGuide + "\" onclick='voteHistory()'>vote history</button>" + "<br />" +
               "<button onclick='newPage()'>visit profile</button>" + "<br />" +
               "<button onclick='getTweets()'>twitter</button></div>"
             )
           } else {
             $('.tweetz').append(
               "<div class='flexer'><h4>" + sort + "</h4>" +
               "<p>" +  bioGuide + "</p>" +
               "<p>" + birthday + "</p>" +
               "<p>" + twitter + "<br>" +
               youtube + "</p>" +
               "<button onclick='voteHistory()'>vote history</button>" + "<br/>" +
               "<button onclick='newPage()'>visit profile</button>" + "<br />" +
               "<button onclick='getTweets()'>twitter</button></div>"
             )
           }
         }
       }
     }).done(function(){
       console.log('done 1')
       // could pass getTweets() here, too
     }).done(function(){
       console.log('done 2')
     });
   }
  //  factCheck();

  // get voting history
  function voteHistory(){
    var voteURL = 'https://www.govtrack.us/api/v2/vote_voter/?person=400222;'
      $.ajax({
           dataType: "json",
           url: voteURL,
           cache: true,
           success: function(data){
             console.log(data);
             for(var i=0 in data.objects){
               var issue = data.objects[i].vote.question;
               console.log(issue);
             }
           }
    }).done(function(){
      console.log('Donezo!');
    });
  }

  // voteHistory();

  // navabr behavior

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
