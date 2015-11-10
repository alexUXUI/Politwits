function factCheck(){
  $.ajax({
       dataType: "jsonp",
       url: 'https://www.govtrack.us/api/v2/bill?format=jsonp',
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
        //  for(var i=0 in individualStats){
        //    individualStats.push(titles);
        //  }
        //  console.log(titles);
         console.log(individualStats);
           if(twitter != undefined ){
             $('#info').append(
              "<h1>" + title + "<h1>" +
              "<h2>" + first + ' ' + last + "</h2>" +
              "<h3>" + party + "</h3>" +
              "<h4>" + twitter + "</h4>"
             )
           } else {
             $('#info').append(
              "<h1>" + title + "<h1>" +
              "<h2>" + first + ' ' + last + "</h2>" +
              "<h3>" + party + "</h3>"
             )
           }
         }
       }
     });
   }
   factCheck();
