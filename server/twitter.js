

if(Meteor.isServer){
	//Meteor.startup(function(){

		 var T = new Twit({
               consumer_key:         'e6wcugIgcqWfzAY5HtHXwlHXK', // API key
               consumer_secret:      '0D71g5xTp3FlaLVORk7ySbarFDVeUXElNvsdpPGFtXIZu4WIaK', // API secret
               access_token:         '2510560105-tnFSdlZsmG21QQUH6xzCjtzDS40D453SWFKKIZw', 
               access_token_secret:  'z4RF2VIQ7lj2142SgNMm3HZ233fL1HbrBcYx1QQbq071j'
        });



     var stream = T.stream('statuses/filter',{track:'#testingrapidresp'})

		stream.on('tweet', function (tweet,err) {
		  if(err){
		  	console.log(err);
		  }else{
		   var id=tweet.id;
		   var text=tweet.text;
		   var name=tweet.user.name;
           console.log(tweet);
           if(tweet.geo!=null){    
		   var coordinates=tweet.geo.coordinates;
		   console.log("coordinates:"+coordinates);
		}
		  console.log('id:'+id+'text:'+text+'name:'+name); 

		       var match=text.match(/[0-9]{10}/);	
                
                if(match!=null){
                	console.log("Number:"+match[0]);
                    var index=match.index+10;
                    var address=text.slice(index);
                     if(address!="")
                      	  console.log("address:"+address);
                }
                else{
                	var address=text.slice(18);
                	if(address!=""){
                		console.log("address:"+address);
                		var url='https://maps.googleapis.com/maps/api/geocode/json';

                		Meteor.http.get(url,{q:address,API:'AIzaSyBFyokSNGlp1mIacwBJsD4ae4660niAzRI'},
                			function(err,data,response){
                				//console.log(err);
                				console.log(data);
                				//console.log(response);
                			}

                			);
                		
                		
		              }
                }
                      
		  }
		})

	//	});
}