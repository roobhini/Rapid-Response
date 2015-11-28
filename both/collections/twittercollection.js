Twitterlocation = new Meteor.Collection("TwitterLocation");

Twitterlocation.allow({
  "insert": () => true,
  "remove": () => true,
  "update": () => true
});

