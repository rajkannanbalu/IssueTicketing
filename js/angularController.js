'use strict';

var myApp = angular.module('IssueTrackingApp', ['ngRoute']);

myApp.config(['$routeProvider',function($routeProvider) {
      $routeProvider.when('/main', {
        templateUrl: 'view/main.html',
        controller: 'listController'
      })
      .when('/edit/:id', {
        templateUrl: 'view/edit.html',
        controller: 'EditController'
      })
      .when('/create', {
        templateUrl: 'view/create.html',
        controller: 'CreateController'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);

/* Controllers */

function CreateController($scope, $http, $templateCache) {

  console.log("Controller begins");
  
  var method = 'POST';
  var inserturl = 'http://localhost:8080/insertuser';
  $scope.codeStatus = "";
  $scope.registerTicket = function() {
    console.log("register ticket called");
    var formData = {
      'title' : this.title,
      'severity' : this.severity,
	    'assignee' : this.assignee,
      'description' : this.description,
      'state' : "Open"
    };
	this.title = '';
	this.severity = '';
	this.assignee = '';
  this.description='';
	this.state='';
	
	var jdata = 'mydata='+JSON.stringify(formData);

  console.log(jdata);
	
  $http({
      method: method,
      url: inserturl,
      data:  jdata ,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      cache: $templateCache
    }).
    success(function(response) {
		console.log("success");
        $scope.codeStatus = response.data;
		console.log($scope.codeStatus);
    
    }).
    error(function(response) {
		console.log("error");
        $scope.codeStatus = response || "Request failed";
		console.log($scope.codeStatus);
    });

    return false;
  };	

  
  /*
  $scope.list = function() {
	  var url = 'http://localhost:8080/getusers';	
	  $http.get(url).success(function(data) {
		var jsonVar = data;
		console.log(jsonVar.length);
		
		$scope.users = data;
		console.log($scope.users);
		//console.log($scope.users.length);
		//var users = $scope.users;
		//console.log(users.length);
		//console.log($scope.users[0].name);
	  });
  };
  
  $scope.list();

  */
  

  
}

function listController($scope, $http, $templateCache) {

  console.log("list controller begins");

  var url = 'http://localhost:8080/getusers'; 
  $http.get(url).success(function(data) {
  var jsonVar = data;
  console.log("Length: " + jsonVar.length);
    
  $scope.IssueTickets = data;


    });

}


function EditController($scope, $http, IssueTickets,$location,$routeParams) {

  console.log("edit begins");

  $scope.IssueTickets = $firebase(dbURL).$asObject();
  $scope.edit = function() {
    $scope.IssueTickets.$save();
    if($scope.state=="Closed") {
        console.log("closed");
        $scope.remove = function(id) {
        IssueTickets.$remove(id);
      };
    }
    $location.path('/main');
  };


  
}