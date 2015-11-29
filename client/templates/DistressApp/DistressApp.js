Template.DistressApp.helpers({
  'distressCallMainView'() {
    return Session.get("distressCallView") === true;
  },
});

Template.DistressApp.helpers({
  'customLocationOptionSelected'() {
    return Session.get("customLocationOptionSelected") === true;
  },
});

Template.DistressApp.helpers({
  'distressCallSent'() {
    return Session.get("distressCallSent") === true;
  },
  'forceLoginActive'() {
    return Session.get('forceLogin') === true;
  }
});

Tracker.autorun(function (computation) {
  var userGeoLocation = new ReactiveVar(null);
  userGeoLocation.set(Geolocation.latLng());
  if (userGeoLocation.get()) {
    Session.set("distressCallCoords", Geolocation.latLng());
    //stop the tracker if we got something
    computation.stop();
  }
});

Template.DistressApp.onRendered(() => {
  console.log("hello there!");
});


Meteor.startup(() => {
  GoogleMaps.load();
})
