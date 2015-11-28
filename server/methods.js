Meteor.methods({
  'addDistressSignal'(distress) {
    var wat = DistressSignals.insert(distress);
    console.log(wat);
    return wat;
  }
});
