Template._submissions.helpers({
  isUrl: function(){
    return pollFieldNameIs('url');
  },
  isHTML: function(){
    return pollFieldNameIs('html');
  },
  isMulitipleChoice: function(){
    return pollFieldNameIs('mc');
  },
  multipleChoiceLabels: function(){
    var labels = getPollState().choices;
    return labels;
  },
  multipleChoiceSeries: function(){
    var submissions = Submissions.find().fetch();
    var counts = _.countBy(submissions, 'mc');
    var labels = getPollState().choices;
    var series = _.map(labels, function(v){return counts[v] || 0;});
    return series;
  },
});

Template.multipleChoiceResults.onRendered(function(){
  new Chartist.Bar('.mutliple-choice-results', {
      labels: this.data.labels,
      series: [this.data.series]
      }, {
        scaleMinSpace: 20,
        horizontalBars: true,
        onlyInteger: true,
        high: _.max(this.data.series),
        low: 0,
    });
});
