Template.index.events({
  'submit form': function(event, template){
    event.preventDefault();
    Meteor.call('addSubmission', event.target.url.value);
    event.target.url.value = "";
    return false;
  }
});
