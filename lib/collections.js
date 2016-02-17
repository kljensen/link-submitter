Submissions = new Mongo.Collection('submissions');
PollState = new Mongo.Collection('pollstate');



Meteor.methods({
  addSubmission: function (text) {
    check(text, String);
    var ps = PollState.findOne();
    if (ps.fieldName === 'url') {
      if (text.length > 300) {
        return;
      }      
    }
    var insert = {submittedAt: new Date()};
    insert[ps.fieldName] = text;
    var id = Submissions.insert(insert);
  }
});
