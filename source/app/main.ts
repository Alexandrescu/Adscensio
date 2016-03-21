var adscension = angular.module('adscension', ['ngMaterial', 'ngRoute', 'ngMdIcons']);

adscension.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/targets', {
            templateUrl: '/pages/home.html',
            controller: 'HomeController'
        })
        .when('/', {
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

adscension.controller('TargetsController', ['targets', '$scope',
    function(targets: ITargetService, $scope) {
        $scope.text = targets.getTargets();
        $scope.inProgress = $scope.text[0].status.inProgress();

        // Serious code
        $scope.targets = targets.getTargets();
        $scope.isList = false;
        $scope.isEdit = false;
        $scope.isCheck = false;

        $scope.toggleList = function() {
            $scope.isList = !$scope.isList;
            $scope.isEdit = false;
            $scope.isCheck = false;
        };

        $scope.toggleEdit = function() {
            $scope.isList = false;
            $scope.isEdit = !$scope.isEdit;
            $scope.isCheck = false;
        };

        $scope.toggleCheck = function() {
            $scope.isList = false;
            $scope.isEdit = false;
            $scope.isCheck = !$scope.isCheck;
        };

        $scope.updateTarget = function(target: Target) {
            // TODO: implement this.
            console.log("Updating target", target);
        };
    }
]);

adscension.controller('LogController', function($scope) {
    $scope.text = "Log Controller";
});

adscension.controller('AnalyticsController', function($scope) {
    $scope.text = "Analytics Controller";
});


// Class declarations
class Target {
    name: string;
    status: Status;
    taskList: Array<Task>;
    doneTasks():number {
        var total:number = 0;
        for (var index in this.taskList) {
            var task = this.taskList[index];
            if (task.done) {
                total += parseInt(task.units);
            }
        }
        return total;
    }
    allTasks(): number {
        var total:number = 0;
        for (var index in this.taskList) {
            var task = this.taskList[index];
            total += parseInt(task.units);
        }
        return total;
    }
    addTask(task: Task) {
        this.taskList.push(task);
    }
    progress():number {
        return parseInt(100 * (this.doneTasks() / this.allTasks()));
    }

    constructor(name: string) {
        this.name = name;
        this.status = new Status();
        this.taskList = [];
    }
}
class Status {
    status: number = 0;
    inProgress(): boolean {
        return status == 0;
    }
    isDone(): boolean {
        return status == 1;
    }
}

// Services
adscension.factory('targets', function(): ITargetService {
    class SimpleTargetService implements ITargetService {
        getTargets():Array<Target> {
            var disframe: Target = new Target('Disframe');
            disframe.addTask({
                units: 1,
                title: 'Asana',
                done: false
            });

            disframe.addTask({
                units: 2,
                title: 'Facebook',
                done: true
            });

            return [disframe];
        }

        addTarget(target:Target) {
        }

    }

    return new SimpleTargetService();
});