// create members controller
app.controller('members-controller', function($scope, $firebaseArray) {

	$scope.id = "members";
	$scope.title = "members";

	// import members as Firebase array 
	var members = firebase.database().ref("members");
	var alumni = firebase.database().ref("alumni");
	$scope.members = $firebaseArray(members);
	$scope.alumni = $firebaseArray(alumni);

	

});