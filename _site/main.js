function getTweets(){
// https://github.com/jublonet/codebird-js
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
      "screen_name=drake",
      function (data, rate, err) {
          console.log(data);
          // var $result = $('#results');
          for(i = 0; i < data.length; i = i + 1){
            var tweet = data[i];
            var writing = data[i].text;
            $('.tweetz').append(
              "<li class='tweet'>"+ writing +"</li>"
            )
            console.log(writing)
          }
      },
      true // this parameter required
  );
}
// getTweets();

function factCheck(){
  var theURL = 'https://www.govtrack.us/api/v2/vote_voter';
  $.ajax({
       dataType: "jsonp",
       url: theURL,
       cache: true,
       success: function(data){
       console.log('Success!');
      //  console.log(data);
       var individualStats = [];
       var titles = [];
       for(var i=0 in data.objects){
         var title = data.objects[i].title;
         var first = data.objects[i].sponsor.firstname;
         var last = data.objects[i].sponsor.lastname;
         var party = data.objects[i].sponsor_role.party;
         var twitter = data.objects[i].sponsor.twitterid;
         individualStats.push(title, first, last, party, twitter);
         console.log(individualStats);
           if(twitter != undefined ){
             $('#info').append(
              "<div class='flexer'><h3>" + title + "<h3>" +
              "<h4>" + first + ' ' + last + "</h4>" +
              "<h5>" + party + "</h5>" +
              "<h6>" + twitter + "</h6></div>"
             )
           } else {
             $('#politics').append(
              "<div class='flexer'><h4>" + title + "<h4>" +
              "<h5>" + first + ' ' + last + "</h5>" +
              "<h6>" + party + "</h6>"
             )
           }
         }
       }
     });
   }
   factCheck();
