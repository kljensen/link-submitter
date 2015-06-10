Template.index.events({
  'submit form': function(event, template){
    event.preventDefault();
    var fieldName = PollState.findOne().fieldName;
    var value = event.target[fieldName].value;
    console.log(value);
    Meteor.call('addSubmission', value);
    event.target[fieldName].value = "";
    return false;
  }
});

Template.index.helpers({
  pollstate: function(){
    return PollState.findOne();
  },
  prompt: function(){
    var ps = PollState.findOne();
    if (ps) {
      return ps.prompt;
    };
    return '...';
  },
  fieldName: function(){
    var ps = PollState.findOne();
    if (ps) {
      return ps.fieldName;
    };
    return null;
  },
  isUrl: function(){
    var ps = PollState.findOne();
    if (ps && ps.fieldName === 'url') {
      return true;
    };
    return false;
  }
})