// create news controller
app.controller('news-controller', function($scope, $firebaseArray) {

	$scope.id = "news";
	$scope.title = "news";

	// import blog posts as Firebase array 
	var posts = firebase.database().ref("blog");
	$scope.posts = $firebaseArray(posts);
	
});