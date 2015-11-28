Template.DistressApp.helpers({
  'distressCallSent'() {
    return Session.get("distressCallSent") === true;
  },
  'accountCreated'() {
    return Session.get('force-login') || Accounts.isPhoneVerified();
  }
});

Tracker.autorun(function (computation) {
  var userGeoLocation = new ReactiveVar(null);
  userGeoLocation.set(Geolocation.latLng());
  if (userGeoLocation.get()) {
    console.log(Geolocation.latLng());
    Session.set("distressCallCoords", Geolocation.latLng());
    //stop the tracker if we got something
    computation.stop();
  }
});
