var app = angular.module('app', [
	'ui.bootstrap',
	'ui.bootstrap.progressbar',
	'ui.bootstrap.modal']);

var OptionsCtrl = function ($scope, $modal, $log) {
	$scope.drink;
	$scope.stand;
	$scope.eyes;
	$scope.anything;
};

var DrinkCtrl = function ($scope,$timeout) {

	$scope.ounces = 0;
	$scope.max = 40;

	$scope.add = function() {
		$scope.ounces++;
	}

	var min = 60 * 1000;
	var hour = 60 * min;
	var percentTime = hour/100;

	$scope.alerts = [
		{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
		{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
	];
}

var StandUpCtrl = function ($scope,$timeout) {

	var min = 60 * 1000;
	var hour = 60 * min;
	var percentTime = hour/100;

	$scope.lastStood = 0;
	$scope.timeLeft = 0;

	$scope.StandReset = function() {
		$scope.lastStood = 100;
	}

    $scope.onTimeout = function(){
        mytimeout = $timeout($scope.onTimeout,percentTime);
        $scope.lastStood--;
    }

    var mytimeout = $timeout($scope.onTimeout,1000);

    $scope.alerts = [
		{ type: 'danger', msg: 'Get up, stand up' },
		{ type: 'success', msg: 'Well done! Your legs will thank you.' }
	];
}

var RestEyesCtrl = function ($scope,$timeout) {
	$scope.restedEyes = 0;

	$scope.EyesReset = function() {
		$scope.restedEyes = 100;
	}

	var min = 60 * 1000;
	var twenty = 20 * min;
	var percentTime = twenty/100;

    $scope.onTimeout = function(){
        mytimeout = $timeout($scope.onTimeout,percentTime);
        $scope.restedEyes--;
    }

    var mytimeout = $timeout($scope.onTimeout,1000);
}

app.filter('drink', function(){
	return function(input){
		if (input > 30) {
			return 'success';
		} else if (input > 20){
			return 'info';
		} else if (input > 10){
			return 'warning';
		} else {
			return 'danger';
		}
	}
})

app.filter('type', function(){
	return function(input){
		if (input > 75) {
			return 'success';
		} else if (input > 50) {
			return 'info';
		} else if (input > 25) {
			return 'warning';
		} else {
			return 'danger';
		}
	}
});