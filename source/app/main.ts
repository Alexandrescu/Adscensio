var adscension = angular.module('adscension', ['ngMaterial', 'ngRoute']);

adscension.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: '/pages/home.html',
            controller: 'HomeController'
        })
        .when('/targets', {
            templateUrl: '/pages/targets.html',
            controller: 'TargetsController'
        })
        .when('/log', {
            templateUrl: '/pages/log.html',
            controller: 'LogController'
        })
        .when('/analytics', {
            templateUrl: '/pages/analytics.html',
            controller: 'AnalyticsController'
        });

    $locationProvider.html5Mode(true);
});




//Controllers
adscension.controller('HomeController', function($scope) {
    $scope.text = "Hello World!!!!";
});

adscension.controller('TargetsController', function($scope) {
    $scope.text = "Targets Controller";
});

adscension.controller('LogController', function($scope) {
    $scope.text = "Log Controller";
});

adscension.controller('AnalyticsController', function($scope) {
    $scope.text = "Analytics Controller";
});
