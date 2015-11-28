Livelocation = new Meteor.Collection("LiveLocation");

Livelocation.allow({
  "insert": () => true,
  "remove": () => true,
  "update": () => true
});
