Template.BigDistressUI.events({
  'click #trigger-button'(ev) {
    ev.preventDefault();
    Meteor.call('addDistressSignal', {
      "coords": Session.get('distressCallCoords')
    });
    Session.set("distressCallSent", true);
  }
})
