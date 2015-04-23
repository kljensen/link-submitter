Submissions = new Mongo.Collection('submissions');



Meteor.methods({
  addSubmission: function (url) {
    check(url, String);
    if (url.length > 300) {
      return;
    };
    var id = Submissions.insert({url: url, submittedAt: new Date()});
  }
});
