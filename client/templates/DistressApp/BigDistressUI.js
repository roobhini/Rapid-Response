Template.BigDistressUI.events({
  'click #trigger-button'(ev) {
    ev.preventDefault();
    Meteor.call('addDistressSignal', {
      "coords": Session.get('distressCallCoords'),
      "helped": false
    });
    Session.set("distressCallSent", true);
  }
})
