Template.BigDistressUI.events({
  'click #trigger-button'(ev, tmpl) {
    ev.preventDefault();

    if (Geolocation.error()) {
      alert(`There's a problem with your Geolocation! Error we got: ${Geolocation.error()}`);
    }

    Session.set("distressCallSent", true);
  }
})
