// create members controller
app.controller('members-controller', function($scope, $firebaseArray) {

	$scope.id = "members";
	$scope.title = "members";

	// import members as Firebase array 
	var members = firebase.database().ref("members");
	var alumni = firebase.database().ref("alumni");
	$scope.members = $firebaseArray(members);
	$scope.alumni = $firebaseArray(alumni);

	// sortMembers: sorts alumni list
	$scope.sortAlumni = function() {
		var sorted = [];
		for (var i = 0; i < $scope.alumni.length; i++) {
			sorted.push($scope.alumni[i]);
			$scope.alumni.$remove(i);
		}
		f = function(a, b) {
			if (parseInt(a.year) > parseInt(b.year))
				return -1; // recent class years first
			if (parseInt(a.year) < parseInt(b.year))
				return 1;
			if (a.name < b.name) 
				return -1;
			if (a.name > b.name)
				return 1;
			return 0;
		}
		sorted.sort(f);
		for (var j = 0; j < sorted.length; j++) {
			$scope.alumni.$add(sorted[j]);
		}
		console.log("alumni sorted");
	};
	// sortMembers: sorts members list
	$scope.sortMembers = function() {
		var sorted = [];
		for (var i = 0; i < $scope.members.length; i++) {
			sorted.push($scope.members[i]);
			$scope.members.$remove(i);
		}
		f = function(a, b) {
			if (parseInt(a.year) < parseInt(b.year))
				return -1; // older class years first
			if (parseInt(a.year) > parseInt(b.year))
				return 1;
			if (a.name < b.name) 
				return -1;
			if (a.name > b.name)
				return 1;
			return 0;
		}
		sorted.sort(f);
		for (var j = 0; j < sorted.length; j++) {
			$scope.members.$add(sorted[j]);
		}
		console.log("members sorted");
	};

	// migrateAlumniByName: this method migrates people with names in
	// names_to_migrate from members to alums list, then sorts the alums list
	$scope.migrateAlumniByNames = function(namesToMigrate) {
		for (var i = 0; i < $scope.members.length; i++) {
			var memberName = $scope.members[i].name;
			if (namesToMigrate.includes(memberName)) {
				console.log(memberName)
				var member = $scope.members[i];
				console.log(member);
				$scope.members.$remove(i);
				$scope.alumni.$add(member);
			}
		}
		$scope.sortAlumni();
	}

	// migrateAlumniByYear: this method migrates people with class years
	// <= CURRENT_YEAR from members to alums list, then sorts the alums list
	$scope.migrateAlumniByYear = function(currentYear) {
		for (var i = 0; i < $scope.members.length; i++) {
			var memberYear = parseInt($scope.members[i].year)
			if (memberYear <= currentYear) {
				var member = $scope.members[i];
				console.log(member);
				$scope.members.$remove(i);
				$scope.alumni.$add(member);
			}
		}
		$scope.sortAlumni();
	}

	// migrateAlumniByName: this method migrates people with names in
	// names_to_migrate from alums to members list, then sorts the members list
	$scope.migrateMembersByNames = function(namesToMigrate) {
		for (var i = 0; i < $scope.alumni.length; i++) {
			var memberName = $scope.alumni[i].name;
			if (namesToMigrate.includes(memberName)) {
				console.log(memberName)
				var member = $scope.alumni[i];
				console.log(member);
				$scope.alumni.$remove(i);
				$scope.members.$add(member);
			}
		}
		$scope.sortMembers();
	}

	// ** CALL THE ABOVE FUNCTIONS HERE ** //

	// Examples: (setTimeout ensures the code is run after the members/alumni arrays are populated)

	// setTimeout(function() { $scope.sortMembers() }, 3000);
	// setTimeout(function() { $scope.sortAlumni() }, 3000);
	setTimeout(function() { $scope.migrateAlumniByYear(2020) }, 3000);
	// setTimeout(function() { $scope.migrateAlumniByNames(['Beyonce', 'Christina Aguilera']) }, 3000);
	// setTimeout(function() { $scope.migrateMembersByNames(['Beyonce', 'Christina Aguilera']) }, 3000);

});
