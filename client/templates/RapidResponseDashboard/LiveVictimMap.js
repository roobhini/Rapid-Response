Tracker.autorun(function (computation) {
  var userGeoLocation = new ReactiveVar(null);
  userGeoLocation.set(Geolocation.latLng());
  if (userGeoLocation.get()) {
    Session.set("dashboardUserCoords", Geolocation.latLng());
    //stop the tracker if we got something
    computation.stop();
  }
});

Template.LiveVictimMap.helpers({
  liveVictimMapOptions: function() {
    var duc = Session.get('dashboardUserCoords');

    if (GoogleMaps.loaded()) {
      // automatically initialize map centered at logged in user's location
      return {
        center: new google.maps.LatLng(duc.lat, duc.lng),
        zoom: 8
      };
    }
  }
});

Template.LiveVictimMap.onCreated(function() {
  GoogleMaps.ready('liveVictimMap', function(map) {
    var info_window = new google.maps.InfoWindow({content: ""});
    var markers = {};

    DistressSignals.find({"helped": false}).observe({
      added: function(document) {
        // Create a marker for this document
        var marker = new google.maps.Marker({
          draggable: false,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(document.latitudes, document.Longitudes),
          map: map.instance,
          clickable:true,
          id: document._id
        });

        google.maps.event.addListener(marker, 'click', function(marker) {
          var db_id = this.id;

          info_window.setContent(Blaze.toHTMLWithData(Template.DistressMapBubble, document));
          info_window.open(this.getMap(), this);

          $(".helpedBtn").click(function () {
            DistressSignals.update(db_id, { $set: {helped: true}});
          });
        });

        // Store this marker instance within the markers object.
        markers[marker.id] = marker;
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
