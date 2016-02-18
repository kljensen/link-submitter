Template._submissions.helpers({
  isUrl: function(){
    return pollFieldNameIs('url');
  },
  isHTML: function(){
    return pollFieldNameIs('html');
  },
  isMulitipleChoice: function(){
    return pollFieldNameIs('mc');
  }
});

Template.multipleChoiceResults.helpers({
  data: function(){
    var submissions = Submissions.find().fetch();
    var counts = _.countBy(submissions, 'mc');
    var labels = getPollState().choices;
    var data = [];
    var sum = 0;

    for (var i = 0; i < labels.length; i++) {
      var l = labels[i];
      var d = {
        key: l,
        value: counts[l] || 0
      };
      data.push(d);
      sum += d.value;
    }
    for (i = 0; i < data.length; i++) {
      data[i].value *= Math.round(100/sum);
    }
    return data;
  }
});
