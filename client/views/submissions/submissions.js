
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

Template.multipleChoiceResults.onRendered(function(){
  var submissions = Submissions.find().fetch();
  var counts = _.countBy(submissions, 'mc');
  var labels = getPollState().choices;
  var series = _.map(labels, function(v){return counts[v] || 0;});
  console.log('labels =', labels);
  console.log('series =', series);

  new Chartist.Bar('.mutliple-choice-results', {
      labels: labels,
      series: [series]
      }, {
        height: '250px',
        // seriesBarDistance: 10,
        reverseData: true,
        horizontalBars: true,
        onlyInteger: true,
        divisor: 4,
        high: _.max(series),
        low: 0,
        axisY: {
            // position: 'start',
            showGrid: false,
            labelInterpolationFnc: function(value, index) {
              return index % 5 === 0 ? value : null;
            }
        },
        axisX: {
            showGrid: true,
            position: 'start'
        }
    });
});
