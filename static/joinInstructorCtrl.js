app.controller('joinInstructorCtrl', function ($scope, $http) {
	// $scope.displayInstructors = () => {
	// 	let url = `/api/instructors`;

	// 	$http
	// 		.get(url, window.getAjaxOpts())
	// 		.then(function (response) {
	// 			if (
	// 				response !== null &&
	// 				response.data !== null &&
	// 				response.status === 200
	// 			) {
	// 				let instructors = response.data;

	// 				$scope.instructors = instructors;
	// 			} else {
	// 				window.location = '/main';
	// 			}
	// 		})
	// 		.catch((err) => (window.location = '/main'));
	// };

	// $scope.displayInstructors();

	$scope.hideError = function () {
		$scope.isCodeErrorMessage = false;
	};

	$scope.onInstructorChange = function () {
		$scope.isCodeErrorMessage = false;
		$scope.isCodeSuccessMessage = false;

		if ($scope.instructors !== null) {
			let selection = $scope.InstructorListChoice;

			if (typeof selection !== 'undefined') {
				$http
					.post(
						'/api/joinInstructor',
						{
							instructorId: selection,
						},
						window.getAjaxOpts()
					)
					.then(
						function (response) {
							if (response != null) {
								if (response.status == 200) {
									$scope.isCodeSuccessMessage = true;

									$scope.codeSuccessMessage = response.statusText;
								} else {
									$scope.isCodeErrorMessage = true;
									$scope.codeErrorMessage = response.statusText;
								}

								window.location.reload();
							}
						},
						function (errorResponse) {
							$scope.isCodeErrorMessage = true;
							$scope.codeErrorMessage = 'An HTTP error has occurred';
						}
					);
			}
		}
	};

	$scope.init = function () {
		let url = `/api/instructors`;
		$scope.instructors = null;
		$scope.myInstructor = null;
		$scope.showForm = true;

		$http
			.get('/api/myInstructor', window.getAjaxOpts())
			.then(function (response) {
				if (
					response !== null &&
					response.data !== null &&
					response.status === 200
				) {
					let myInstructor = response.data;

					if (myInstructor.length > 0) {
						$scope.myInstructor = myInstructor[0];
						$scope.showForm = false;
					}
				} else {
					window.location = '/main';
				}
			})
			.catch((err) => (window.location = '/main'));

		if ($scope.myInstructor === null) {
			$http
				.get(url, window.getAjaxOpts())
				.then(function (response) {
					if (
						response !== null &&
						response.data !== null &&
						response.status === 200
					) {
						let instructors = response.data;

						$scope.instructors = instructors;
					} else {
						window.location = '/main';
					}
				})
				.catch((err) => (window.location = '/main'));
		}
	};
});
