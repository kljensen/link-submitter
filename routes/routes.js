Router.configure({
  layoutTemplate: 'layout',
  data: function(){
    return {
      submissions: Submissions.find()
    }
  }
})


Router.map(function() {
  var path = '';
  try{
    pathPrefix = Meteor.settings.public.pathPrefix;
  }catch (e){
    pathPrefix = '';
  }

 this.route(pathPrefix, {
    path: pathPrefix,
    template: 'index',
    name: 'index',
    fastRender: true
  });

  this.route(pathPrefix + '/submissions', {
    path: pathPrefix,
    template: 'submissions',
    data: function(){
      return {
        submissions: Submissions.find()
      }
    },
  });


  this.route('notFound', {
    path: '*',
    where: 'server',
    action: function() {
      this.response.statusCode = 404;
      this.response.end(Handlebars.templates['404']());
    }
  });

});
