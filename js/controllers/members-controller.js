// create members controller
app.controller('members-controller', function($scope, $firebaseArray) {

	$scope.title = "members";

	// import members as Firebase array 
	var members = firebase.database().ref("members");
	$scope.members = $firebaseArray(members);

});