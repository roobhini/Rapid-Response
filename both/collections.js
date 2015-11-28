DistressSignals = new Meteor.Collection('DistressSignals');

DistressSignals.allow({
  'insert': () => true,
  'update': () => true
});
