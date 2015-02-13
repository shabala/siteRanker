
var app = angular.module('siteRanker', ['ui.router']);
app.factory('sites', [function(){
  
   var o = {
    sites: [
     /* { id: 'Google', link:'http://www.google.com', image: '/images/google.png', upvotes:'0',
        comments: [
          {author:'Shabala', body: 'The best ever search engine!', upvotes: '0'}
        ]
       },
      { id: 'Bing', link:'http://www.bing.com', image: '/images/bing.png', upvotes:'0',
        comments: [
          {author:'Shabala', body: 'Bing is cool!', upvotes: '0'}
        ]
       },
      { id: 'Yahoo!', link:'http://www.yahoo.com', image: '/images/yahoo.jpg', upvotes:'0',
        comments: [
          {author:'Shabala', body: 'Good ol Yahoo!', upvotes: '0'}
        ]
       },
       { id: 'Reddit', link:'http://www.reddit.com/', image: '/images/reddit.png', upvotes:'0',
        comments: [
          {author:'Shabala', body: 'The front page of Internet', upvotes: '0'}
        ]
       } */
    ]
   
   
   
   };
  return o;
}]);

app.controller('MainCtrl', [
'$scope',
'$http',
'sites',
function($scope, $http ,sites){
   $http.get('/site/find').success(function(data) {
          $scope.sites = data;
          sites.sites = data.slice(); //does this work??
        });
  //$scope.sites = sites.sites;
 //function to add site 
 $scope.addSite = function(){
  if(!$scope.id || $scope.id === '') { return; }
   $http.get('/site/create?id=' + $scope.id + '&link=' + $scope.link );
  $scope.sites.push( {
    id: $scope.id,
    link: $scope.link,
    image: $scope.image,
    upvotes: '0',
    comments: [
    ]})
  
  $http.get('/site/find').success(function(data) {
          $scope.sites = data;
          sites.sites = data.slice(); //does this work??
        });
  
  $scope.id = '';
  $scope.link = '';
  $scope.image = '';
 };
 //function to increment votes
  $scope.incrementUpvotes = function(site) {
    site.upvotes = parseInt(site.upvotes) + 1; 
   $http.get('/site/update/'+ site.id +'?upvotes=' + site.upvotes).success(function(data) {
    console.log('upvotes incremented for ' + site.id);
  }); 
  
  
  }
}]);

app.controller('SiteCtrl', [
'$scope',
'$http',  
'$stateParams',
'sites',
function($scope, $http , $stateParams, sites){
//$scope.site = sites.sites[$stateParams.id];
  
  console.log("sites:" + sites.sites);
  
  
  for(var i=0,len=$scope.sites.length; i<len; i++){
    if($scope.sites[i].id === $stateParams.id){
     $scope.site = $scope.sites[i]; 
      
      console.log("This site is:" + $scope.site); 
    }
    }
  console.log("site:"+$scope.site.id+" "+$scope.site.link);
  
  $http.get('/site/find/' + $scope.site.id).success(function(data) {
       console.log("Thoughts found!");
    console.log("Data Length: "+ data.length);
   
     
  //     for(var k=0,l=data.length;k<l;k++){
   //        if(data[k].reference.id == $scope.site.id){
    //         console.log(data[k].reference.id);
           $scope.site.comments = data.thoughts;  
             
             //console.log of comments data to check for parity here
            // console.log($scope.site.comments.author + " " + $scope.site.comments.body);
      //     }
 //      }         
        }); 
  
  
 //function to add new comment ---works!
   $scope.addComments = function(){
     console.log($scope.site.id);
  if($scope.body === '') { return; }
     
      $http.get('/thought/create?author=' + $scope.author + '&body=' +  $scope.body + '&reference=' + $scope.site.id);
     
  $scope.site.comments.push({
    body: $scope.body,
    author: $scope.author,
    upvotes: '0'
  })
  
 $scope.body = '';
 $scope.author = '';
};
  //function to increment comment votes
  $scope.incrementUpvotes = function(thought) {
  thought.upvotes = parseInt(thought.upvotes) + 1;
  $http.get('/thought/update/'+ thought.id +'?upvotes=' + thought.upvotes).success(function(data) {
  console.log('upvotes incremented for ' + thought.id);
  });  
 
}; 
}]); 


app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });


  
 $stateProvider
  .state('sites', {
  url: '/sites/{id}',
  templateUrl: '/sites.html',
  controller: 'SiteCtrl'
});
  
  
  
  $urlRouterProvider.otherwise('home');
}





]);