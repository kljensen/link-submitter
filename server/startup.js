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

resetPollState = function(fieldName, prompt, options){
  if (typeof(fieldName) === 'undefined') {
    fieldName = 'url';
  }
  if (typeof(prompt) === 'undefined') {
    prompt = 'URL';
  }
  Submissions.remove({});
  var pollState = {
    fieldName: fieldName,
    prompt: prompt
  };
  _.defaults(pollState, options || {});
  PollState.update({}, pollState);

};
