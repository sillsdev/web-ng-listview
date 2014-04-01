
angular.module('palaso.ui.listview', ['ui.bootstrap'])
  // Typeahead
  .directive('listview', ["$timeout", function($timeout) {
		return {
			restrict : 'EA',
			transclude : true,
			replace : true,
			template : '<div class="listview" ng-hide="hideIfEmpty && items.length == 0"><div ng-transclude></div><div class="paginationblock"><pagination boundary-links="true" total-items="itemsCount" items-per-page="itemsPerPage" page="currentPage" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></pagination><div class="right pagination">Items per page: <select ng-model="itemsPerPage"><option value="10" selected>10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></div></div></div>',
			scope : {
				search : "&",
				select : "&",
				items: "=",
				hideIfEmpty: "@",
				visibleItems: "=",
			},
			controller: ["$scope", function($scope) {
				$scope.itemsPerPage = 10;  // This should match the default value for the selector above
				$scope.itemsCount = 0;
				
				this.activate = function(item) {
					$scope.active = item;
					$scope.select({
						item : item
					});
				};
				this.activateNextItem = function() {
					var index = $scope.items.indexOf($scope.active);
					this.activate($scope.items[(index + 1) % $scope.items.length]);
				};
				this.activatePreviousItem = function() {
					var index = $scope.items.indexOf($scope.active);
					this.activate($scope.items[index === 0 ? $scope.items.length - 1 : index - 1]);
				};
				this.isActive = function(item) {
					return $scope.active === item;
				};
				this.selectActive = function() {
					this.select($scope.active);
				};
				this.updateVisibleItems = function() {
					var sliceStart;
					var sliceEnd;
					if ($scope.currentPage) {
						sliceStart = ($scope.currentPage-1) * $scope.itemsPerPage; // currentPage is 1-based
						sliceEnd = $scope.currentPage * $scope.itemsPerPage;
					} else {
						// Default to page 1 if undefined
						sliceStart = 0;
						sliceEnd = $scope.itemsPerPage;
					}
					$scope.visibleItems = $scope.items.slice(sliceStart, sliceEnd);
				};
				this.updateItemsCount = function() {
					$scope.itemsCount = $scope.items.length;
					if ($scope.currentPage < 1) {
						$scope.currentPage = 1;
					}
				};
				this.query = function() {
					$scope.search();
					this.updateItemsCount();
//					$scope.search({
//						term : $scope.term
//					});
				};
			}],
			link : function(scope, element, attrs, controller) {
				scope.$watch('currentPage', function() {
					controller.updateVisibleItems();
				});
				scope.$watch('itemsPerPage', function() {
					controller.updateItemsCount();
					controller.updateVisibleItems();
				});
				scope.$watch('items', function() {
					controller.updateItemsCount();
					controller.updateVisibleItems();
				}, true);
				controller.query();
			}
		};
  }])
  ;
