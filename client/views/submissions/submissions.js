Template._submissions.helpers({
    isUrl: function(){
    var ps = PollState.findOne();
    if (ps && ps.fieldName === 'url') {
      return true;
    };
    return false;
  }
})