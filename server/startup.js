Meteor.startup(
  function(){
    if (PollState.find({}).count() === 0) {
      PollState.insert({
        fieldName: 'url',
        prompt: 'URL'
      });
    }
  }
);

resetPollState = function(fieldName, prompt){
  if (typeof(fieldName) === 'undefined') {
    fieldName = 'url';
  }
  if (typeof(prompt) === 'undefined') {
    prompt = 'URL';
  }
  Submissions.remove({});
  PollState.update({}, {
    fieldName: fieldName,
    prompt: prompt
  });

};
