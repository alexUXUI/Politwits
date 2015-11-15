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
         var sort = data.objects[i].sortname;
         var bioGuide = data.objects[i].bioguideid;
         var birthday = data.objects[i].birthday;
         var twitter = data.objects[i].twitterid;
         var youtube = data.objects[i].youtubeid;
         var link = data.objects[i].link;
         //create a person array
         // create a person object!
         individualStats.push(sort, bioGuide, birthday, twitter, youtube);
          // console.log(individualStats);
          //  var j ;
          //  for(var j=0; j<individualStats.length;j=j+1){
          //    console.log('whats good');
          //  }
           if(twitter != undefined ){
             $('.results').append(
              "<div class='flexer'><h3>" + sort + "<h3>" +
              "<h4>" +  bioGuide + "</h4>" +
              "<h5>" + birthday + "</h5>" +
              "<h6>" + twitter + "<br>" + youtube + "<br>" + link + "</h6></div>"
             )
           } else {
             $('.results').append(
               "<div class='flexer'><h3>" + sort + "<h3>" +
               "<h4>" +  bioGuide + "</h4>" +
               "<h5>" + birthday + "</h5>" +
               "<h6>" + twitter + "<br>" + youtube + "<br>" + link +"</h6></div>"
             )
           }
         }

       }
     }).done(function(){
       console.log('done 1')
       // could pass getTweets() here, too
     });
   }
  //  factCheck();
