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
