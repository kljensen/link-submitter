getPollState = function(){
  return PollState.findOne();
};

Template.index.events({
  'submit form': function(event, template){
    event.preventDefault();
    var fieldName = getPollState().fieldName;
    console.log(event.target[fieldName]);
    var value = event.target[fieldName].value;
    console.log(value);
    Meteor.call('addSubmission', value);
    event.target[fieldName].value = "";
    template.wasSubmitted.set(true);
    Template.instance().wasSubmitted.set(true);
    console.log('setting as submitted');
    return false;
  }
});

pollFieldNameIs = function (fieldName) {
  var ps = getPollState();
  if (ps && ps.fieldName === fieldName) {
    return true;
  }
  return false;
};

// Template.index.onCreated(function(){
//   this.data.wasSubmitted = new ReactiveVar(false);
// });

var wasSubmitted = function(){
  var instance = Template.instance();
  if (typeof(instance.wasSubmitted) === 'undefined') {
    instance.wasSubmitted = new ReactiveVar(false);
  }
  console.log('trying to get wasSubmitted');
  return Template.instance().wasSubmitted.get();
};

Template.index.helpers({
  wasSubmitted: wasSubmitted,
  hideSubmitButton: function(){
    var instance = Template.instance();
    console.log('instance.wasSubmitted ==', instance.wasSubmitted);
    if (pollFieldNameIs('mc') && instance.wasSubmitted && instance.wasSubmitted.get() === true) {
      return true;
    }
    return false;
  },
  pollstate: function(){
    return getPollState();
  },
  prompt: function(){
    var ps = getPollState();
    if (ps) {
      return ps.prompt;
    }
    return '...';
  },
  fieldName: function(){
    var ps = getPollState();
    if (ps) {
      return ps.fieldName;
    }
    return null;
  },
  isUrl: function(){
    return pollFieldNameIs('url');
  },
  isHTML: function(){
    return pollFieldNameIs('html');
  },
  isMulitipleChoice: function(){
    return pollFieldNameIs('mc');
  },
  choices: function(){
    return getPollState().choices;
  },
  hasSubmissions: function(){
    return (this.submissions.count() > 0);
  },
  hideSubmissions: function(){
    var ps = getPollState();
    if (ps && _.has(ps, 'hideSubmissions')){
      return ps.hideSubmissions;
    }
    if(pollFieldNameIs('mc') && !wasSubmitted()){
      return true;
    }
    console.log('pollFieldName =', pollFieldNameIs('mc'));
    console.log('wasSubmitted =', wasSubmitted());

    return false;
  }
});
