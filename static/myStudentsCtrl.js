app.controller('myStudentsCtrl', function ($scope, $http) {
	$scope.hideError = function () {
		$scope.isCodeErrorMessage = false;
	};

	$scope.setStudent = (studentId) => {
		$scope.studentId = studentId;
	};

	$scope.EditViewSolution = () => {
		const result = {
			cwe807: cwe807.checked,
			cwe862: cwe862.checked,
			cwe306: cwe306.checked,
			cwe311: cwe311.checked,
			cwe327: cwe327.checked,
			cwe759: cwe759.checked,
			cwe307: cwe307.checked,
			cwe190: cwe190.checked,
			cwe494: cwe494.checked,
			cwe601: cwe601.checked,
			cwe79: cwe79.checked,
			cwe352: cwe352.checked,
			cwe434: cwe434.checked,
			cwe611: cwe611.checked,
			cwe22: cwe22.checked,
			cwe863: cwe863.checked,
			cwe78: cwe78.checked,
			cwe89: cwe89.checked,
			cwe120: cwe120.checked,
			cwe134: cwe134.checked,
			cwe502: cwe502.checked,
			quiz: quiz.checked,
		};

		$http
			.post(
				'/api/viewSolutions',
				{
					result: result,
					studentId: $scope.studentId,
				},
				window.getAjaxOpts()
			)
			.then(
				function (response) {
					if (response != null && response.data != null) {
						if (response.data.status == 200) {
							$scope.isSuccess = true;
							$scope.editSuccessMessage = 'Edit success';
							window.location.reload();
						} else {
							$scope.isError = true;
							$scope.editErrorMessage = response.data.statusMessage;
						}
					}
				},
				function (errorResponse) {
					$scope.isError = true;
					$scope.editErrorMessage = 'A http error has occurred.';
				}
			);
	};

	$scope.init = function () {
		let url = `/api/myStudents`;
		$scope.myStudents = null;

		$http
			.get(url, window.getAjaxOpts())
			.then(function (response) {
				if (
					response !== null &&
					response.data !== null &&
					response.status === 200
				) {
					let myStudent = response.data;

					if (myStudent.length > 0) {
						$scope.myStudents = myStudent;

						$scope.loadChallenges();
					}
				} else {
					window.location = '/main';
				}
			})
			.catch((err) => (window.location = '/main'));
	};

	$scope.loadChallenges = function () {
		$http.get(`/challenges/blackBelt`).then(function (response) {
			if (
				response != null &&
				response.data != null &&
				Array.isArray(response.data.challenges)
			) {
				$scope.levelNames = {};
				var challengeDefinitions = response.data.challenges;
				let totalChCount = 0;
				let passedChCount = 0;
				if (challengeDefinitions.length >= 1) {
					//update the challenge definitions to include the current user's passed challenges
					for (let levelId in challengeDefinitions) {
						var level = challengeDefinitions[levelId];
						$scope.levelNames[levelId] = level.name;

						var challenges = level.challenges;
						if (challenges.length > 0) {
							$scope.challengesAvailable = true;
						}
					}
				}

				$scope.moduleChallengeDefinitions = challengeDefinitions;
			} else {
				$scope.challengesAvailable = false;
			}
		});
	};
});
