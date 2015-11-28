

Template.LiveVictimMap.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
   /*  LiveLocation.insert({latitudes:"11.9410",Longitudes:"79.4930",doneflag:"false"});
        LiveLocation.insert({latitudes:"10.9",Longitudes:"79.8",doneflag:"false"});

       alert (LiveLocation.count());
      for (int i=0;i<LiveLocation.count();i++)
      {

      var Lat = db.LiveLocation.findone(i)[latitudes];
      var Lng = db.LiveLocation.findone(i)[Longitudes;*/  
       var Lat =12.06;
       var Lng = 79.8;



      return {
        
        center: new google.maps.LatLng(Lat, Lng),
        zoom: 8
      };
    
    }
  }
});
  
var content = '<button type=submit name="CompleteButton" >Mark as Completed</button>';



Template.LiveVictimMap.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {

    var info_window = new google.maps.InfoWindow({content: content});

  var markers ={};
  Livelocation.find({"doneflag":"false"}).observe({ 

 added: function(document) {
    // Create a marker for this document
    var marker = new google.maps.Marker({
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(document.latitudes, document.Longitudes),
      map: map.instance,
      clickable:true,
      // We store the document _id on the marker in order 
      // to update the document within the 'dragend' event below.
      id: document._id
    });


    google.maps.event.addListener(marker, 'click', function(marker) {
          alert(this.id);
          db_id = this.id;

         info_window.setContent(content); 
        //info_window.content = this.note;
        info_window.open(this.getMap(), this);
         $("button").click(function () {
           alert(db_id);
       Livelocation.update(db_id, { $set: {doneflag:"true"}});
       
    });


    });

 
    // This listener lets us drag markers on the map and update their corresponding document.
    google.maps.event.addListener(marker, 'dragend', function(event) {
      Livelocation.update(marker.id, { $set: { latitudes: event.latLng.latitudes(), Longitudes: event.latLng.Longitudes() }});
    });

    // Store this marker instance within the markers object.
    markers[document._id] = marker;
  },
  changed: function(newDocument, oldDocument) {
    markers[newDocument._id].setPosition({ latitudes: newDocument.latitudes, Longitudes: newDocument.Longitudes });
  },
  removed: function(oldDocument) {
    // Remove the marker from the map
    markers[oldDocument._id].setMap(null);

    // Clear the event listener
    google.maps.event.clearInstanceListeners(
      markers[oldDocument._id]);

    // Remove the reference to this marker instance
    delete markers[oldDocument._id];
  }
});

  });



});

 /*Template.body.events({
    'click #CompleteButton': function (e) {
      alert("You pressed the button");
    }
  });

Template.LiveVictimMap.events({
  'click #CompleteButton'(ev) {
    ev.preventDefault();

    // if (Geolocation.error()) {
    alert(marker.id);
    
    Livelocation.update(marker.id, { $set: {doneflag:"true"}});


  
    // }

   // Session.set("distressCallSent", true);
  }
})*/


 